const db = require("./database");

const query = async function () {
	const result = await db.any("select * from users");
	console.table(result);
};

query();
