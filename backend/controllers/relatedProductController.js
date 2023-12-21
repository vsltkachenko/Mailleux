import Product from '../models/Product.js'

// get Related product
export const getRelatedProduct = async (req, res) => {
	const { categoryId, productsCount } = req.query

	const shuffle = arr => [...arr].sort(() => 0.5 - Math.random())

	try {
		let products
		if (categoryId === 'all') {
			products = await Product.find()
			if (products.length > productsCount) {
				products = shuffle([...products]).slice(0, productsCount)
			}
		} else {
			products = await Product.find({ categoryId })
			if (products.length > productsCount) {
				products = shuffle([...products]).slice(0, productsCount)
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
