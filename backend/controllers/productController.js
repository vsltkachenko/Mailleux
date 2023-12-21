import Product from '../models/Product.js'

// getSingle product
export const getSingleProduct = async (req, res) => {
	try {
		const id = req.params.id
		const singleProduct = await Product.find({ id })

		res.status(200).json({
			success: true,
			message: 'Successfully founded',
			data: singleProduct[0],
		})
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}
// getAll product
export const getAllProduct = async (req, res) => {
	const {
		activeCategoryId: categoryId,
		currentPage,
		quantityPerPage,
		sortType,
		searchValue = '',
		stock,
		square,
		round,
		ovale,
		tree,
		rect,
		fixed,
		long,
	} = req.query

	let sortTypeObj = {}
	switch (sortType) {
		case 'relevance':
			sortTypeObj = {}
			break
		case 'new':
			sortTypeObj = { new: 1 }
			break
		case 'az':
			sortTypeObj = { title: 1 }
			break
		case 'za':
			sortTypeObj = { title: -1 }
			break
		case 'desc':
			sortTypeObj = { price: -1 }
			break
		case 'asc':
			sortTypeObj = { price: 1 }
			break
		// default:
		// 	sortTypeObj = {}
	}

	const checkboxes = { stock, square, round, ovale, tree, rect, fixed, long }

	const checkboxesChecked = []
	for (let key in checkboxes) {
		const obj = {}
		if (checkboxes[key] === 'true') {
			obj[key] = true
			checkboxesChecked.push(obj)
		}
	}
	// console.log('checkboxesChecked: ', checkboxesChecked)

	function getParams() {
		const regex = {
			$or: [
				{ title: { $regex: searchValue.toLowerCase() } },
				{
					title: {
						$regex: searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase(),
					},
				},
			],
		}
		if (checkboxesChecked.length) {
			if (searchValue) {
				checkboxesChecked.push(regex)
				return { $and: checkboxesChecked }
			}
			return { $and: checkboxesChecked }
		} else {
			if (searchValue) {
				return { id: { $exists: true }, ...regex }
			}
			return { id: { $exists: true } }
		}
	}

	const findParams = getParams()

	try {
		let products, productsCount, pageCount

		if (categoryId === 'all') {
			// productsCount = await Product.estimatedDocumentCount()
			if (quantityPerPage === 'all') {
				products = await Product.find(findParams).sort(sortTypeObj)
				productsCount = products.length
				pageCount = 0
			} else {
				products = await Product.find(findParams)
				productsCount = products.length
				products = await Product.find(findParams)
					.skip(currentPage * quantityPerPage)
					.limit(quantityPerPage)
					.sort(sortTypeObj)
				pageCount =
					productsCount <= Number(quantityPerPage) ? 0 : Math.ceil(productsCount / quantityPerPage)
			}
		} else {
			products = await Product.find({ categoryId, ...findParams })
			productsCount = products.length
			pageCount = 0
			if (quantityPerPage !== 'all') {
				products = await Product.find({ categoryId, ...findParams })
					.skip(currentPage * quantityPerPage)
					.limit(quantityPerPage)
					.sort(sortTypeObj)
				pageCount =
					productsCount <= Number(quantityPerPage) ? 0 : Math.ceil(productsCount / quantityPerPage)
			}
		}

		res.status(200).json({
			success: true,
			message: 'Successful',
			productsPerPage: products.length,
			data: products,
			productsCount,
			pageCount,
		})
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}
