const express = require("express");
const router = express.Router();

// import validators
const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

// import from controllers
const { register, registerActivate } = require("../controllers/auth");

// middleware (clientからデータを受け取り、controllerへ渡す)
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);

module.exports = router;
