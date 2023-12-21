import React, { useEffect } from 'react'

import './RelatedProducts.scss'

import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import Button from '../../shared/Button/Button'
import { Link } from 'react-router-dom'
import Heart3LineIcon from 'remixicon-react/Heart3LineIcon'
import priceFormatter from '../../utils/priceFormatter'
import { useDispatch, useSelector } from 'react-redux'
import { getRelatedProduct } from '../../features/products/productsSlice'

const RelatedProducts = ({ addToCart }) => {
	const dispatch = useDispatch()

	const {
		singleProduct: product,
		relatedProducts,
		isLoading,
	} = useSelector(state => state.products)

	useEffect(() => {
		if (product && product.categoryId !== relatedProducts[0]?.categoryId) {
			dispatch(getRelatedProduct({ productsCount: 5, categoryId: product.categoryId }))
		}
	}, [product, dispatch, relatedProducts])

	return (
		!isLoading &&
		relatedProducts && (
			<section className='related-products'>
				<div className='container'>
					<SectionHeader title='Produits associés' />
					<div className='related-products__list'>
						{relatedProducts.map((product, index) => (
							<div className='related-products__item' key={index}>
								<Link to={`/catalog/product/${product.id}`} className='related-products__image'>
									<img src={`${process.env.REACT_APP_FRONTEND_URL}${product.image}`} alt='' />
								</Link>

								<div className='related-products__body'>
									<h3 className='related-products__title'>
										<Link to={`/catalog/product/${product.id}`}>{product.title}</Link>
									</h3>
									<p className='related-products__subtitle'>
										<span>Dimensions (cm) : </span>
										{product.dimensions}
									</p>
									<p className='related-products__price eur'>{priceFormatter(product.price)}</p>
									<div className='related-products__order'>
										<Button
											type={'button'}
											classes={'btn'}
											onClick={() => {
												addToCart(product)
											}}
										>
											Ajouter au panier
										</Button>{' '}
										<button type='button' className='related-products__wishlist'>
											<Heart3LineIcon size={24} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		)
	)
}

export default RelatedProducts
