import React from 'react'

import './Modal.scss'

const Modal = ({ active, modalClose, children }) => {
	return (
		<div className={`modal ${active ? 'active' : ''}`} onClick={modalClose}>
			<div className='modal__box'>
				<div className='modal__content' onClick={e => e.stopPropagation()}>
					{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non quo eveniet
					iusto voluptatum? Reprehenderit tenetur iure alias, exercitationem ut cupiditate fugit */}
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
