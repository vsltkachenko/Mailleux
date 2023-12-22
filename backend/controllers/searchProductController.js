import Product from '../models/Product.js'

//searchProductController

// getSuggestionsProduct
export const getSuggestionsProduct = async (req, res) => {
	const { searchValue, productsCount } = req.query

	try {
		let products = []
		if (searchValue) {
			const regex = { title: { $regex: searchValue, $options: 'i' } }
			products = await Product.find(regex)
			if (products.length > productsCount) {
				products = products.slice(0, productsCount)
			}
		}

		res.status(200).json({
			success: true,
			message: 'Successful',
			data: products,
		})
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}
