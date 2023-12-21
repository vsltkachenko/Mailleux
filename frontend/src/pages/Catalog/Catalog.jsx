import React, { useEffect, useState } from 'react'

import './Catalog.scss'

import { categories } from '../../shared/MegaMenu/MegaMenu'

import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import ProductCard from '../../shared/ProductCard/ProductCard'
import Aside from '../../components/Aside/Aside'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../features/products/productsSlice'
import useSearchFilters from '../../hooks/useSearchFilters'
import { setFiltersToStore } from '../../features/products/filtersSlice'
import { useComponentDidMount } from '../../hooks/useComponentDidMount'
import useIsMobile from '../../hooks/useIsMobile'
import Paginations from '../../shared/Paginations/Paginations'
import CatalogHeader from './CatalogHeader'
import AsideCard from '../../components/Aside/AsideCard'

const initialFilters = {
	activeCategoryId: 'all',
	currentPage: 0,
	quantityPerPage: 12,
	sortType: 'relevance',
}
const filterList = [
	{ title: 'Catégories', categories },
	{ title: 'Etat de stock', checkList: [{ text: 'En stock', name: 'stock' }] },
	{
		title: 'Forme',
		checkList: [
			{ text: 'Carré', name: 'square' },
			{ text: 'Ronde', name: 'round' },
			{ text: 'Ovale', name: 'ovale' },
			{ text: "Effet tronc d'arbre", name: 'tree' },
			{ text: 'Rectangulaire', name: 'rect' },
		],
	},
	{
		title: 'Type',
		checkList: [
			{ text: 'Fixe', name: 'fixed' },
			{ text: 'Allonge', name: 'long' },
		],
	},
]

const Catalog = () => {
	useScrollToTop()
	const isMobile = useIsMobile(992)
	const isComponentMounted = useComponentDidMount()
	const dispatch = useDispatch()

	const [isAsideOpen, setAsideOpen] = useState(false)
	const asideClose = () => setAsideOpen(false)

	const { products } = useSelector(state => state.products)
	const filtersFromStore = useSelector(state => state.filters)

	const { filters, setFilters } = useSearchFilters(initialFilters)

	useEffect(() => {
		dispatch(setFiltersToStore(filters))
	}, [filters, dispatch])

	useEffect(() => {
		if (isComponentMounted) {
			dispatch(getProducts(filtersFromStore))
		}
	}, [filtersFromStore, dispatch, isComponentMounted])

	return (
		<section className='catalog'>
			<div className='container'>
				<SectionHeader title='Produits' subtitle='Notre sélection' />
				<div className='catalog__content'>
					<Aside active={isAsideOpen && isMobile} asideClose={asideClose}>
						{filterList.map((card, index) => (
							<AsideCard
								key={index}
								title={card.title}
								categories={card.categories}
								checkList={card.checkList}
								asideClose={asideClose}
								setFilters={setFilters}
							/>
						))}
					</Aside>
					<div className='catalog__main'>
						<CatalogHeader setFilters={setFilters} asideOpen={() => setAsideOpen(true)} />

						<div className='catalog__products'>
							{products?.map((product, index) => (
								<ProductCard product={product} key={index} />
							))}
						</div>

						<Paginations setFilters={setFilters} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Catalog
