import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import productRoute from './routes/products.js'
import relatedRoute from './routes/related.js'
import searchRoute from './routes/search.js'
import customerRoute from './routes/customer.js'

dotenv.config()
const port = process.env.PORT || 8000
const app = express()
const corsOptions = {
	origin: true,
	credentials: true,
}

// database connection
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('MongoDB database connected')
	} catch (error) {
		console.log('MongoDB database connection failed')
	}
}

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
// app.use('/api/v1/users', userRoute)

app.use('/api/v1/products', productRoute)
app.use('/api/v1/related', relatedRoute)
app.use('/api/v1/search', searchRoute)
app.use('/api/v1/customer', customerRoute)

app.listen(port, () => {
	connect()
	console.log(`Server started on ${port} port`)
})
