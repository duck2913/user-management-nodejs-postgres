const jwt = require("jsonwebtoken");

exports.checkTokenValidity = function (req, _, next) {
	const token = req.cookies.token;
	jwt.verify(token, "SuperSecretPassword@1010");
	next();
};
