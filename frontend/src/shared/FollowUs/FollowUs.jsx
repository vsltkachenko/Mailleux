import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './FollowUs.scss'

import InstagramLineIcon from 'remixicon-react/InstagramLineIcon'
import FacebookCircleFillIcon from 'remixicon-react/FacebookCircleFillIcon'

const FollowUs = () => {
	const [isFix, setFix] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const fixScroll = () => {
			if (window.scrollY >= window.innerHeight - 350 && !isFix) setFix(true)
			if (window.scrollY < window.innerHeight - 350 && isFix) setFix(false)
		}
		window.addEventListener('scroll', fixScroll)
		return () => window.removeEventListener('scroll', fixScroll)
	}, [isFix])

	if (location.pathname === '/login' || location.pathname === '/register') return null

	return (
		<aside className={`follow ${isFix ? 'fix' : ''}`}>
			<div className='follow__text'>Suivez-nous</div>
			<ul className='follow__social'>
				<a
					href='https://www.facebook.com'
					target='_blank'
					rel='noopener noreferrer'
					className='social__link_facebook'
				>
					<FacebookCircleFillIcon />
				</a>
				<a
					href='https://www.instagram.com'
					target='_blank'
					rel='noopener noreferrer'
					className='social__link_instagram'
				>
					<InstagramLineIcon />
				</a>
			</ul>
		</aside>
	)
}

export default FollowUs
