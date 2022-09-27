const jwt = require("jsonwebtoken");

exports.checkTokenValidity = function (req, _, next) {
	const token = req.cookies.token;
	const decoded = jwt.verify(token, "secret");
	const {
		data: { role },
	} = decoded;
	req.role = role;
	next();
};
