import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport(
	{
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	},
	{
		from: `Our Site <${process.env.EMAIL}>`,
	}
)

const mailer = message => {
	transporter.sendMail(message, (err, info) => {
		if (err) return console.log(err)
		// console.log('Email sent: ', info)
	})
}

export default mailer
