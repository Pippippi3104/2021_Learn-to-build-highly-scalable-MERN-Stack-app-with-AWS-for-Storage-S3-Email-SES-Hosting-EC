const express = require("express");
const router = express.Router();

// import validators
const {
	userRegisterValidator,
	userLoginValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

// import from controllers
const { register, registerActivate, login } = require("../controllers/auth");

// middleware (clientからデータを受け取り、controllerへ渡す)
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;
