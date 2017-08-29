var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.sqlite');

db.serialize(function () {

	db.run('CREATE TABLE users (key INTEGER, name TEXT, login TEXT, password TEXT, role INTEGER)');
	db.run('CREATE TABLE roles (key INTEGER, name TEXT)');
	db.run('CREATE TABLE expenses (key INTEGER, user INTEGER, datetime INTEGER)');
	db.run('CREATE TABLE sessions (key INTEGER, user INTEGER, id TEXT)');
});

db.close();