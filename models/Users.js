const db = require("./database");

class User {
	static getUsers() {
		return db.any("select * from users");
	}

	static async insertUser(username, password) {
		const existingUsername = this.findUser(username);
		if (!existingUsername) {
			return db.none("insert into users(username, password) values($1, $2)", [
				username,
				password,
			]);
		} else {
			return Promise.reject("Username already exists");
		}
	}
	static deleteAllRows() {
		return db.any("truncate table");
	}

	static async findUser(username) {
		const existingUsername = await db.any(
			"select username from users where username = $1",
			username,
		);
		return existingUsername;
	}

	static async checkPassword(username, password) {
		const existingUsername = this.findUser(username);
		if (!existingUsername) {
			return Promise.reject("this user doesn't exist");
		}
		const { password: storedPassword } = await db.oneOrNone(
			"select password from users where username = $1",
			username,
		);
		console.log("🚀 -> storedPassword", storedPassword);
		console.log("🚀 -> password", password);
		if (storedPassword == password) return Promise.resolve("login successfully");
		else return Promise.reject("wrong password");
	}
}

module.exports = User;
