import React from 'react'
import galleryImages from './galleryImages.js'

import './MasonryGallery.scss'

import MailLineIcon from 'remixicon-react/MailLineIcon'
import { Link } from 'react-router-dom'

const MasonryGalleryDesandro = () => {
	return (
		<div className='masonry-gallery'>
			<div className='grid'>
				<div className='grid-sizer'></div>
				{galleryImages.map((image, index) => (
					<Link to='/' className='grid-item' key={index}>
						<img
							className=''
							src={image}
							alt=''
							// style={{ width: '100%', display: 'block', cursor: 'pointer' }}
							// onClick={() => viewImage(image, index)}
						/>
						<div className='grid-item__inner'>
							<div className='grid-item__text'>
								<div className='badge'>
									<MailLineIcon />
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default MasonryGalleryDesandro
