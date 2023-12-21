import Order from '../models/Order.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

// create Order
export const createOrder = async (req, res) => {
	try {
		const { items, shippingCountry, shippingPlace, totalPrice } = req.body

		const id = req.user.id
		const orderProductsCount = items.map(item => item.count)

		const newOrder = new Order({
			user: id,
			orderProducts: items,
			shippingCountry,
			shippingPlace,
			orderProductsCount,
			totalPrice,
		})
		await newOrder.save()

		await User.findByIdAndUpdate(id, {
			$push: { orderList: newOrder },
		})

		res.status(200).json({
			success: true,
			message: 'Congratulations on your purchase!',
			order: newOrder,
		})
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not create order' })
	}
}

// update Password
export const updatePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body

		const id = req.user.id
		const meUser = await User.findById(id)

		if (!meUser) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		const checkCorrectPassword = await bcrypt.compare(oldPassword, meUser.password)
		if (!checkCorrectPassword) {
			return res.status(200).json({
				success: false,
				message: 'Incorrect old password',
			})
		}

		//hashing password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(newPassword, salt)

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: { password: hash },
			},
			{ new: true }
		)

		res
			.status(200)
			.json({ success: true, message: 'Password successfully updated', data: updatedUser })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to update password' })
	}
}

// update Profile
export const updateProfile = async (req, res) => {
	try {
		const id = req.user.id

		const updatedUser = await User.findByIdAndUpdate(
			id,
			//req.body, // можна ще й так
			{
				$set: req.body,
			},
			{ new: true }
		)

		res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to update' })
	}
}

// delete Customer
export const deleteCustomer = async (req, res) => {
	try {
		const id = req.user.id

		await User.findByIdAndDelete(id)
		res
			.clearCookie('accessToken',  {
				path: '/',
				sameSite: 'none',
				secure: true,
			})			
			.status(200)
			.json({ success: true, message: 'Account successfully deleted' })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to delete' })
	}
}
