const AWS = require("aws-sdk");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/// AWS setting
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

// SES
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// controller
exports.register = (req, res) => {
	// clientから受け取ったデータがroute経由で受け取れる
	// console.log("REGISTER CONTROLLER", req.body);
	const { name, email, password } = req.body;

	// check if user exists in our DB
	User.findOne({ email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken",
			});
		}
		// generate token with user name email and password
		const token = jwt.sign(
			{ name, email, password },
			process.env.JWT_ACCOUNT_ACTIVATE,
			{
				expiresIn: "10m",
			}
		);

		// send email (content)
		const params = {
			Source: process.env.EMAIL_FROM,
			Destination: {
				ToAddresses: [email],
			},
			ReplyToAddresses: [process.env.EMAIL_TO],
			Message: {
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: `
							<html>
								<h1>Verify your email address</h1>
								<p>Please use the following link to complete your registration:</p>
								<p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
							</html>`,
					},
				},
				Subject: {
					Charset: "UTF-8",
					Data: "Complete your registration",
				},
			},
		};

		// send email
		const sendEmailOnRegister = ses.sendEmail(params).promise();
		sendEmailOnRegister
			.then((data) => {
				console.log("email submitted to SES", data);
				res.send("Email sent");
			})
			.catch((error) => {
				console.log("ses email on register", error);
				res.send("email failed");
			});
	});
};
