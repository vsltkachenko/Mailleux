import React, { useEffect } from 'react'

import './SelectedProducts.scss'

import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import ProductCard from '../../shared/ProductCard/ProductCard'
import Button from '../../shared/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedProducts } from '../../features/products/productsSlice'

const SelectedProducts = () => {
	const dispatch = useDispatch()

	const { selectedProducts, isLoading } = useSelector(state => state.products)

	useEffect(() => {
		if (!selectedProducts?.length) {
			dispatch(getSelectedProducts({ productsCount: 4 }))
		}
	}, [dispatch, selectedProducts?.length])

	return (
		<section className='selected-products'>
			<div className='container'>
				<div className='selected-products__content'>
					<SectionHeader title='Notre sélection' />
					<div className='selected-products__cards'>
						{!isLoading &&
							selectedProducts?.map((product, index) => (
								<ProductCard product={product} key={index} />
							))}
					</div>
					<Button type='link' path='/catalog' classes='btn btn_center'>
						Voir plus d’articles
					</Button>
				</div>
			</div>
		</section>
	)
}

export default SelectedProducts
