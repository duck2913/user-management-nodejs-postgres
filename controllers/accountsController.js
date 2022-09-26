const User = require("../models/Users");

exports.getUsers = async (req, res) => {
	try {
		const page = req.query.page;
		const PAGE_SIZE = 2;
		let result;
		if (!page) {
			result = await User.getAllUsers();
		} else {
			result = await User.getUsersWithPagination(page, PAGE_SIZE);
		}
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json("Wtf! error during GET " + err);
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const username = req.params.username;
		const result = await User.getOneUser(username);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json("Wtf! error during GET " + err);
	}
};

exports.createUser = async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		await User.insertUser(username, password);
		res.status(200).json("insert successfully");
	} catch (err) {
		res.status(400).json("Fail during insert: " + err);
	}
};

exports.updateUser = async (req, res) => {
	try {
		const username = req.params.username;
		const newPassword = req.body.newPassword;
		await User.updatePassword(username, newPassword);
		res.status(200).json("update password successfully");
	} catch (err) {
		res.status(500).json(`Fail during update: ${err}`);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const username = req.params.username;
		await User.deleteUser(username);
		res.status(200).json("delete successfully");
	} catch (err) {
		res.status(400).json(`Fail during delete: ${err}`);
	}
};
