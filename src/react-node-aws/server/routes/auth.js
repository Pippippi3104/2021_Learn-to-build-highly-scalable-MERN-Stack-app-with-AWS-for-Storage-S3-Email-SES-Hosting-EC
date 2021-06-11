const express = require("express");
const router = express.Router();

// import from controllers
const { register } = require("../controllers/auth");

// middleware (clientからデータを受け取り、controllerへ渡す)
router.post("/register", register);

module.exports = router;
