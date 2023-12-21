import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		categoryId: {
			type: Number,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		tax: {
			type: Number,
		},
		description: {
			type: String,
			required: true,
		},
		availability: {
			type: String,
			required: true,
		},
		delivery: {
			type: String,
			required: true,
		},
		dimensions: {
			type: String,
		},
		characteristics: {
			type: String,
			required: true,
		},
		oldPrice: {
			type: Number,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Product', productSchema)
