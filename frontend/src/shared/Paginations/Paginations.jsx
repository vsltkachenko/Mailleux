import React from 'react'

import './Paginations.scss'

import { useSelector } from 'react-redux'
import { scrollToTop } from '../../utils/scrollToTop'

const Paginations = ({ setFilters }) => {
	const { pageCount, isLoading } = useSelector(state => state.products)
	const { currentPage } = useSelector(state => state.filters)

	return (
		!isLoading && (
			<ul className='paginations'>
				{[...Array(pageCount)]?.map((_, index) => (
					<li
						key={index}
						onClick={() => {
							setFilters({ currentPage: index })
							scrollToTop()
						}}
					>
						<span className={currentPage === index ? 'active-page' : ''}>{index + 1}</span>
					</li>
				))}
			</ul>
		)
	)
}

export default Paginations
