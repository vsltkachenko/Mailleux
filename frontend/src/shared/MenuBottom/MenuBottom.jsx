import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './MenuBottom.scss'

import UserLineIcon from 'remixicon-react/UserLineIcon'
import ShoppingCart2LineIcon from 'remixicon-react/ShoppingCart2LineIcon'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import MegaMenu from '../MegaMenu/MegaMenu'

import { checkIsAuth } from '../../features/auth/authSlice'
import Search from '../../components/Search/Search'
import lockBody from '../../utils/lockBody'

const menuBottomList = [
	{ title: 'Les espaces', link: 'les-espaces' },
	{ title: 'Inspirations', link: 'inspirations' },
	{ title: 'Promotions', link: 'promotions' },
	{ title: 'Nos marques', link: 'nos-marques' },
]

const MenuBottom = () => {
	const location = useLocation()
	const shopLink = useRef(null)
	const isAuth = useSelector(checkIsAuth)
	const { items, totalCount } = useSelector(state => state.cart)

	const [isSearchOpen, setSearchOpen] = useState(false)

	useEffect(() => {
		const json = JSON.stringify(items)
		localStorage.setItem('cartItems', json)
	}, [items])

	useEffect(() => {
		if (
			(location.pathname.startsWith('/catalog') || location.pathname === '/cart') &&
			shopLink.current
		) {
			shopLink.current.style.color = '#eb601d'
		} else {
			shopLink.current.style.color = ''
		}
	}, [location.pathname])

	return (
		<div className='menu-bottom'>
			<div className='menu-bottom__main'>
				<ul className='menu-bottom__list'>
					{menuBottomList.map((item, index) => (
						<li className='menu-bottom__item' key={index}>
							<Link to={item.link} className='menu__link'>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='menu-bottom__shop'>
				<div className='menu-bottom__catalog'>
					<Link to='catalog' className='menu__link' ref={shopLink}>
						E-Shop
					</Link>
					<MegaMenu />
				</div>
			</div>
			<div className='menu-bottom__actions'>
				<button
					className='menu__link'
					onClick={() => {
						setSearchOpen(true)
						setTimeout(() => lockBody(true), 200)
					}}
				>
					<SearchLineIcon size={20} />
				</button>

				<Search
					isSearchOpen={isSearchOpen}
					closeSearch={() => {
						setSearchOpen(false)
						lockBody(false)
					}}
				/>

				<Link
					to={`${isAuth ? '/dashboard/customer' : '/login'}`}
					className={`menu__link ${isAuth ? 'active' : ''} `}
				>
					<UserLineIcon size={20} />
				</Link>
				<Link to='/cart' className='menu__link'>
					<ShoppingCart2LineIcon size={20} />
					<span className='badge'>{totalCount}</span>
				</Link>
			</div>
		</div>
	)
}

export default MenuBottom
