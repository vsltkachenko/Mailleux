import React, { useEffect, useState } from 'react'

import './MegaMenu.scss'
import categoryImages from './categoryImages.js'
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon'
import ImageCategory from '../ImageCategory/ImageCategory'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const categories = [
	{
		category: { text: 'Chaises', link: 'chaises', id: 0 },
		subcategories: [
			{ text: 'Chaises', link: 'chaises' },
			{ text: 'Chaises de bar', link: 'chaises-de-bar' },
			{ text: 'Bancs', link: 'bancs' },
		],
	},
	{
		category: { text: 'Salons', link: 'salons', id: 1 },
		subcategories: [
			{ text: 'Canapés', link: 'canapes' },
			{ text: "Salons d'angle", link: 'salons-d-angle' },
			{ text: 'Fauteuils', link: 'fauteuils' },
			{ text: 'Relax', link: 'relax' },
			{ text: 'Salons', link: 'salons' },
			{ text: 'Accessoires', link: 'accessoires' },
		],
	},
	{
		category: { text: 'Tables', link: 'tables', id: 2 },
		subcategories: [
			{ text: 'Tables de salle à manger', link: 'tables-de-salle-manger' },
			{ text: 'Tables de bar', link: 'tables-de-bar' },
			{ text: 'Tables de salon', link: 'tables-de-salon' },
			{ text: "Tables d'appoint", link: 'tables-d-appoint' },
		],
	},
	{
		category: { text: 'Meubles de salle à manger', link: 'meubles-de-salle-manger', id: 3 },
		subcategories: [
			{ text: 'Canapés', link: 'canapes' },
			{ text: "Salons d'angle", link: 'salons-d-angle' },
			{ text: 'Fauteuils', link: 'fauteuilss' },
			{ text: 'Relax', link: 'relax' },
			{ text: 'Convertibles', link: 'convertibles' },
			{ text: 'Salons', link: 'salons' },
			{ text: 'Accessoires', link: 'accessoires' },
		],
	},
	{
		category: { text: 'Chambres à coucher', link: 'chambres-coucher', id: 4 },
		subcategories: [
			{ text: 'Chaises', link: 'chaises' },
			{ text: 'Chaises de bar', link: 'chaises-de-bar' },
			{ text: 'Bancs', link: 'bancs' },
		],
	},
	{
		category: { text: 'Literies', link: 'literies', id: 5 },
		subcategories: [
			{ text: 'Tables de salle à manger', link: 'tables-de-salle-manger' },
			{ text: 'Tables de bar', link: 'tables-de-bar' },
			{ text: 'Tables de salon', link: 'tables-de-salon' },
			{ text: "Tables d'appoint", link: 'tables-d-appoint' },
		],
	},
	{
		category: { text: 'Enfants', link: 'enfants', id: 6 },
		subcategories: [
			{ text: 'Canapés', link: 'canapes' },
			{ text: "Salons d'angle", link: 'salons-d-angle' },
			{ text: 'Fauteuils', link: 'fauteuils' },
			{ text: 'Relax', link: 'relax' },
			{ text: 'Convertibles', link: 'convertibles' },
			{ text: 'Salons', link: 'salons' },
			{ text: 'Accessoires', link: 'accessoires' },
		],
	},
	{
		category: { text: 'Bureaux', link: 'bureaux', id: 7 },
		subcategories: [
			{ text: 'Bureaux', link: 'bureaux' },
			{ text: 'Fauteuils de bureau', link: 'fauteuils-de-bureau' },
		],
	},
	{
		category: { text: 'Promos', link: 'promos', id: 8 },
	},
]

const MegaMenu = () => {
	const { activeCategoryId } = useSelector(state => state.filters)
	const [hoverIndex, setHoverIndex] = useState(
		activeCategoryId === 'all' ? 0 : Number(activeCategoryId)
	)

	const closeMegaMenu = e => {
		// console.log(e)
		if (e.target.closest('.mega-menu__link') || e.target.closest('.mega-menu__image')) {
			e.target.closest('.mega-menu').style.display = 'none'
			setTimeout(() => {
				e.target.closest('.mega-menu').style.display = ''
			}, 100)
		}
	}
	useEffect(() => {
		setHoverIndex(activeCategoryId === 'all' ? 0 : activeCategoryId)
	}, [activeCategoryId])

	return (
		<div
			className='mega-menu'
			onMouseLeave={() => {
				setHoverIndex(activeCategoryId === 'all' ? 0 : Number(activeCategoryId))
			}}
		>
			<div className='mega-menu__body'>
				<div className='mega-menu__content'>
					<ul className='mega-menu__block'>
						{categories.map((item, indexCategory) => (
							<li
								className={`mega-menu__column ${
									Number(activeCategoryId) === indexCategory ? 'active' : ''
								}`}
								key={indexCategory}
							>
								<Link
									to={`catalog/?activeCategoryId=${indexCategory}`}
									className='mega-menu__link'
									onClick={e => closeMegaMenu(e)}
									onMouseEnter={() => setHoverIndex(indexCategory)}
								>
									<span>{item.category.text}</span>
								</Link>
								<ul className='mega-menu__list'>
									{item.subcategories?.map((subcategory, index) => (
										<li className='mega-menu__item' key={index}>
											<Link
												// href={`/catalog/${item.category.link}/${subcategory.link}`}
												to={`catalog/?activeCategoryId=${indexCategory}`}
												className='mega-menu__link'
												onClick={e => closeMegaMenu(e)}
												onMouseEnter={() => setHoverIndex(indexCategory)}
											>
												{subcategory.text}
											</Link>
										</li>
									))}
								</ul>
							</li>
						))}
						<li className='mega-menu__column all-products'>
							<a href='/' className='mega-menu__link'>
								<span>Voir tous les produits</span>
							</a>
							<ArrowRightSLineIcon size={22} />
						</li>
					</ul>
				</div>
				<div className='mega-menu__image' onClick={e => closeMegaMenu(e)}>
					<ImageCategory
						category={categories[hoverIndex].category}
						image={categoryImages[hoverIndex]}
						activeCategoryId={hoverIndex}
					/>
				</div>
			</div>
		</div>
	)
}

export default MegaMenu
