import { useEffect } from 'react'

const useOverflowInitial = () => {
	useEffect(() => {
		const app = document.querySelector('.app')
		app.style.overflow = 'initial'
		return () => {
			app.style.overflow = ''
		}
	}, [])
}

export default useOverflowInitial
