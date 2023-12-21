import React from 'react'
import './Header.scss'

import Navbar from '../Navbar/Navbar'
import { useScrollFromTop } from '../../hooks/useScrollFromTop'

const Header = () => {
	// при скролі більше 50px --> додаємо клас .header-small
	const isScroll_50 = useScrollFromTop(50)

	return (
		<header className={`header ${isScroll_50 ? 'header-small' : ''}`}>
			<div className='container'>
				<div className='header__body'>
					<Navbar />
				</div>
			</div>
		</header>
	)
}

export default Header
