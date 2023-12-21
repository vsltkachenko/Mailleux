import User from '../models/User.js'

// create User
export const createUser = async (req, res) => {
	try {
		const newUser = new User(req.body)
		const savedUser = await newUser.save()

		res.status(200).json({ success: true, message: 'Successfully created', data: savedUser })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to create. Try again' })
	}
}
// update User
export const updateUser = async (req, res) => {
	try {
		const id = req.params.id

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
// delete User
export const deleteUser = async (req, res) => {
	try {
		const id = req.params.id

		await User.findByIdAndDelete(id)

		res.status(200).json({ success: true, message: 'Successfully deleted' })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to delete' })
	}
}
// getSingle User
export const getSingleUser = async (req, res) => {
	try {
		const id = req.params.id
		const singleUser = await User.findById(id)

		res.status(200).json({ success: true, message: 'Successfully found', ...singleUser._doc })
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}

// getAll User
export const getAllUser = async (req, res) => {
	
	try {	
		const users = await User.find()
			

		res.status(200).json({ success: true, message: 'Successful', users: users })
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}
