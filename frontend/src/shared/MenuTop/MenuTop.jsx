import React from 'react'

import './MenuTop.scss'

import { Accordion } from '../Accordion/Accordion'
import { Link } from 'react-router-dom'

const accordionList = [
	{
		title: 'Mailleux',
		content: [
			{ text: 'Philosophie', link: 'philosophie' },
			{ text: 'Équipe', link: 'equipe' },
			{ text: 'Nos points forts', link: 'points-forts' },
			{ text: 'Notre histoire', link: 'notre-histoire' },
			{ text: 'SAV', link: 'sav' },
		],
	},
	{
		title: 'Blog',
		content: [
			{ text: 'Promotions', link: 'promotions' },
			{ text: 'Le blog', link: 'blog' },
			{ text: 'Actus', link: 'actus' },
			{ text: 'Jobs', link: 'jobs' },
		],
	},
]

const MenuTop = () => {
	return (
		<div className='menu-top'>
			<ul className='menu-top__list'>
				<li className='menu-top__item'>
					<Link to='/nos-magasins' className='menu__link'>
						Nos magasins
					</Link>
				</li>

				<li className='menu-top__item'>
					<Accordion list={accordionList} classes='menu-top__accordion' />
				</li>

				<li className='menu-top__item'>
					<Link to='/contact' className='menu__link'>
						Contact
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default MenuTop
