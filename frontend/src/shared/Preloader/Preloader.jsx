import React, { useEffect, useRef, useState } from 'react'
import Logo from '../Logo/Logo'

import './Preloader.scss'
import { useSelector } from 'react-redux'

const Preloader = () => {
	const { isLoading } = useSelector(state => state.products)

	const [longLoading, setLongLoading] = useState(false)

	const time = useRef()

	useEffect(() => {
		if (isLoading) {
			time.current = setTimeout(() => {
				setLongLoading(true)
			}, 300)
		}
		return () => {
			clearTimeout(time.current)
			setLongLoading(false)
		}
	}, [isLoading])

	

	return (
		<div className={`preloader ${longLoading ? 'show' : ''}`}>
			<Logo />
		</div>
	)
}

export default Preloader
