const modifyOrderList = list =>
	list
		.map(order => {
			const orderProducts = order.orderProducts
			const orderProductsCount = order.orderProductsCount
			return {
				...order,
				orderProducts: orderProducts.map((item, index) => ({
					...item,
					count: orderProductsCount[index],
				})),
			}
		})
		.reverse()

export default modifyOrderList
