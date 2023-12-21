import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInputGroup from '../FormInputGroup/FormInputGroup'
import './CustomerProfile.scss'
import { patternEmail } from '../../pages/Register/RegisterHookForm'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { instance } from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, resetAuth } from '../../features/auth/authSlice'
import Modal from '../Modal/Modal'
import lockBody from '../../utils/lockBody'
import { clearItems } from '../../features/cart/cartSlice'

const profileFields = [
	{
		type: 'text',
		name: 'company',
		labelText: 'Société',
	},
	{
		type: 'text',
		name: 'userLastName',
		required: 'This field is required',
		labelText: 'Prénom',
	},
	{
		type: 'text',
		name: 'username',
		required: 'This field is required',
		labelText: 'Nom',
	},
	{
		type: 'text',
		name: 'birthday',
		labelText: 'Date de naissance',
	},
	{
		type: 'email',
		name: 'email',
		required: 'This field is required',
		labelText: 'Email',
		pattern: patternEmail,
	},
	{
		type: 'text',
		name: 'phone',
		labelText: 'Téléphone',
	},
	{
		type: 'text',
		name: 'site',
		labelText: 'Site Internet',
	},
	{
		type: 'text',
		name: 'tin',
		labelText: 'Numéro de TVA',
	},
	{
		type: 'text',
		name: 'street',
		required: 'This field is required',
		labelText: 'Rue',
	},
	{
		type: 'text',
		name: 'house',
		required: 'This field is required',
		labelText: 'Numéro',
	},
	{
		type: 'text',
		name: 'postal',
		required: 'This field is required',
		labelText: 'Code postal',
	},
	{
		type: 'text',
		name: 'city',
		required: 'This field is required',
		labelText: 'Ville',
	},
	{
		type: 'text',
		name: 'country',
		required: 'This field is required',
		labelText: 'Pays',
	},
]

const CustomerProfile = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { currentUser } = useSelector(state => state.auth)

	const [modalActive, setModalActive] = useState(false)
	const modalClose = () => {
		setModalActive(false)
		lockBody(false)
	}
	const modalOpen = () => {
		setModalActive(true)
		lockBody(true)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({ mode: 'onSubmit' })

	const notValid = Boolean(Object.keys(errors).length)

	const onSubmit = async credentials => {
		try {
			const { data } = await instance.put('customer', credentials)
			data?.success === false && alert(data.message)
			if (data?.success) {
				reset()
				toast(data.message)
				dispatch(getMe())
				navigate('/dashboard/customer')
			}
		} catch (error) {
			console.log(error)
		}
	}
	const deleteCustomer = async () => {
		try {
			const { data } = await instance.delete('customer')
			data?.success === false && alert(data.message)
			if (data?.success) {
				reset()
				dispatch(resetAuth())
				dispatch(clearItems())
				toast(data.message)
				navigate('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (currentUser) {
			Object.entries(currentUser).map(entrie =>
				setValue(entrie[0], entrie[1], {
					shouldValidate: true,
				})
			)
		}
	}, [setValue, currentUser])

	return (
		<>
			<form noValidate className='profile-form' onSubmit={handleSubmit(onSubmit)}>
				<div className='profile-form__body'>
					{profileFields.map(item => (
						<FormInputGroup
							key={item.name}
							type={item.type}
							name={item.name}
							errorField={errors[item.name]}
							register={register}
							required={item.required}
							labelText={item.labelText}
							pattern={item.pattern}
						/>
					))}
				</div>
				<div className='profile-form__submit form__submit'>
					<Button type='submit' classes='btn' disabled={notValid}>
						Enregistrer
					</Button>
					<Button type='button' classes='btn btn_red' onClick={modalOpen}>
						Supprimer
					</Button>
				</div>
			</form>
			<Modal active={modalActive} modalClose={modalClose}>
				<div className='profile-modal'>
					<div className='profile-modal__body'>
						<Button type='button' classes='btn-close' onClick={modalClose} />
						<div className='profile-modal__message'>
							Voulez-vous vraiment supprimer cet utilisateur ?
						</div>
					</div>
					<div className='profile-modal__footer'>
						<Button type='button' classes='btn btn-modal btn_white' onClick={modalClose}>
							Retour
						</Button>
						<Button type='button' classes='btn btn-modal btn_red' onClick={deleteCustomer}>
							Confirmer
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default CustomerProfile
