import React from 'react'

import InputQuantity from '../InputQuantity/InputQuantity'
import priceFormatter from '../../utils/priceFormatter'
import { Link } from 'react-router-dom'

import DeleteBin6LineIcon from 'remixicon-react/DeleteBin6LineIcon'
import { useDispatch } from 'react-redux'
import { changeItemCount, removeItem } from '../../features/cart/cartSlice'
import Button from '../Button/Button'

const CartItem = ({ item }) => {
	const dispatch = useDispatch()

	const setQuantity = value => {
		dispatch(changeItemCount({ id: item.id, value }))
	}
	const removeItemHandler = () => {
		const ok = window.confirm('Remove product from cart?')
		ok && dispatch(removeItem(item.id))
	}

	return (
		<div className='body-details-cart__tr'>
			<div className='body-details-cart__td'>
				<div className='body-details-cart__td_thumb'>
					<img src={`${process.env.REACT_APP_FRONTEND_URL}${item.image}`} alt='' />
				</div>
				<div className='body-details-cart__td_content'>
					<h4>
						<Link to={`/catalog/product/${item.id}`}>{item.title}</Link>
					</h4>
				</div>
			</div>
			<div className='body-details-cart__td'>
				<div className='body-details-cart__td_cap'>
					<strong>Qté</strong>
				</div>
				<div className='body-details-cart__td_qty'>
					<InputQuantity quantity={item.count} setQuantity={setQuantity} />
					<span>{item.count}</span>
				</div>
			</div>
			<div className='body-details-cart__td'>
				<div className='body-details-cart__td_cap'>
					<strong>Prix</strong>
				</div>
				<div className='body-details-cart__td_price eur'>{priceFormatter(item.price)}</div>
			</div>
			<div className='body-details-cart__td'>
				<div className='body-details-cart__td_cap'>
					<strong>Total</strong>
				</div>
				<div className='body-details-cart__td_price-total eur'>
					{priceFormatter(item.price * item.count)}
				</div>
			</div>
			<div className='body-details-cart__td'>
				<Button type='button' classes='btn-delete' onClick={removeItemHandler}>
					<DeleteBin6LineIcon size={24} />
				</Button>
			</div>
		</div>
	)
}

export default CartItem
