import { useEffect } from 'react'
import { scrollToTop } from '../utils/scrollToTop'

export default function useScrollToTop(dep) {
	useEffect(() => {
		scrollToTop()
	}, [dep])
}
