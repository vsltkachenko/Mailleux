import React, { useEffect } from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import FollowUs from './shared/FollowUs/FollowUs'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import {  getMe } from './features/auth/authSlice'
import Catalog from './pages/Catalog/Catalog'
import Product from './pages/Product/Product'
import Contact from './pages/Contact/Contact'
import Cart from './pages/Cart/Cart.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import LoginHookForm from './pages/Login/LoginHookForm.jsx'
import RegisterHookForm from './pages/Register/RegisterHookForm.jsx'
import Preloader from './shared/Preloader/Preloader.jsx'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])

	return (
		<div className='app'>
			<Header />

			<main className='main'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<RegisterHookForm />} />
					<Route path='/login' element={<LoginHookForm />} />
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/catalog/product/:id' element={<Product />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/dashboard/:path' element={<Dashboard />} />
				</Routes>
			</main>

			<Footer />

			<FollowUs />
			<ToastContainer position='bottom-right' theme='light' />
			<Preloader />
		</div>
	)
}

export default App
