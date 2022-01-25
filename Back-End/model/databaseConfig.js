//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

var mysql = require("mysql");
var data = require("./config");

var dbConnect = {
	getConnection: function () {
		var conn = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: data.password,
			database: data.database,
		});

		return conn;
	},
};
module.exports = dbConnect;