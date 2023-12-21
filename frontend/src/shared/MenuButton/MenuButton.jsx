import React from 'react'
import './MenuButton.scss'

const MenuButton = ({ active, setActive, classes='' }) => {
	return (
		<button
			onClick={() => setActive(!active)}
			className={`menu__button ${classes} ${active ? 'active' : 'unactive'}`}
		>
			<span></span>
		</button>
	)
}

export default MenuButton