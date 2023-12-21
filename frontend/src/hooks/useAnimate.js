import { useEffect } from 'react'

const useAnimate = (refElem, headerHeight = 84, nameClass = 'animate') => {
	// add class 'animate'
	useEffect(() => {
		const handleScroll = () => {
			const innerHeight = window.innerHeight
			if (refElem.current) {
				const top = refElem.current.getBoundingClientRect().top
				if (top - innerHeight < 0 && top - headerHeight > 0) {
					refElem.current.classList.add(nameClass)
				}
			}
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [refElem, headerHeight, nameClass])
}

export default useAnimate
