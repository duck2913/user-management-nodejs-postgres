const db = require("./database");

class User {
	static getAllUsers() {
		return db.any("select * from users");
	}

	static getOneUser(username) {
		return db.oneOrNone("select * from users where username = $1", username);
	}

	static async insertUser(username, password) {
		const userExists = await this.findUser(username);

		if (!userExists) {
			return db.none("insert into users(username, password) values($1, $2)", [
				username,
				password,
			]);
		} else {
			throw new Error("Username already exist!");
		}
	}
	static deleteAllRows() {
		return db.any("truncate table");
	}

	static async findUser(username) {
		const result = await db.oneOrNone(
			"select username from users where username = $1",
			username,
		);

		console.log("🚀 -> file: Users.js -> line 29 -> result", result);

		return result;
	}

	static async checkPassword(username, password) {
		const isUserExist = await this.findUser(username);
		if (!isUserExist) {
			console.log("User.js:37 -> user doesnt exist");
			throw new Error("this user doesn't exist");
		}
		const { password: storedPassword } = await db.oneOrNone(
			"select password from users where username = $1",
			username,
		);
		if (storedPassword == password) return Promise.resolve("login successfully");
		else throw new Error("wrong password");
	}

	static updatePassword(username, newPassword) {
		return db.none("update users set password = $1 where username = $2", [
			newPassword,
			username,
		]);
	}

	static deleteUser(username) {
		return db.none("delete from users where username = $1", username);
	}
}

module.exports = User;
