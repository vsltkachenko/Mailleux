import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Login/Login.scss'

import { resetState, registerUser } from '../../features/auth/authSlice'
import Button from '../../shared/Button/Button'

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth, message } = useSelector(state => state.auth)

	const [credentials, setCredentials] = useState({
		username: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		if (message) toast(message)
		if (isAuth) navigate('/dashboard/customer')
	}, [message, isAuth, navigate, dispatch])

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
			dispatch(registerUser(credentials))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='login'>
			<div className='login__box'>
				<h1>Register</h1>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form__group'>
						<input
							className='form__input'
							type='text'
							placeholder='Username'
							required
							id='username'
							onChange={handleChange}
						/>
					</div>
					<div className='form__group'>
						<input
							className='form__input'
							type='email'
							placeholder='Email'
							required
							id='email'
							onChange={handleChange}
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
							Create Account
						</Button>
						<p>Already have an account?</p>
						<Button type='link' path='/login' classes='btn btn_bl'>
							Login
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Register
