import React from 'react'
import { Link } from 'react-router-dom'

import './Logo.scss'
import { scrollToTop } from '../../utils/scrollToTop'

const Logo = ({ menuClose = () => {} }) => (
	<div className='logo'>
		<Link
			to='/'
			className='_icon-logo'
			onClick={() => {
				menuClose()
				scrollToTop()
			}}
		/>
	</div>
)

export default Logo
