import React from 'react'
import { Link } from 'react-router-dom'

import './ImageCategory.scss'

const ImageCategory = ({ category, image, activeCategoryId }) => {
	return (
		<Link to={`catalog/?activeCategoryId=${activeCategoryId}`} className='image-category'>
			<div className='image-category__filter'>
				<img className='image-category__image' src={image} alt={category.text} />
			</div>

			<div className='image-category__text'>
				<h2>{category.text}</h2>
			</div>
		</Link>
	)
}

export default ImageCategory
