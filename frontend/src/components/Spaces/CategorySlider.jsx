import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './CategorySlider.scss'

import { categories } from '../../shared/MegaMenu/MegaMenu'
import categoryImages from '../../shared/MegaMenu/categoryImages.js'
import ImageCategory from '../../shared/ImageCategory/ImageCategory'
import Arrow from './Arrow'

const CategorySlider = () => {
	const settings = {
		// autoplay: true,		
		// autoplaySpeed: 5000,
	
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,		

		nextArrow: <Arrow />,
		prevArrow: <Arrow />,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					// initialSlide: 2,
					dots: true,
				},
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	}
	return (
		<div className='container_full'>
			<div className='container'>
				<div className='category-slider'>
					<Slider {...settings}>
						{categories.map((item, index) => (
							<div className='category-slider__slide' key={index}>
								<ImageCategory
									category={item.category}
									image={categoryImages[index]}
									activeCategoryId={index}
								/>
							</div>
						))}
					</Slider>
				</div>
			</div>
		</div>
	)
}

export default CategorySlider
