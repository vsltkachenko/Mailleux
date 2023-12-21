import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'

export const registerUser = createAsyncThunk('auth/registerUser', async (payload, thunkAPI) => {
	try {
		const res = await instance.post('auth/register', payload)
		return res.data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, thunkAPI) => {
	try {
		const res = await instance.post('auth/login', payload)
		return res.data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
	try {
		const { data } = await instance.get('auth/me')
		return data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		const res = await instance.post('auth/logout', {})
		return res.data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data)
	}
})

// export const updateUser = createAsyncThunk('user/updateUser', async (payload, thunkAPI) => {
// 	try {
// 		const res = await instance.put(`${process.env.REACT_APP_BACKEND_URL}/users/${payload.id}`, payload)
// 		return res.data
// 	} catch (err) {
// 		console.log(err)
// 		return thunkAPI.rejectWithValue(err)
// 	}
// })

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		currentUser: null,
		isAuth: false,
		isLoading: false,
		message: '',
	},
	reducers: {
		resetAuth: state => {
			state.currentUser = null
			state.isAuth = false
			state.isLoading = false
			state.message = ''
		},
		clearMessage: state => {
			state.message = ''
		},
	},
	extraReducers: builder => {
		builder.addCase(registerUser.fulfilled, (state, { payload }) => {
			state.currentUser = payload.user
			state.isAuth = true
			state.message = payload.message
		})
		builder.addCase(registerUser.rejected, (state, { payload }) => {
			state.isAuth = false
			state.message = payload.message
		})
		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			state.currentUser = payload.user
			state.isAuth = true
			state.message = payload.message
		})
		builder.addCase(loginUser.rejected, (state, { payload }) => {
			state.isAuth = false
			state.message = payload.message
		})
		builder.addCase(getMe.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getMe.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.currentUser = payload.user
			state.isAuth = payload.success
			state.message = payload.message
		})
		builder.addCase(getMe.rejected, (state, { payload }) => {
			state.isLoading = false
			state.isAuth = payload?.success
		})
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			state.currentUser = null
			state.isAuth = false
			state.isLoading = false
			state.message = payload.message
		})
		builder.addCase(logout.rejected, (state, { payload }) => {
			state.isLoading = false
			state.message = payload.message
		})

		// builder.addCase(updateUser.fulfilled, (state, { payload }) => {
		// 	state.currentUser = payload
		// })
	},
})
export const checkIsAuth = state => state.auth.isAuth

export const { resetAuth, clearMessage } = authSlice.actions
export default authSlice.reducer
