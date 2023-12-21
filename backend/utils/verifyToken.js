import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
	const token = req.cookies.accessToken

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'No access token',
		})
	}

	// if token is exist then verefy the token
	jwt.verify(token, process.env.JVT_SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(401).json({
				success: false,
				message: 'Token is invalid',
			})
		}
		// console.log('user:', user)
		req.user = user
		next()
	})
}

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.role === 'admin') {
			console.log('req.user.id:', req.user.id)
			console.log('req.params.id:', req.params.id)
			next()
		} else {
			return res.status(401).json({
				success: false,
				message: 'You are not authenticated',
			})
		}
	})
}
export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.role === 'admin') {
			console.log('I am admin');
			next()
		} else {
			return res.status(401).json({
				success: false,
				message: 'You are not authorize',
			})
		}
	})
}
