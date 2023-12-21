import React from 'react'

import './CartDetails.scss'

import CartItem from './CartItem'
import ReviewInfo from '../ReviewInfo/ReviewInfo'
import dateFormatter from '../../utils/dateFormatter'

const CartDetails = ({ items, order }) => {
	var orderDate = order?.createdAt ? dateFormatter(order.createdAt) : null

	return (
		<>
			{orderDate && <div className='order-date'>{orderDate}</div>}
			<div className='cart__details details-cart'>
				<div className='details-cart__heading heading-details-cart'>
					<div className='heading-details-cart__tr'>
						<div className='heading-details-cart__td'>Article</div>
						<div className='heading-details-cart__td'>Qté</div>
						<div className='heading-details-cart__td'>Prix HT</div>
						<div className='heading-details-cart__td'>Total HT</div>
						<div className='heading-details-cart__td'></div>
					</div>
				</div>
				<div className='details-cart__body body-details-cart'>
					{items?.map(item => (
						<CartItem item={item} key={item.id} />
					))}
				</div>
			</div>
			<ReviewInfo
				shippingCountry={order?.shippingCountry}
				shippingPlace={order?.shippingPlace}
				totalPrice={order?.totalPrice}
			/>
		</>
	)
}

export default CartDetails
