import React, { useState } from 'react'

import './Accordion.scss'

import { AccordionItem } from './AccordionItem'

export const Accordion = ({ list, multiple = false, classes = '' }) => {
	const [activeId, setActiveId] = useState(null)

	return (
		<ul className={`${classes} accordion`}>
			{list?.map((item, index) => {
				return (
					<AccordionItem
						key={index}
						item={item}
						id={index}
						activeId={activeId}
						setActiveId={setActiveId}
						multiple={multiple}
					/>
				)
			})}
		</ul>
	)
}
