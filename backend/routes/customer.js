import { Router } from 'express'
import { createOrder, deleteCustomer, updatePassword, updateProfile } from '../controllers/customerController.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = new Router()

// Order route
router.post('/order', verifyToken, createOrder)

// update Password route
router.post('/changepass', verifyToken, updatePassword)

// update Profile route
router.put('/', verifyToken, updateProfile)

// update Profile route
router.delete('/', verifyToken, deleteCustomer)

export default router
