import { useState, useEffect } from 'react'

export const useScrollFromTop = top => {
	const [isScroll, setScroll] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY

			if (scrollTop > top && !isScroll) setScroll(true)
			if (scrollTop <= top && isScroll) setScroll(false)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isScroll, top])

	return isScroll
}
