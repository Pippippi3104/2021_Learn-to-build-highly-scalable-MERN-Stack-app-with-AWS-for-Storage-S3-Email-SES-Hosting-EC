const express = require("express");

//
const router = express.Router();

// validators
const {
	categoryCreateValidator,
	categoryUpdateValidator,
} = require("../validators/caterory");
const { runValidation } = require("../validators");

// import from controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
	create,
	list,
	read,
	update,
	remove,
} = require("../controllers/caterogy");

// routes
router.post(
	"/category",
	categoryCreateValidator,
	runValidation,
	requireSignin,
	adminMiddleware,
	create
);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put(
	"/category/:slug",
	categoryCreateValidator,
	runValidation,
	requireSignin,
	adminMiddleware,
	update
);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
