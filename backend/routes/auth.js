import { Router } from 'express'
import { getMe, login, register, logout } from '../controllers/authController.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = new Router()

//Register
// http://localhost:4000/api/v1/auth/register
router.post('/register', register)

//Login
// http://localhost:4000/api/v1/auth/login
router.post('/login', login)

//Get Me
// http://localhost:4000/api/v1/auth/me
router.get('/me', verifyToken, getMe)

//Logout
// http://localhost:4000/api/v1/auth/logout
router.post('/logout', verifyToken, logout)

export default router
