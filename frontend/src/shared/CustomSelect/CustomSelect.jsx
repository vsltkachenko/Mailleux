import React from 'react'
import Select from 'react-select'

import './CustomSelect.scss'

const CustomSelect = ({ options, currentValue, setCurrentValue, classes = '' }) => {
	const getValue = () => {
		return currentValue ? options.find(option => option.value === currentValue) : ''
	}
	const onChange = newValue => {
		setCurrentValue(newValue.value)
	}

	return (
		<div className={classes}>
			<Select
				onChange={onChange}
				value={getValue()}
				options={options}
				isSearchable={false}
				classNamePrefix={'custom-select'}
				required
				// menuIsOpen={true}
			/>
		</div>
	)
}

export default CustomSelect
