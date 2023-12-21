import React from 'react'
import CheckLineIcon from 'remixicon-react/CheckLineIcon'

import './Checkbox.scss'

const Checkbox = ({ name, text, checked, onChange }) => {
	return (
		<label className='checkbox'>
			<input
				className='checkbox__input'
				type='checkbox'
				name={name}
				checked={checked || false}
				onChange={onChange}
			/>
			<span className='checkbox__box'>
				<CheckLineIcon className={`checkbox__icon ${checked ? 'active' : ''}`} />
			</span>
			<span className='checkbox__text'>{text}</span>
		</label>
	)
}

export default Checkbox
