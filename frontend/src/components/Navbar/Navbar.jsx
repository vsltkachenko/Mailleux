import React, { useEffect } from 'react'
import { useState } from 'react'

import './Navbar.scss'

import Logo from '../../shared/Logo/Logo'
import MenuTop from '../../shared/MenuTop/MenuTop'
import MenuBottom from '../../shared/MenuBottom/MenuBottom'
import BackDrop from '../../shared/BackDrop/BackDrop'
import MenuButton from '../../shared/MenuButton/MenuButton'
import useIsMobile from '../../hooks/useIsMobile'

const Navbar = () => {
	const isMobile = useIsMobile(992)

	const [isMenuOpen, setMenuOpen] = useState(false)
	const menuClose = () => setMenuOpen(false)

	const linkClick = event => {
		// Закриваємо меню при кліку по пункту з ссилкою
		if (event.target.closest('.menu__link')) {
			menuClose()
		}
	}
	useEffect(() => {
		const dashboardButton = document.querySelector('.dashboard__button')
		if (dashboardButton) {
			if (isMenuOpen) {
				dashboardButton.style.display = 'none'
			} else {
				dashboardButton.style.display = ''
			}
		}
	}, [isMenuOpen])

	return (
		<>
			<BackDrop active={isMenuOpen && isMobile} close={menuClose} />
			<Logo menuClose={menuClose} />
			<nav
				className={`menu ${isMenuOpen && isMobile ? 'active' : ''}`}
				onClick={event => linkClick(event)}
			>
				<MenuTop />
				<MenuBottom />
			</nav>
			<MenuButton active={isMenuOpen && isMobile} setActive={setMenuOpen} />
		</>
	)
}

export default Navbar
