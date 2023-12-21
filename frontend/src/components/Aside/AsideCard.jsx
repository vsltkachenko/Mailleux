import React from 'react'
import './AsideCard.scss'

import { Link } from 'react-router-dom'
import Checkbox from '../../shared/Checkbox/Checkbox'
import { useSelector } from 'react-redux'

const AsideCard = ({ title, categories, checkList, asideClose, setFilters }) => {
	const {
		activeCategoryId,
		quantityPerPage,
		sortType,
		stock,
		square,
		round,
		ovale,
		tree,
		rect,
		fixed,
		long,
	} = useSelector(state => state.filters)
	const checkboxes = { stock, square, round, ovale, tree, rect, fixed, long }

	const checkboxChange = e => {
		setFilters({ [e.target.name]: e.target.checked, currentPage: 0 })
	}

	return (
		<div className='aside-card'>
			<h4 className='aside-card__title'>{title}</h4>
			<div className='aside-card__body'>
				<ul className='aside-card__nav'>
					{categories?.map((item, index) => (
						<li className='aside-card__item' key={index}>
							<Link
								to={`?activeCategoryId=${index}&currentPage=0&quantityPerPage=${quantityPerPage}&sortType=${sortType}`}
								className={`aside-card__link ${Number(activeCategoryId) === index ? 'active' : ''}`}
								onClick={asideClose}
							>
								{item.category.text}
							</Link>
						</li>
					))}
					{checkList?.map((item, index) => (
						<li className='aside-card__item' key={index}>
							<Checkbox
								name={item.name}
								text={item.text}
								checked={checkboxes[item.name]}
								onChange={checkboxChange}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default AsideCard
