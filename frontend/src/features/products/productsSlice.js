import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/getProducts', async (filters, thunkAPI) => {
	try {
		const {
			currentPage,
			activeCategoryId,
			quantityPerPage,
			sortType,
			searchValue,
			stock,
			square,
			round,
			ovale,
			tree,
			rect,
			fixed,
			long,
		} = filters

		const { data } = await axios.get(
			`${
				process.env.REACT_APP_BACKEND_URL
			}products?activeCategoryId=${activeCategoryId}&currentPage=${currentPage}&quantityPerPage=${quantityPerPage}&sortType=${sortType}${
				searchValue ? `&searchValue=${searchValue}` : ''
			}${stock ? `&stock=${stock}` : ''}${square ? `&square=${square}` : ''}${
				round ? `&round=${round}` : ''
			}${ovale ? `&ovale=${ovale}` : ''}${tree ? `&tree=${tree}` : ''}${
				rect ? `&rect=${rect}` : ''
			}${fixed ? `&fixed=${fixed}` : ''}${long ? `&long=${long}` : ''}`
		)
		// console.log(data)
		return data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

export const getSingleProduct = createAsyncThunk(
	'products/getSingleProduct',
	async (filters, thunkAPI) => {
		try {
			const { id } = filters

			const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products/${id}`)

			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

export const getSuggestionsProducts = createAsyncThunk(
	'products/getSuggestionsProducts',
	async (filters, thunkAPI) => {
		try {
			const { searchValue, productsCount } = filters

			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}search/suggestions?searchValue=${searchValue}&productsCount=${productsCount}`
			)
			// console.log(data)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)
export const getRelatedProduct = createAsyncThunk(
	'products/getRelatedProduct',
	async (filters, thunkAPI) => {
		try {
			const {categoryId, productsCount } = filters

			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}related/?categoryId=${categoryId}&productsCount=${productsCount}`
			)
			// console.log(data)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)
export const getSelectedProducts = createAsyncThunk(
	'products/getSelectedProducts',
	async (filters, thunkAPI) => {
		try {
			const { productsCount } = filters

			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}related/?categoryId=all&productsCount=${productsCount}`
			)
			// console.log(data)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data)
		}
	}
)

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		singleProduct: null,
		isLoading: false,
		message: '',
		productsCount: 0,
		pageCount: 0,
		selectedProducts: [],
		relatedProducts: [],
		suggestionsProducts: [],
	},
	reducers: {
		setSuggestionsProducts(state, { payload }) {
			state.suggestionsProducts = payload
		},
		setSelectedProducts(state, { payload }) {
			state.selectedProducts = payload
		},
		setSingleProduct(state, { payload }) {
			state.singleProduct = payload
		},
	},
	extraReducers: builder => {
		//get all Products
		builder.addCase(getProducts.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getProducts.fulfilled, (state, { payload }) => {
			state.products = payload.data
			state.productsCount = payload.productsCount
			state.pageCount = payload.pageCount
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(getProducts.rejected, (state, { payload }) => {
			state.products = []
			state.isLoading = false
			state.message = payload.message
		})

		//get Single Product
		builder.addCase(getSingleProduct.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
			state.singleProduct = payload.data
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(getSingleProduct.rejected, (state, { payload }) => {
			state.singleProduct = null
			state.isLoading = false
			state.message = payload.message
		})

		// getSuggestionsProducts
		builder.addCase(getSuggestionsProducts.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getSuggestionsProducts.fulfilled, (state, { payload }) => {
			state.suggestionsProducts = payload.data
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(getSuggestionsProducts.rejected, (state, { payload }) => {
			state.suggestionsProducts = []
			state.isLoading = false
			state.message = payload.message
		})
		// getSelectedProducts
		builder.addCase(getSelectedProducts.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getSelectedProducts.fulfilled, (state, { payload }) => {
			state.selectedProducts = payload.data
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(getSelectedProducts.rejected, (state, { payload }) => {
			state.selectedProducts = []
			state.isLoading = false
			state.message = payload.message
		})

		// getRelatedProduct
		builder.addCase(getRelatedProduct.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getRelatedProduct.fulfilled, (state, { payload }) => {
			state.relatedProducts = payload.data
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(getRelatedProduct.rejected, (state, { payload }) => {
			state.relatedProducts = []
			state.isLoading = false
			state.message = payload.message
		})
	},
})

export const { setSelectedProducts, setSuggestionsProducts, setSingleProduct } = productsSlice.actions
export default productsSlice.reducer
