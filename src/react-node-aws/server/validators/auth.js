const { check } = require("express-validator");

exports.userRegisterValidator = [
	check("name").not().isEmpty().withMessage("Name is required"),
	check("email").not().isEmpty().withMessage("Must be a email address"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

exports.userLoginValidator = [
	check("email").not().isEmpty().withMessage("Must be a email address"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
