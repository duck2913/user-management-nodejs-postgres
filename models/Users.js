const db = require("../utils/database");

class User {
	static getAllUsers() {
		return db.any("select * from users");
	}

	static getUsersWithPagination(page, PAGE_SIZE) {
		return db.any("select * from users offset $1 limit $2", [
			(page - 1) * PAGE_SIZE,
			PAGE_SIZE,
		]);
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
		return db.any("truncate table users");
	}

	static async findUser(username) {
		const result = await db.oneOrNone("select * from users where username = $1", username);
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

	static checkRole(username) {
		return db.any("select role from users where username = $1", username);
	}
}

module.exports = User;
