const AWS = require("aws-sdk");

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

	// 内容
	const { name, email, password } = req.body;
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
					Data: `<html><body><h1>Hello ${name}</h1 style="color:red;"><p>Test email</p></body></html>`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: "Complete your registration",
			},
		},
	};

	// 送信
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
};
