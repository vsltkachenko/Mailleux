import React from 'react'

import './Suggestions.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Suggestions = ({ closeSearch, closeSuggestions }) => {
	const { suggestionsProducts } = useSelector(state => state.products)

	return (
		<div className='suggestions'>
			{suggestionsProducts.map((product, index) => (
				<Link
					to={`/catalog/product/${product.id}`}
					className='suggestions__item'
					key={index}
					onClick={() => {
						closeSuggestions()
						closeSearch()
					}}
				>
					<div className='suggestions__image'>
						<img src={`${process.env.REACT_APP_FRONTEND_URL}${product.image}`} alt='' />
					</div>
					<div className='suggestions__content'>{product.title}</div>
				</Link>
			))}
		</div>
	)
}

export default Suggestions
