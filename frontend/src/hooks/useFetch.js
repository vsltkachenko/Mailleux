import { useState, useEffect } from 'react'

const useFetch = (url, makeRequest = true) => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url)

				if (!res.ok) {
					setError('Failed to fetch')
					alert('Failed to fetch')
				}
				const result = await res.json()
				setData(result.data)
				setLoading(false)
			} catch (err) {
				setError(err.message)
				setLoading(false)
			}
		}
		if (makeRequest) {
			fetchData()
		} else {
			setLoading(false)
		}
	}, [url, makeRequest])

	return {
		data,
		error,
		loading,
	}
}

export default useFetch
