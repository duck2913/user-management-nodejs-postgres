const pgp = require("pg-promise")();

const connectionConfig = {
	host: "localhost",
	port: 5433,
	user: "postgres",
	password: "admin",
	database: "postgres",
};

const db = pgp(connectionConfig);

module.exports = db;
