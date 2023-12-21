import React, { useRef } from 'react'
import './SectionHeader.scss'
import useAnimate from '../../hooks/useAnimate'

const SectionHeader = ({ subtitle, title, text, classes = '' }) => {
	const refElem = useRef(null)
	useAnimate(refElem) // Animate section-header

	return (
		<header className={`section-header ${classes}`} ref={refElem}>
			<div className='section-header__titles'>
				{subtitle && <p className='section-header__subtitle'>{subtitle}</p>}
				<h2 className='section-header__title'>{title}</h2>
			</div>
			{text && <p className='section-header__text'>{text}</p>}
		</header>
	)
}

export default SectionHeader
