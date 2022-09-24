const express = require("express");
const router = express.Router();

const db = require("../models/database");
const User = require("../models/Users");

router.get("/", (_, res) => {
	res.json("this is auth route");
});

router.get("/register", async (_, res) => {
	try {
		const result = await User.getUsers();
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const result = await User.insertUser(username, password);
		res.json("insert successfully");
	} catch (err) {
		next(err);
	}
});

router.get("/login", async (req, res, next) => {
	res.json("this is login page");
});

router.post("/login", async (req, res, next) => {
	try {
		const username = req.body.username;
		const password = req.body.password;

		const status = await User.checkPassword(username, password);
		res.json(status);
	} catch (err) {
		res.status(400).json("Wrong password");
	}
});

module.exports = router;
