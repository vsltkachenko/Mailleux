import React from 'react'
import { Link } from 'react-router-dom'

import './ProductCard.scss'

import priceFormatter from '../../utils/priceFormatter'

const ProductCard = ({ product }) => {
	return (
		<article className='product-card'>
			<Link to={`/catalog/product/${product.id}`} className='product-card__image'>
				<img src={`${process.env.REACT_APP_FRONTEND_URL}${product.image}`} alt='' />
			</Link>
			<div className='product-card__content'>
				<Link to={`/catalog/product/${product.id}`} className='product-card__title'>
					<h3>{product.title}</h3>
				</Link>
				<p className='product-card__price eur'>{priceFormatter(product.price)}</p>
			</div>
		</article>
	)
}

export default ProductCard
