var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.sqlite');

db.serialize(function () {
	db.run("DROP TABLE IF EXISTS users;");
	db.run("DROP TABLE IF EXISTS roles;");
	db.run("DROP TABLE IF EXISTS expenses;");
	db.run("DROP TABLE IF EXISTS sessions;");
	
	db.run("CREATE TABLE users (key INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, login TEXT, password TEXT, role INTEGER);");
	db.run("CREATE TABLE roles (key INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
	db.run("CREATE TABLE expenses (key INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, datetime INTEGER, data TEXT);");
	db.run("CREATE TABLE sessions (key INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, id TEXT, expiry_date INTEGER, created_date INTEGER DEFAULT (strftime('%s', 'now')));");
	
	db.run("INSERT INTO roles (name) VALUES ('basic_user');");
	db.run("INSERT INTO roles (name) VALUES ('manager');");
	db.run("INSERT INTO roles (name) VALUES ('admin');");
	
	db.run("INSERT INTO users (name, login, password, role) VALUES ('User', 'user', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 1);");
	db.run("INSERT INTO users (name, login, password, role) VALUES ('Administrator', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 3);");
});

db.close();