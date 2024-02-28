import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, loginUser, resetAuth } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import useScrollToTop from '../../hooks/useScrollToTop'
import Button from '../../shared/Button/Button'
import FormInputGroup from '../../shared/FormInputGroup/FormInputGroup'
import { patternEmail } from '../Register/RegisterHookForm'

const LoginHookForm = () => {
	useScrollToTop()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message, isAuth } = useSelector(state => state.auth)
	const { totalCount } = useSelector(state => state.cart)

	useEffect(() => {
		if (message) {
			message === 'User not found' ? alert('Invalid email or password') : toast(message)
			dispatch(clearMessage())
		}
		if (isAuth && totalCount) {
			navigate('/cart')
		} else if (isAuth) {
			navigate('/dashboard/customer')
		}
	}, [isAuth, message, navigate, dispatch, totalCount])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'onTouched' })

	const onSubmit = credentials => {
		try {
			dispatch(resetAuth())
			dispatch(loginUser(credentials))
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='login'>
			<div className='login__box'>
				<h1>Login</h1>
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInputGroup
						type='email'
						name='email'
						errorField={errors.email}
						placeholder='Email'
						register={register}
						required='Email Address is required'
						pattern={patternEmail}
					/>
					<FormInputGroup
						type='password'
						name='password'
						errorField={errors.password}
						placeholder='Password'
						register={register}
						required='This field is required'
						minLength={{ value: 5, message: 'Minimum 5 characters' }}
					/>

					<div className='form__submit'>
						<Button type='submit' classes='btn' disabled={errors.email || errors.password}>
							Login
						</Button>
						<p>Don't have an account?</p>
						<p>Demo account: demo@gmail.com / password: demo123</p>
						<Button type='link' path='/register' classes='btn btn_bl'>
							Register
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default LoginHookForm
