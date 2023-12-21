import React, { useRef } from 'react'

import './Office.scss'

import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import officeImage from '../../img/mainSlider/5.jpg'
import useAnimate from '../../hooks/useAnimate'

const Office = () => {
	const refElem = useRef(null)
	useAnimate(refElem) // Animate office__info

	return (
		<section className='office'>
			<div className='office__content'>
				<SectionHeader title='Nos magasins en Belgique' />
				<div className='office__info' ref={refElem}>
					<p>Ouvert tous les jours de 10h à 19h. Aussi les weekends et jours fériés.</p>
					<ul className='office__contacts'>
						<li className=''>
							<a href='tel:+32043711610'>+32 (0)4 371 16 10</a>
						</li>
						<li>Parking gratuit et privé</li>
						<li>Bornes de recharges pour véhicules électriques</li>
					</ul>
				</div>
			</div>
			<div className='office__image'>
				<img src={officeImage} alt='office' />
			</div>
		</section>
	)
}

export default Office
