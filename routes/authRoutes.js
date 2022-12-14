const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

router.get("/", (_, res) => {
	res.json("this is auth route");
});

router.post("/register", async (req, res, next) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		await User.insertUser(username, password);
		res.json("insert successfully");
	} catch (err) {
		next(err);
	}
});

router.get("/login", async (_, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "/index.html"));
});

router.post("/login", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;

		const status = await User.checkPassword(username, password);
		const response = await User.checkRole(username);
		const { role } = response[0];
		const token = jwt.sign({ data: { username: username, role: role } }, "secret");
		res.cookie("token", token);
		res.json(status);
	} catch (err) {
		res.status(400).json("Something wrong with login ", err);
	}
});

module.exports = router;
