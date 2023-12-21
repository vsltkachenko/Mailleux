import React, { useEffect, useRef, useState } from 'react'
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon'
import { useClickOutside } from '../../hooks/useClickOutside'
import AccordionItemContent from './AccordionItemContent'

export const AccordionItem = ({ item, id, activeId, setActiveId, multiple }) => {
	const itemRef = useRef(null)
	const contentRef = useRef(null)

	const [heightEl, setHeightEl] = useState()
	const [isItemOpen, setItemOpen] = useState(false) // стейт для режиму multiple

	const isOpen = multiple ? isItemOpen : id === activeId

	const onClickItem = () => {
		if (multiple) {
			setItemOpen(!isItemOpen)
		} else {
			setActiveId(id === activeId ? null : id)
		}
	}
	useEffect(() => {
		isOpen ? itemRef.current.classList.add('active') : itemRef.current.classList.remove('active')
	}, [isOpen])

	useEffect(() => {
		setHeightEl(contentRef.current.clientHeight)
	}, [contentRef])

	useEffect(() => {
		const getContentHeight = () => {
			const contentHeight = contentRef.current.clientHeight

			if (contentHeight !== heightEl) {
				setHeightEl(contentHeight)
			}
		}

		window.addEventListener('resize', getContentHeight)
		return () => {
			window.removeEventListener('resize', getContentHeight)
		}
	}, [heightEl, contentRef])

	useClickOutside(itemRef, () => {
		if (!multiple && isOpen) {
			setActiveId(null)
		}
	})

	const collapseStyle = {
		overflow: 'hidden',
		transition: 'height 0.3s ease-in-out',
		height: isOpen ? heightEl + 'px' : '0',
		visibility: isOpen ? 'visible' : '',
	}

	return (
		<li className='accordion__item' ref={itemRef}>
			<button className='accordion__title' onClick={onClickItem}>
				{item.title}
				<ArrowDownSLineIcon className={`arrow-down ${isOpen ? 'active' : ''}`} size={16} />
			</button>
			<div className='accordion__collapse' style={collapseStyle}>
				<AccordionItemContent item={item} contentRef={contentRef} />
			</div>
		</li>
	)
}
