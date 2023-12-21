import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

import calcTotalPrice from '../../utils/calcTotalPrice'
import calcTotalCount from '../../utils/calcTotalCount'
import { getCartItemsFromLocalStorage } from '../../utils/getCartItemsFromLS'

const { items, totalCount, totalPrice } = getCartItemsFromLocalStorage()

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items,
		totalCount,
		totalPrice,
		// isLoading: false,
		// message: '',
	},
	reducers: {
		addItem(state, { payload }) {
			const findItem = state.items.find(obj => obj.id === payload.id)
			if (findItem) {
				findItem.count += payload.count
			} else {
				state.items.push(payload)
			}
			state.totalPrice = calcTotalPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},
		changeItemCount(state, { payload }) {
			const findItem = state.items.find(obj => obj.id === payload.id)
			findItem.count = payload.value
			state.totalPrice = calcTotalPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},
		removeItem(state, { payload }) {
			state.items = state.items.filter(obj => obj.id !== payload)
			state.totalPrice = calcTotalPrice(state.items)
			state.totalCount = calcTotalCount(state.items)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
	extraReducers: builder => {},
})

export const { addItem, changeItemCount, removeItem, clearItems } = cartSlice.actions
export default cartSlice.reducer
