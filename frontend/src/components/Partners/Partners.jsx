import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './Partners.scss'

import partnersImages from './partnersImages.js'
import { Link } from 'react-router-dom'

const Partners = () => {
	const settings = {
		autoplay: true,
		autoplaySpeed: 4000,
		infinite: true,
		speed: 3000,
		slidesToShow: 7,
		slidesToScroll: 1,
		swipeToSlide: true,
		pauseOnHover: true,

		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<section className='partners'>
			<div className='container'>
				<div className='partners-slider'>
					<Slider {...settings}>
						{partnersImages.map((item, index) => (
							<Link to='/' className='partners-slider__slide' key={index}>
								<img src={item} alt='' />
							</Link>
						))}
					</Slider>
				</div>
			</div>
		</section>
	)
}

export default Partners
