import React from 'react'

import './InputQuantity.scss'

const InputQuantity = ({ quantity, setQuantity }) => {
	return (
		<input
			type='number'
			name='quantity'
			className={`input-quantity`}
			value={quantity}
			onChange={e => setQuantity(e.target.value > 1 ? Number(e.target.value) : 1)}
		/>
	)
}

export default InputQuantity
