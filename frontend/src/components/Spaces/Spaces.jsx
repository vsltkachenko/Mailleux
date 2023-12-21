import React from 'react'

import CategorySlider from './CategorySlider'
import SectionHeader from '../../shared/SectionHeader/SectionHeader'

const Spaces = () => {
	return (
		<section className='spaces'>
			<div className='container'>
				<SectionHeader
					subtitle='Tendance d’intérieur'
					title='Les espaces'
					text='Avec Mailleux, créez des espaces inspirants. Parcourez les pièces de la maison et découvrez
				l’étendue de notre collection.'
				/>
			</div>
			<CategorySlider />
		</section>
	)
}

export default Spaces
