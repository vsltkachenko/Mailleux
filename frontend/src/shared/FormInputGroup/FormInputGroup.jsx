import React from 'react'

import './FormInputGroup.scss'

const FormInputGroup = ({
	type,
	name,
	errorField,
	placeholder,
	register,
	required,
	pattern,
	minLength,
	labelText,
}) => {

	return (
		<div className='form__group'>
			{labelText && (
				<label className='form__label' htmlFor={name}>
					{labelText}
				</label>
			)}
			<input
				className={`form__input ${errorField ? 'error' : ''}`}
				type={type}
				id={name}
				placeholder={placeholder}
				{...register(name, {
					required,
					pattern,
					minLength,
				})}
			/>
			{errorField && <span>{errorField.message}</span>}
		</div>
	)
}

export default React.memo(FormInputGroup)
