import React from 'react'

import './Button.scss'
import { Link } from 'react-router-dom'

const Button = ({ type, classes, path, onClick, children, disabled }) => {
	return type === 'button' || type === 'submit' ? (
		<button type={type} className={classes} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	) : type === 'link' ? (
		<Link to={path} className={classes} onClick={onClick}>
			{children}
		</Link>
	) : (
		''
	)
}

export default Button
