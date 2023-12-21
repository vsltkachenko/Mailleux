import React, { useEffect, useLayoutEffect, useState } from 'react'
import './Product.scss'

import { Link, useParams } from 'react-router-dom'
import { Accordion } from '../../shared/Accordion/Accordion.jsx'
import Heart3LineIcon from 'remixicon-react/Heart3LineIcon'
import priceFormatter from '../../utils/priceFormatter'
import Button from '../../shared/Button/Button'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts'
import InputQuantity from '../../shared/InputQuantity/InputQuantity'
import { getSingleProduct, setSingleProduct } from '../../features/products/productsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import useScrollToTop from '../../hooks/useScrollToTop.js'
import { addItem } from '../../features/cart/cartSlice.js'
import useOverflowInitial from '../../hooks/useOverflowInitial.js'
import { toast } from 'react-toastify'

const Product = () => {
	let { id } = useParams()
	id = Number(id)
	useScrollToTop(id)
	useOverflowInitial()

	const dispatch = useDispatch()
	const {
		products,
		singleProduct: product,
		relatedProducts,
		isLoading,
	} = useSelector(state => state.products)

	const [quantity, setQuantity] = useState(1)

	const productDetails = product
		? [
				{
					title: 'Description',
					content: [
						{
							text: product.description,
						},
					],
				},
				{
					title: 'Dimensions',
					content: [
						{
							text: product.dimensions,
						},
					],
				},
				{
					title: 'Caractéristiques',
					content: [
						{
							text: product.characteristics,
						},
					],
				},
		  ]
		: []

	const addToCart = (product, quantity = 1) => {
		const item = {
			...product,
			count: quantity,
		}
		dispatch(addItem(item))
		toast(`${quantity > 1 ? `${quantity} products` : 'Product'} has been added to the cart!`)
	}

	useEffect(() => {
		if (!product && !products.length) {
			dispatch(getSingleProduct({ id }))
		}
		if (!product && products.length) {
			const findProduct = products.find(item => item.id === id)
			findProduct ? dispatch(setSingleProduct(findProduct)) : dispatch(getSingleProduct({ id }))
		}
		if (product && product.id !== id) {
			const findProduct =
				relatedProducts.find(item => item.id === id) || products.find(item => item.id === id)
			findProduct ? dispatch(setSingleProduct(findProduct)) : dispatch(getSingleProduct({ id }))
		}
	}, [id, dispatch, product, products, relatedProducts])

	useLayoutEffect(() => {
		if (product && product.id !== id) {
			setQuantity(1)
		}
	}, [id, product])

	return (
		<>
			{!isLoading && product && (
				<section className='product'>
					<div className='container'>
						<div className='product__body'>
							<div className='product__detail'>
								<div className='product__image'>
									<img src={`../../${product.image}`} alt='' />
								</div>
								<Accordion classes={'product__accordion'} list={productDetails} multiple />
							</div>
							<div className='product__info info-product'>
								<h1 className='info-product__title'>{product.title}</h1>

								<p className='info-product__price eur'>{priceFormatter(product.price)}</p>
								<p className='info-product__tax'>{priceFormatter(product.tax)} %</p>

								<p className='info-product__text'>{product.description}</p>
								<Link to='/' className='info-product__link mini-link' alt=''>
									<span>En savoir plus ...</span>
								</Link>
								<form action='#' className='info-product__form form-info-product'>
									<p className='form-info-product__availability'>{product.availability}</p>
									<p className='form-info-product__delivery'>Livraison: {product.delivery}</p>

									<div className='form-info-product__order'>
										<div className='form-info-product__tooltip'>
											<InputQuantity
												quantity={quantity}
												setQuantity={setQuantity}
												classes={'form-info-product__input-quantity'}
											/>
											<Button
												type={'button'}
												classes={'btn'}
												onClick={() => addToCart(product, quantity)}
											>
												Ajouter au panier
											</Button>
										</div>
										<button type='button' className='form-info-product__whishlist'>
											<Heart3LineIcon size={24} />
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			)}
			<RelatedProducts addToCart={addToCart} />
		</>
	)
}

export default Product
