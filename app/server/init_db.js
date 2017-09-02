var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.sqlite');

db.serialize(function () {
	db.run("DROP TABLE IF EXISTS users;");
	db.run("DROP TABLE IF EXISTS roles;");
	db.run("DROP TABLE IF EXISTS expenses;");
	db.run("DROP TABLE IF EXISTS sessions;");
	
	db.run("CREATE TABLE users (key INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, login TEXT, password TEXT, role INTEGER);");
	db.run("CREATE TABLE roles (key INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
	db.run("CREATE TABLE expenses (key INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, datetime INTEGER);");
	db.run("CREATE TABLE sessions (key INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, id TEXT, expiry_date INTEGER, created_date INTEGER DEFAULT (strftime('%s', 'now')));");
	
	db.run("INSERT INTO roles (name) VALUES ('basic_user');");
	db.run("INSERT INTO roles (name) VALUES ('manager');");
	db.run("INSERT INTO roles (name) VALUES ('admin');");
});

db.close();