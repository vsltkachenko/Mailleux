import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import mainSliderImages from './mainSliderImages.js'
import './MainSlider.scss'
import Button from '../../shared/Button/Button.jsx'

const mainSliderContent = [
	{
		subtitle: 'Mailleux présente',
		title: 'Les matinées tendances',
		text: 'Grâce à notre guide de style, profitez d’un moment exclusif avec nos créateurs d’intérieurs',
		textBtn: 'Suivez le guide',
	},
	{
		subtitle: 'Mailleux présente',
		title: 'Les promotions Xooon',
		text: 'Profitez des avantages design avec Xooon.',
		textBtn: 'Profitez des offres',
	},
	{
		subtitle: 'Immanquable à Namur',
		title: "à vendre d'exposition",
		text: "-50% sur tous les produits à vendre d'exposition à Namur.",
		textBtn: 'Découvrez les offres',
	},
	{
		subtitle: 'Mailleux présente',
		title: 'Les offres Henders & Hazel',
		text: 'Découvrez les offres du moment',
		textBtn: 'Découvrez les offres',
	},
	{
		subtitle: 'Simple & sécurisé',
		title: 'ESHOP',
		text: 'Facilitez-vous la vie en commandant en ligne. Ici le fauteuil Olta Grey',
		textBtn: 'Découvrez les offres',
	},
]
export const slides = mainSliderContent.map((item, index) => ({
	...item,
	image: mainSliderImages[index],
}))

const MainSlider = () => {
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		speed: 1500,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		pauseOnHover: false,
	}

	return (
		<div className='main-slider'>
			<Slider {...settings}>
				{slides.map((item, index) => (
					<div className='slide-item' key={index}>
						<div className='slide-content'>
							<div className='slide-content__header'>
								<p className='slide-content__subtitle'>{item.subtitle}</p>
								<h2 className='slide-content__title'>{item.title}</h2>
							</div>
							<p className='slide-content__text'>{item.text}</p>

							<Button type='link' path='/' classes='btn'>
								{item.textBtn}
							</Button>
						</div>
						<div className='slide-image'>
							<img src={item.image} alt='slide' />
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default MainSlider
