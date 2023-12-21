import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

		orderProducts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
		shippingCountry: { type: String, required: true },
		shippingPlace: { type: String, required: true },
		orderProductsCount: [{ type: Number, required: true }],
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true }
)

export default mongoose.model('Order', orderSchema)
