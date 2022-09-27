const db = require("../utils/database");

exports.viewUsers = async (req, res, next) => {
	const role = +req.role;
	const result = await db.any("select * from users where role <= $1", role);
	res.json(result);
};
