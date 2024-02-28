import { useEffect, useState } from 'react'

import './Pagination.scss'

import { useSelector } from 'react-redux'
import { scrollToTop } from '../../utils/scrollToTop'

const Pagination = ({ setFilters }) => {
	const { pageCount, isLoading } = useSelector(state => state.products)
	const { currentPage } = useSelector(state => state.filters)
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		setOffset(Math.floor(currentPage / 5) * 5)
	}, [currentPage])

	const setCurrentPage = currentPage => {
		setFilters({ currentPage })
		scrollToTop()
	}

	const prevPage = () => {
		setCurrentPage(currentPage - 1)
	}
	const nextPage = () => {
		setCurrentPage(currentPage + 1)
	}

	return (
		!isLoading && (
			<ul className='pagination'>
				{currentPage > 0 && (
					<li key='first' onClick={() => setCurrentPage(0)}>
						<span>‹‹</span>
					</li>
				)}
				{currentPage > 0 && (
					<li key='prev' onClick={prevPage}>
						<span>‹</span>
					</li>
				)}
				{[...Array(Math.min(5, pageCount - offset))]?.map((_, index) => (
					<li key={index + offset} onClick={() => setCurrentPage(index + offset)}>
						<span className={currentPage === index + offset ? 'active-page' : ''}>
							{index + offset + 1}
						</span>
					</li>
				))}
				{currentPage + 1 < pageCount && (
					<li key='next' onClick={nextPage}>
						<span>›</span>
					</li>
				)}
				{currentPage + 1 !== pageCount && (
					<li key='last' onClick={() => setCurrentPage(pageCount - 1)}>
						<span>››</span>
					</li>
				)}
			</ul>
		)
	)
}

export default Pagination
