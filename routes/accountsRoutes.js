const express = require("express");
const router = express.Router();

const User = require("../models/Users");

router.get("/", async (_, res) => {
	try {
		const result = await User.getUsers();
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json("Wtf! Error " + err);
	}
});

router.post("/", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		await User.insertUser(username, password);
		res.status(200).json("insert successfully");
	} catch (err) {
		res.status(400).json("Fail during insert: " + err);
	}
});

router.put("/:username", async (req, res) => {
	try {
		const username = req.params.username;
		const newPassword = req.body.newPassword;
		await User.updatePassword(username, newPassword);
		res.status(200).json("update password successfully");
	} catch (err) {
		res.status(500).json(`Fail during update: ${err}`);
	}
});

router.delete("/:username", async (req, res) => {
	try {
		const username = req.params.username;
		await User.deleteUser(username);
		res.status(200).json("delete successfully");
	} catch (err) {
		res.status(400).json(`Fail during delete: ${err}`);
	}
});

module.exports = router;
