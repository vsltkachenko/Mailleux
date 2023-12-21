import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, loginUser, resetState } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import useScrollToTop from '../../hooks/useScrollToTop'
import Button from '../../shared/Button/Button'

const Login = () => {
	useScrollToTop()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message, isAuth } = useSelector(state => state.auth)
	const { totalCount } = useSelector(state => state.cart)

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (message) {
			toast(message)
			dispatch(clearMessage())
		}
		if (isAuth && totalCount) {
			navigate('/cart')
		} else if (isAuth) {
			navigate('/')
		}
	}, [isAuth, message, navigate, dispatch, totalCount])

	const handleChange = e => {
		setCredentials(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			dispatch(resetState())
			dispatch(loginUser(credentials))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='login'>
			<div className='login__box'>
				<h1>Login</h1>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form__group'>
						<input
							className='form__input'
							type='email'
							required
							id='email'
							onChange={handleChange}
							placeholder='Email'
						/>
					</div>
					<div className='form__group'>
						<input
							className='form__input'
							type='password'
							required
							id='password'
							onChange={handleChange}
							placeholder='Password'
						/>
					</div>
					<div className='form__submit'>
						<Button type='submit' classes='btn'>
							Login
						</Button>
						<p>Don't have an account?</p>
						<Button type='link' path='/register' classes='btn btn_bl'>
							Register
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
