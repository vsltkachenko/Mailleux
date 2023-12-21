import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
		},
		role: {
			type: String,
			default: 'user',
		},
		orderList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
		company: {
			type: String,
		},
		userLastName: {
			type: String,
		},
		birthday: {
			type: String,
		},
		phone: {
			type: String,
		},
		site: {
			type: String,
		},
		tin: {
			type: String,
		},
		street: {
			type: String,
		},
		house: {
			type: String,
		},
		postal: {
			type: String,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
	},
	{ timestamps: true }
)

export default mongoose.model("User", userSchema);
