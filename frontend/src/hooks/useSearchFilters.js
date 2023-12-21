import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const useSearchFilters = (initialParams = {}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const filters = useMemo(() => {
		return { ...initialParams, ...Object.fromEntries(searchParams.entries()) }
	}, [searchParams, initialParams])

	const setFilters = obj => {
		const newFilters = Object.fromEntries(
			Object.entries({ ...filters, ...obj }).filter(item => item[1] !== false && item[1] !== '')
		)
		setSearchParams(newFilters)
	}

	return { filters, setFilters }
}

export default useSearchFilters

// eslint-disable-next-line react-hooks/exhaustive-deps
