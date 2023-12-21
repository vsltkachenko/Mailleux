import { Router } from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = new Router()

// update User
router.put('/:id', verifyUser, updateUser)

// delete User
router.delete('/:id', verifyUser, deleteUser)

// get single User
router.get('/:id', verifyUser, getSingleUser)

// get All Users
router.get('/', verifyAdmin, getAllUser)

export default router
