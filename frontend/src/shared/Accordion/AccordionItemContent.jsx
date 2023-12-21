import React from 'react'
import { Link } from 'react-router-dom'



const AccordionItemContent = ({ item, contentRef }) => {
	return (
		<ul className='accordion__content content-accordion' ref={contentRef}>
			{item.content.map((content, index) => (
				<li className='content-accordion__item' key={index}>
					{content.link ? (
						<Link to={content.link} className='content-accordion__link menu__link'>
							{content.text}
						</Link>
					) : (
						<div className='content-accordion__text'>{content.text}</div>
					)}
				</li>
			))}
		</ul>
	)
}
export default AccordionItemContent
