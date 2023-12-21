import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mailer from '../nodemailer/nodemailer.js'

//user registration
export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const isUsed = await User.findOne({ email })
		if (isUsed) {
			return res.json({
				success: false,
				message: 'This email is already taken',
			})
		}
		//hashing password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const newUser = new User({
			username,
			email,
			password: hash,
			// photo: req.body.photo,
		})
		const token = jwt.sign(
			{
				id: newUser._id,
				role: newUser.role,
			},
			process.env.JVT_SECRET_KEY,
			{ expiresIn: '30d' }
		)

		await newUser.save()

		const user = await User.findOne({ email })
		const { password: passHash, ...rest } = user._doc

		// Sending email
		const message = {
			to: email,
			subject: 'Congratulations! You are successfully registred on our site',
			html: `
        <h2>Congratulations, you have successfully registered on our website!</h2>
        
        <i>your account information:</i>
        <ul>
            <li>login: ${email}</li>
            <li>password: ${password}</li>
        </ul>       
        <p>This letter does not require a reply.<p>`,
		}
		mailer(message)
		// res.redirect('/registration')

		res
			.cookie('accessToken', token, {
				httpOnly: true,
				expires: token.expiresIn,
				// expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
				sameSite: 'none',
				secure: true,
			})
			.status(200)
			.json({ success: true, message: 'Account successfully created', token, user: { ...rest } })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to create' })
	}
}

//user login
export const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).populate({
			path: 'orderList',
			populate: {
				path: 'orderProducts',
			},
		})

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)
		if (!checkCorrectPassword) {
			return res.status(401).json({
				success: false,
				message: 'Incorrect email or password',
			})
		}

		// create jwt token
		const token = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.JVT_SECRET_KEY,
			{ expiresIn: '30d' }
		)

		const { password, ...rest } = user._doc

		//set token in the browser cookies and send response to the client
		res
			.cookie('accessToken', token, {
				httpOnly: true,
				expires: token.expiresIn,
				sameSite: 'none',
				secure: true,
			})
			.status(200)
			.json({ success: true, message: 'Successfully login', token, user: { ...rest } })
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to login',
		})
	}
}

// getMe
export const getMe = async (req, res) => {
	try {
		const id = req.user.id
		const meUser = await User.findById(id).populate({
			path: 'orderList',
			populate: {
				path: 'orderProducts',
			},
		})

		const { password, ...rest } = meUser._doc

		res.status(200).json({ success: true, message: 'Successfully authorized', user: { ...rest } })
	} catch (error) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
}

// logout 
export const logout = async (req, res) => {
	try {	
		res
			.clearCookie('accessToken', {
				path: '/',
				sameSite: 'none',
				secure: true,
			})
			.status(200)
			.json({ success: true, message: 'You have successfully logged out' })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to logout' })
	}
}
