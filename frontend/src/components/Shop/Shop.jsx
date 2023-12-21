import React from 'react'

import './Shop.scss'
import { categories } from '../../shared/MegaMenu/MegaMenu'
import shopCategoryImages from './shopCategoryImages.js'
import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import { Link } from 'react-router-dom'

const Shop = () => {
	return (
		<section className='shop'>
			<div className='container'>
				<SectionHeader title='E-shop' />
				<ul className='shop__list'>
					{categories.map((item, index) => (
						<li className='shop__category category-shop' key={index}>
							<Link to={`/catalog/?activeCategoryId=${index}`} className='category-shop__link'>
								<img src={shopCategoryImages[index]} alt='' className='category-shop__image' />
								<div className='category-shop__title'>{item.category.text}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Shop
