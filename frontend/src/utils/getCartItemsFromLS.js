import calcTotalCount from './calcTotalCount'
import calcTotalPrice from './calcTotalPrice'

export const getCartItemsFromLocalStorage = () => {
	const data = localStorage.getItem('cartItems')

	if (data && data.length) {
		const items = JSON.parse(data)
		const totalPrice = calcTotalPrice(items)
		const totalCount = calcTotalCount(items)
		return {
			items,
			totalCount,
			totalPrice,
		}
	} else
		return {
			items: [],
			totalCount: 0,
			totalPrice: 0,
		}
}
