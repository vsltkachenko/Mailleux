import React from 'react'
import './Aside.scss'

import BackDrop from '../../shared/BackDrop/BackDrop'

const Aside = ({ active, asideClose, children, classes }) => {
	return (
		<>
			<BackDrop active={active} close={asideClose} />
			<aside className={`aside ${classes} ${active ? 'open' : ''}`}>{children}</aside>
		</>
	)
}

export default Aside
