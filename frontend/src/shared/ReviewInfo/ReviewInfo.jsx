import React from 'react'

import CustomSelect from '../../shared/CustomSelect/CustomSelect'
import priceFormatter from '../../utils/priceFormatter'
import { shippingCountryOptions, shippingPlaceOptions } from '../../pages/Cart/Cart'

const ReviewInfo = ({
	shippingCountry,
	shippingPlace,
	setShippingCountry,
	setShippingPlace,
	totalPrice
}) => {
	const condition = shippingPlace === 2 || shippingPlace === 'Livraison à domicile - EUR 81,82 HT'
	const totalHT = totalPrice + (condition ? 81.82 : 0)
	const tax = totalHT * 0.2
	const totalTTC = totalHT + tax

	return (
		<div className='review__info'>
			<div className='review__shipping shipping-review'>
				<label className='shipping-review__field'>
					<span>Pays de livraison</span>
					{/* shippingCountry select */}
					<CustomSelect
						options={shippingCountryOptions}
						currentValue={shippingCountry}
						setCurrentValue={value => {
							setShippingCountry(value)
						}}
						classes='shipping-review__select'
					/>
					<span>{shippingCountry}</span>
				</label>
				<label className='shipping-review__field'>
					<span>Livraison</span>
					{/* shippingPlace select */}
					<CustomSelect
						options={shippingPlaceOptions}
						currentValue={shippingPlace}
						setCurrentValue={value => {
							setShippingPlace(value)
						}}
						classes='shipping-review__select'
					/>
					<span>{shippingPlace}</span>
				</label>
			</div>
			<hr />
			<ul className='review__price-items'>
				{!shippingPlace && (
					<li className='alert-danger'>
						<span className='review__price-item_text'>
							Vous n'avez pas choisi de méthode de livraison
						</span>
					</li>
				)}
				{!!shippingPlace && (
					<li className='review__price-item'>
						<span className='review__price-item_text'>Frais de port HT</span>
						<span className={`review__price-item_price ${condition ? 'eur' : ''}`}>
							{condition ? 81.82 : 'Gratuit'}
						</span>
					</li>
				)}
				<li className='review__price-item'>
					<span className='review__price-item_text'>Total HT</span>
					<span className='review__price-item_price eur'>{priceFormatter(totalHT)}</span>
				</li>
				<li className='review__price-item'>
					<span className='review__price-item_text'>TVA & autres taxes</span>
					<span className='review__price-item_price eur'>{priceFormatter(tax)}</span>
				</li>
				<li className='review__price-item'>
					<span className='review__price-item_text'>Total TTC</span>
					<span className='review__price-item_price eur'>{priceFormatter(totalTTC)}</span>
				</li>
			</ul>
		</div>
	)
}

export default ReviewInfo
