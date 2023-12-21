import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeCategoryId: 'all', // string
	currentPage: 0, // number
	quantityPerPage: 12, // number | string
	sortType: 'relevance', // string
	// searchValue: '',
	// stock: false,
	// square: false,
	// round: false,
	// ovale: false,
	// tree: false,
	// rect: false,
	// fixed: false,
	// long: false,
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFiltersToStore(
			state,
			{
				payload: {
					activeCategoryId,
					currentPage,
					sortType,
					quantityPerPage,
					searchValue,
					stock,
					square,
					round,
					ovale,
					tree,
					rect,
					fixed,
					long,
				},
			}
		) {
			state.activeCategoryId = activeCategoryId
			state.currentPage = Number(currentPage)
			state.quantityPerPage = quantityPerPage === 'all' ? quantityPerPage : Number(quantityPerPage)
			state.sortType = sortType
			state.searchValue = searchValue || ''

			state.stock = stock === 'true' ? true : false
			state.square = square === 'true' ? true : false
			state.round = round === 'true' ? true : false
			state.ovale = ovale === 'true' ? true : false
			state.tree = tree === 'true' ? true : false
			state.rect = rect === 'true' ? true : false
			state.fixed = fixed === 'true' ? true : false
			state.long = long === 'true' ? true : false
		},
	},
})

export const { setFiltersToStore } = filtersSlice.actions
export default filtersSlice.reducer
