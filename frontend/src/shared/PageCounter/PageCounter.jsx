import React from 'react'
import './PageCounter.scss'
import { useSelector } from 'react-redux'

const PageCounter = () => {
	const { productsCount } = useSelector(state => state.products)
	const { currentPage, quantityPerPage } = useSelector(state => state.filters)

	return (
		<div className='page-counter'>
			{quantityPerPage === 'all'
				? productsCount > 0
					? '1'
					: '0'
				: productsCount > 0
				? quantityPerPage * currentPage + 1
				: '0'}{' '}
			-{' '}
			{quantityPerPage === 'all'
				? productsCount
				: Math.min(quantityPerPage * currentPage + quantityPerPage, productsCount)}{' '}
			sur {productsCount}
		</div>
	)
}

export default PageCounter
