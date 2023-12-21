import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearMessage, logout } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearItems } from '../../features/cart/cartSlice'

const DashboardMenu = ({ data, asideClose, path }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message } = useSelector(state => state.auth)

	const onClickHandler = (e, item) => {
		asideClose()
		if (item.path === 'logout') {
			e.preventDefault()
			if (window.confirm('Do you want to log out of your account?')) {
				dispatch(logout())
			}
		}
	}

	useEffect(() => {
		if (message === 'You have successfully logged out') {
			dispatch(clearItems())
			toast(message)
			dispatch(clearMessage())
			navigate('/')
		}
	}, [message, dispatch, navigate])

	return (
		<ul className='dashboard__menu'>
			{data.map((item, index) => (
				<li className='dashboard__menu-item' key={index}>
					<Link
						to={`/dashboard/${item.path}`}
						className={`dashboard__menu-link ${item.path === path ? 'active' : ''}`}
						onClick={e => onClickHandler(e, item)}
					>
						{item.icon}
						{item.section}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default DashboardMenu
