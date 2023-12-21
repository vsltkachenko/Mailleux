import React from 'react'
import './Arrow.scss'

const Arrow = props => {
	const { className, style, onClick } = props
	return (
		<div
			className={`${className} custom-arrow _icon-arrow`}
			style={{ ...style, background: '#fff' }}
			onClick={onClick}
		/>
	)
}

export default Arrow
