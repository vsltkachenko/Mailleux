import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './auth/authSlice'
import productsSliceReducer from './products/productsSlice'
import filtersSliceReducer from './products/filtersSlice'
import cartSliceReducer from './cart/cartSlice'


export const store = configureStore({
	reducer: {
		auth: authSliceReducer,
		products: productsSliceReducer,
		filters: filtersSliceReducer,
		cart: cartSliceReducer,
	},
})
