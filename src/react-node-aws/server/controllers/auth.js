const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");
const expressJwt = require("express-jwt");

const User = require("../models/user");
const { registerEmailParams } = require("../helpers/email");

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
			process.env.JWT_ACCOUNT_ACTIVATION,
			{
				expiresIn: "10m",
			}
		);

		// send email (content)
		const params = registerEmailParams(email, token);

		// send email
		const sendEmailOnRegister = ses.sendEmail(params).promise();
		sendEmailOnRegister
			.then((data) => {
				console.log("email submitted to SES", data);
				// response される data に message を追加する
				res.json({
					message: `Email has been sent to ${email}, Follow the instruction to complete your registration`,
				});
			})
			.catch((error) => {
				console.log("ses email on register", error);
				// response される data に message を追加する
				res.json({
					message: `We could not verify your email. Please try again`,
				});
			});
	});
};

exports.registerActivate = (req, res) => {
	const { token } = req.body;

	// 認証
	jwt.verify(
		token,
		process.env.JWT_ACCOUNT_ACTIVATION,
		function (err, decoded) {
			if (err) {
				return res.status(401).json({
					error: "Expired link. Try again",
				});
			}

			// リンク切れしていなければ、データ取得し処理を進める
			const { name, email, password } = jwt.decode(token);
			const username = shortId.generate();

			// DB
			User.findOne({ email }).exec((err, user) => {
				if (user) {
					return res.status(401).json({
						error: "Email is taken",
					});
				}

				// register new user
				const newUser = new User({ username, name, email, password });
				newUser.save((err, result) => {
					if (err) {
						console.error(err);
						return res.status(401).json({
							error: "Error saving user in database. Try later",
						});
					}
					return res.json({
						message: "Registration success. Please login.",
					});
				});
			});
		}
	);
};

exports.login = (req, res) => {
	const { email, password } = req.body;
	// console.table({ email, password });

	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist. Please register.",
			});
		}

		// authenticate
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and password do not match",
			});
		}

		// generate token and send to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role } = user;

		return res.json({
			token,
			user: { _id, name, email, role },
		});
	});
};

exports.requireSignin = expressJwt({ secret: process.env.JWT_SECRET }); // req.user

exports.authMiddleware = (req, res, next) => {
	const authUserId = req.user._id;
	User.findOne({ _id: authUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	});
};

exports.adminMiddleware = (req, res, next) => {
	const adminUserId = req.user._id;
	User.findOne({ _id: adminUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (user.role != "admin") {
			return res.status(400).json({
				error: "Admin resource. Access denied",
			});
		}
		req.profile = user;
		next();
	});
};
