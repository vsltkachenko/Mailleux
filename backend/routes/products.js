import { Router } from 'express'
import { getAllProduct, getSingleProduct } from '../controllers/productController.js'

const router = new Router()


// get single product
router.get('/:id', getSingleProduct)
// get all products
router.get('/', getAllProduct)

export default router