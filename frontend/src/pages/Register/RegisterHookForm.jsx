import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Login/Login.scss'

import { resetAuth, registerUser } from '../../features/auth/authSlice'
import Button from '../../shared/Button/Button'

import { useForm } from 'react-hook-form'
import FormInputGroup from '../../shared/FormInputGroup/FormInputGroup'

export const patternEmail = {
	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	message: 'Invalid email address',
}

const RegisterHookForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth, message } = useSelector(state => state.auth)

	useEffect(() => {
		if (message) toast(message)
		if (isAuth) navigate('/dashboard/customer')
	}, [message, isAuth, navigate, dispatch])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'onTouched' })

	const onSubmit = credentials => {
		try {
			dispatch(resetAuth())
			dispatch(registerUser(credentials))
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='login'>
			<div className='login__box'>
				<h1>Register</h1>
				<form noValidate autoComplete='off' className='form' onSubmit={handleSubmit(onSubmit)}>
					<FormInputGroup
						type='text'
						name='username'
						errorField={errors.username}
						placeholder='Username'
						register={register}
						required='This field is required'
						minLength={{ value: 2, message: 'Minimum 2 characters' }}
					/>
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
						<Button
							type='submit'
							classes='btn'
							disabled={errors.username || errors.email || errors.password}
						>
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

export default RegisterHookForm
