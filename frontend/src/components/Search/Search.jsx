import React, { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import { debounce } from 'lodash-es'

import './Search.scss'
import { useDispatch, useSelector } from 'react-redux'

import {
	getSuggestionsProducts,
	setSuggestionsProducts,
} from '../../features/products/productsSlice'
import Suggestions from './Suggestions'
import Button from '../../shared/Button/Button'

const Search = ({ isSearchOpen, closeSearch }) => {
	const dispatch = useDispatch()
	const { quantityPerPage, sortType } = useSelector(state => state.filters)

	const [searchValue, setSearchValue] = useState('')

	const makeRequest = useMemo(
		() =>
			debounce(value => {
				dispatch(getSuggestionsProducts({ searchValue: value, productsCount: 7 }))
			}, 350),
		[dispatch]
	)

	const onChangeInput = event => {
		const { value } = event.target
		setSearchValue(value)
		makeRequest(value)
	}
	const showSuggestions = () => {
		const suggestions = document.querySelector('.suggestions')
		suggestions.style.display = ''
	}
	const closeSuggestions = () => {
		const suggestions = document.querySelector('.suggestions')
		suggestions.style.display = 'none'
	}
	const clickOutside = e => {
		if (!e.target.classList.contains('search-form__input') && !e.target.closest('.suggestions')) {
			closeSuggestions()
		}
	}
	const searchHandler = () => {
		setSearchValue('')
		dispatch(setSuggestionsProducts([]))
		closeSearch()
	}

	const portalElement = document.querySelector('.app')

	if (portalElement)
		return createPortal(
			<div className={`search ${isSearchOpen ? 'open' : ''}`} onClick={e => clickOutside(e)}>
				<Button
					type='button'
					classes='btn-close'
					onClick={() => {
						closeSearch()
						closeSuggestions()
					}}
				/>
				<div className='search__container'>
					<div className='search__content'>
						<form action='#' className='search-form'>
							<h3>Que recherchez-vous?</h3>
							<div className='search-form__group'>
								<input
									type='text'
									name='search'
									className='search-form__input'
									value={searchValue}
									onChange={onChangeInput}
									placeholder='Que recherchez-vous?'
									autoComplete='off'
									onClick={showSuggestions}
								/>
								<Button
									type='link'
									path={`/catalog?quantityPerPage=${quantityPerPage}&sortType=${sortType}&searchValue=${searchValue}`}
									classes='btn-search'
									onClick={searchHandler}
								>
									<SearchLineIcon size={25} />
								</Button>
								<Suggestions closeSearch={closeSearch} closeSuggestions={closeSuggestions} />
							</div>
						</form>
					</div>
				</div>
			</div>,
			portalElement
		)
}

export default Search
