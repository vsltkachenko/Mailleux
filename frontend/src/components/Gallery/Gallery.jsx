import React from 'react'

import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import MasonryGalleryDesandro from './MasonryGalleryDesandro'
import Button from '../../shared/Button/Button'

const Gallery = () => {
	return (
		<section className='gallery'>
			<div className='container'>
				<SectionHeader
					subtitle='Du classique au design'
					title='Soyez inspirés'
					text='À travers nos réalisations, nos galeries en magasins, nous vous emmenons à la découverte des nouvelles tendances. Notre mission, vous inspirer.'
				/>
			</div>
			{/* <MasonryGallery /> */}
			<MasonryGalleryDesandro />
			<Button type='link' path='/' classes='btn btn_center'>
				Voir plus d'inspi
			</Button>
		</section>
	)
}

export default Gallery
