import React, { useEffect } from 'react'
import './BackDrop.scss'
import lockBody from '../../utils/lockBody'

const BackDrop = ({ active, close }) => {
	useEffect(() => {
		lockBody(active)
	}, [active])
	
	return <div onClick={close} className={`backdrop ${active ? 'active' : ''}`} />
}

export default BackDrop
