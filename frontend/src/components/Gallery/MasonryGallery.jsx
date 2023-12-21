import React from 'react'
import galleryImages from './galleryImages.js'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import './MasonryGallery.scss'
import Modal from '../../shared/Modal/Modal.jsx'
import lockBody from '../../utils/lockBody.js'

const MasonryGallery = () => {
	const [data, setData] = React.useState({ img: '', i: 0 })
	const [activeModal, setActiveModal] = React.useState(false)

	const viewImage = (img, i) => {
		setData({ img, i })
		setActiveModal(true)
		lockBody(true)
	}

	return (
		<div className='gallery'>
			<Modal active={activeModal} setActive={setActiveModal}>
				<img
					src={data.img}
					alt=''
					style={{
						width: '100%',
						maxHeight: '90vh',
					}}
				/>
			</Modal>

			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 480: 1, 768: 2, 992: 3 }}>
				<Masonry gutter='10px'>
					{galleryImages.map((image, index) => (
						<img
							key={index}
							className='mansory__img'
							src={image}
							alt=''
							style={{ width: '100%', display: 'block', cursor: 'pointer' }}
							onClick={() => viewImage(image, index)}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	)
}

export default MasonryGallery
