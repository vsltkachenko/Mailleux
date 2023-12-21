import React, { useState } from 'react'
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon'

const list = [
	{
		title: 'Mailleux',
		content:
			'11111 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda pariatur perspiciatis dolorem repudiandae odio mollitia omnis eaque, saepe perferendis nam esse ducimus deleniti aut. Tempore, sint sequi? Voluptates, labore pariatur',
	},
	{
		title: 'Blog',
		content:
			'22222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem inventore adipisci ullam voluptate, atque non, dolore eligendi aliquid voluptatem beatae corporis unde repellendus nam ipsa rem qui eos ut?',
	},
	{
		title: 'Mailleux',
		content:
			'11111 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda pariatur perspiciatis dolorem repudiandae odio mollitia omnis eaque, saepe perferendis nam esse ducimus deleniti aut. Tempore, sint sequi? Voluptates, labore pariatur',
	},
	{
		title: 'Blog',
		content:
			'22222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem inventore adipisci ullam voluptate, atque non, dolore eligendi aliquid voluptatem beatae corporis unde repellendus nam ipsa rem qui eos ut?',
	},
]

const Acc = () => {
	const [selected, setSelected] = useState(null)

	const toggle = index => {
		if (selected === index) {
			return setSelected(null)
		}
		setSelected(index)
	}

	return (
		<div className='wrap'>
			<div className='accordion'>
				{list.map((item, index) => (
					<div className='accordion__item' key={index}>
						<div
							className={`accordion__title  menu__link_arrow`}
							onClick={() => {
								toggle(index)
							}}
						>
							{item.title}
							<ArrowDownSLineIcon
								className={`arrow-down ${selected === index ? 'active' : ''}`}
								size={16}
							/>
						</div>
						<div
							className={`${selected === index ? 'accordion__content show' : 'accordion__content'}`}
						>
							{item.content}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
export default Acc
