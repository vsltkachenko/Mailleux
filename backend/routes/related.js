import { Router } from 'express'
import { getRelatedProduct } from '../controllers/relatedProductController.js'

const router = new Router()

// get Related product
router.get('/', getRelatedProduct)

export default router
