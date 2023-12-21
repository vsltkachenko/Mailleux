import React, { useState } from 'react'
import './Cart.scss'
import SectionHeader from '../../shared/SectionHeader/SectionHeader'

import Button from '../../shared/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import useScrollToTop from '../../hooks/useScrollToTop'
import { checkIsAuth, getMe } from '../../features/auth/authSlice'
import { instance } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearItems } from '../../features/cart/cartSlice'
import CartDetails from '../../shared/CartDetails/CartDetails'
import ReviewInfo from '../../shared/ReviewInfo/ReviewInfo'

export const shippingCountryOptions = [
	{ value: 1, label: 'France' },
	{ value: 2, label: 'Belgique' },
	{ value: 3, label: 'Luxembourg' },
]
export const shippingPlaceOptions = [
	{ value: 0, label: '' },
	{ value: 1, label: 'Retrait en magasin (ANGLEUR) - Gratuit' },
	{ value: 2, label: 'Livraison à domicile - EUR 81,82 HT' },
	{ value: 3, label: 'Retrait au magasin de Neupré - Gratuit' },
	{ value: 4, label: 'Retrait au magasin de Namur - Gratuit' },
	{ value: 5, label: 'Retrait au magasin de Bastogne - Gratuit' },
]

const Cart = () => {
	useScrollToTop()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { activeCategoryId, currentPage, quantityPerPage, sortType } = useSelector(
		state => state.filters
	)
	const isAuth = useSelector(checkIsAuth)

	const { items, totalPrice } = useSelector(state => state.cart)

	const clearCart = () => {
		const ok = window.confirm('Clear the cart?')
		ok && dispatch(clearItems()) && toast('Cart cleared!')
	}

	const [shippingCountry, setShippingCountry] = useState(1)
	const [shippingPlace, setShippingPlace] = useState(0)

	const submitHandler = async e => {
		if (!shippingPlace) return
		e.preventDefault()

		if (!isAuth) {
			navigate('/login')
			return
		}

		const order = {
			items,
			shippingCountry: shippingCountryOptions[shippingCountry - 1].label,
			shippingPlace: shippingPlaceOptions[shippingPlace].label,
			totalPrice,
		}

		try {
			const { data } = await instance.post('customer/order', order)
			data?.success && toast(data.message)
			dispatch(clearItems())
			dispatch(getMe())
			navigate('/dashboard/customer')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className='cart'>
			<div className='container'>
				<div className='cart__content'>
					<SectionHeader
						subtitle='Shopping Cart'
						title='Mon panier'
						text={items.length ? '' : "Votre panier d'achat est vide."}
					/>
					{items.length ? (
						<form action='#' className='cart__form'>
							<CartDetails items={items} />
							<div className='cart__clear'>
								<Button type='button' classes='btn-clear' onClick={clearCart}>
									Vider le panier
								</Button>
							</div>
							<div className='cart__review review'>
								<div className='review__coupon'>
									<h2>Code promo</h2>
									<div className='review__coupon_group'>
										<input
											className='form__input review__input'
											type='text'
											id='promoInput'
											autoComplete='off'
										/>
										<Button type='button' classes='btn review__btn'>
											Valider
										</Button>
									</div>
								</div>
								<ReviewInfo
									shippingCountry={shippingCountry}
									shippingPlace={shippingPlace}
									setShippingCountry={setShippingCountry}
									setShippingPlace={setShippingPlace}
									totalPrice={totalPrice}
								/>
							</div>
							<div className='cart__return-checkout'>
								<Button
									type='link'
									path={`/catalog?activeCategoryId=${activeCategoryId}&currentPage=${currentPage}&quantityPerPage=${quantityPerPage}&sortType=${sortType}`}
									classes='btn btn-return btn_white'
								>
									Continuer mes achats
								</Button>
								<Button type='submit' classes='btn' onClick={submitHandler}>
									Commander
								</Button>
							</div>
							<div className='cart__card'>
								<h3>Connexion et paiements sécurisés</h3>
								<p>
									Grâce au certificat SSL, votre connexion aux différents services de paiement est
									sûre
								</p>
							</div>
						</form>
					) : (
						<Button
							type='link'
							path={`/catalog?activeCategoryId=${activeCategoryId}&currentPage=${currentPage}&quantityPerPage=${quantityPerPage}&sortType=${sortType}`}
							classes='btn btn-return btn-return_empty btn_white'
						>
							Continuer mes achats
						</Button>
					)}
				</div>
			</div>
		</section>
	)
}

export default Cart
