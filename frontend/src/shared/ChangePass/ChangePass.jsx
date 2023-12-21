import React from 'react'
import Button from '../Button/Button'
import { instance } from '../../utils/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../SectionHeader/SectionHeader'
import { useForm } from 'react-hook-form'
import FormInputGroup from '../FormInputGroup/FormInputGroup'

const minLength = { value: 5, message: 'Minimum 5 characters' }

const ChangePass = () => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm({ mode: 'onTouched' })

	const onSubmit = async credentials => {
		const { oldPassword, newPassword, confirmNewPassword } = credentials
		if (newPassword !== confirmNewPassword) {
			setError('confirmNewPassword', {
				type: 'manual',
				message: 'Confirmation password mismatched',
			})
			return
		}

		try {
			const { data } = await instance.post('customer/changepass', { oldPassword, newPassword })
			data?.success === false && alert(data.message)
			if (data?.success) {
				reset()
				toast(data.message)
				navigate('/dashboard/customer')
			}
		} catch (error) {
			console.log(error)
		}
	}

	// useEffect(() => {
	// 	const subscription = watch((value, { name, type }) => {
	// 		console.log(value, name, type)
	// 		const newPassword = value['newPassword']
	// 		const confirmNewPassword = value['confirmNewPassword']
	// 		console.log(newPassword)
	// 		console.log(confirmNewPassword)
	// 		if (newPassword === confirmNewPassword) {
	// 			clearErrors('confirmNewPassword')
	// 			console.log('clearErrors')
	// 		} else {
	// 			console.log('setError')
	// 			setError('confirmNewPassword', {
	// 				type: 'custom',
	// 				message: 'Confirmation password mismatched',
	// 			})
	// 		}
	// 	})
	// 	return () => subscription.unsubscribe()
	// }, [watch, clearErrors, setError])

	return (
		<div style={{ margin: 'auto', maxWidth: '400px' }}>
			<SectionHeader
				title={'Changement du mot de passe'}
				classes={'dashboard__header dashboard__header_center'}
			/>
			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<FormInputGroup
					type='password'
					name='oldPassword'
					errorField={errors.oldPassword}
					placeholder='Old password'
					register={register}
					required='This field is required'
					minLength={minLength}
				/>
				<FormInputGroup
					type='password'
					name='newPassword'
					errorField={errors.newPassword}
					placeholder='New password'
					register={register}
					required='This field is required'
					minLength={minLength}
				/>
				<FormInputGroup
					type='password'
					name='confirmNewPassword'
					errorField={errors.confirmNewPassword}
					placeholder='Confirm new password'
					register={register}
					required='This field is required'
					minLength={minLength}
				/>
				<div className='form__submit'>
					<Button
						type='submit'
						classes='btn btn-submit'
						disabled={errors.oldPassword || errors.newPassword || errors.confirmNewPassword}
					>
						Soumettre
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ChangePass
