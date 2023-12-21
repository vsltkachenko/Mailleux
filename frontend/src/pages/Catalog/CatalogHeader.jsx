import React from 'react'

import PageCounter from '../../shared/PageCounter/PageCounter'
import CustomSelect from '../../shared/CustomSelect/CustomSelect'
import Button from '../../shared/Button/Button'
import { useSelector } from 'react-redux'


const perPageOptions = [
	{ value: 6, label: '6 produits / page' },
	{ value: 12, label: '12 produits / page' },
	{ value: 18, label: '18 produits / page' },
	{ value: 'all', label: 'Tous les produits' },
]
const sortList = [
	{ value: 'relevance', label: 'Pertinence' },
	{ value: 'new', label: 'Nouveautés' },
	{ value: 'az', label: 'Nom de A à Z' },
	{ value: 'za', label: 'Nom de Z à A' },
	{ value: 'desc', label: 'Prix  décroissant' },
	{ value: 'asc', label: 'Prix croissant' },
]

const CatalogHeader = ({ setFilters, asideOpen }) => {
	const { quantityPerPage, sortType } = useSelector(state => state.filters)

	return (
		<div className='catalog__header'>
			<div className='catalog__tools'>
				{/* quantityPerPage Select */}
				<CustomSelect
					options={perPageOptions}
					currentValue={quantityPerPage}
					setCurrentValue={value => {
						setFilters({ quantityPerPage: value, currentPage: 0 })
					}}
					classes='catalog__select'
				/>
				{/* sortType Select */}
				<CustomSelect
					options={sortList}
					currentValue={sortType}
					setCurrentValue={value => {
						setFilters({ sortType: value })
					}}
					classes='catalog__select'
				/>
				<Button type='button' classes={'btn btn_fixed'} onClick={asideOpen}>
					Filters
				</Button>
			</div>
			<PageCounter />
		</div>
	)
}

export default CatalogHeader
