const Database = require("@replit/database");
const db = new Database()

exports.databaseSet = function databaseSet(key, value) {
	db.set(key, value).then(() => {
		db.get(key).then(value => {
			console.log(value);
		});
	});
};


