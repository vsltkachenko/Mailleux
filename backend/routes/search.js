import { Router } from 'express'
import { getSuggestionsProduct } from '../controllers/searchProductController.js'

const router = new Router()

// search routes

router.get('/suggestions', getSuggestionsProduct)

export default router
