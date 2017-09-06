var sqlite3 = require('sqlite3').verbose();

function DBTools ()
{
	this._db = null;
	
	this._openDb = function ()
	{
		this._db = new sqlite3.Database('db/database.sqlite', sqlite3.OPEN_READWRITE);
		this._db.on("error", function (err)
		{
			console.error("Error in DB", err);
		});
	};
	
	this._isOpened = function ()
	{
		return this._db && !this._db
	};
	
	this._closeDb = function ()
	{
		this._db && this._db.close(function (err)
		{
			if (err)
			{
				console.error("Error closing database", err);
				return;
			}
			this._db = null;
		}.bind(this));
	};
	
	this.loginUser = function (userKey, sessionId)
	{
		if (!this._isOpened())
			this._openDb();
		this._db.run("INSERT INTO sessions (user, id, expiry_date) VALUES (?, ?, strftime('%s', 'now', '+1 day'))", [userKey, sessionId]);
	};
	
	this.expirySession = function (sessionId)
	{
		this._db.run("UPDATE sessions SET expiry_date = strftime('%s', 'now', '-1 day') WHERE id = ?", [sessionId]);
	};
	
	this.checkAndProlongSession = function (sessionId, callback)
	{
		if (!this._isOpened())
			this._openDb();
		var self = this;
		this._db.get("SELECT user FROM sessions WHERE id = ? AND expiry_date > strftime('%s', 'now');", [sessionId], function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			if (!row)
				callback(new Error("Session not found or expired"));
			else
			{
				self._db.get("SELECT * FROM users WHERE key = ?", [row.user], function (err, row)
				{
					if (err)
					{
						console.error("Error querying database", err);
						throw new Error(err);
					}
					self._db.run("UPDATE sessions SET expiry_date = strftime('%s', 'now', '+1 day') WHERE id = ?", [sessionId]);
					callback(null, row);
				});
			}
		});
	};
	
	this.getUserByCredentials = function (login, passwordHash, callback)
	{
		if (!this._isOpened())
			this._openDb();
		this._db.get("SELECT * FROM users WHERE login = ? AND password = ?;", [login, passwordHash], function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(row);
		});
	};
	
	this.getUserBySessionId = function (sessionId, callback)
	{
		if (!this._isOpened())
			this._openDb();
		this._db.get("SELECT users.key, login, role, sessions.id FROM users, sessions WHERE sessions.user = users.key AND sessions.id = ? AND expiry_date > strftime('%s', 'now');", [sessionId], function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null, row);
		});
	};
	
	this.tryCreateUser = function (name, login, passwordHash, roleKey, callback)
	{
		if (!this._isOpened())
			this._openDb();
		var self = this;
		this._db.get("SELECT key FROM users WHERE login = ?;", [login], function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			if (row)
				callback(new Error("Login is not unique for login [" + login + "]"));
			else
			{
				self._db.run("INSERT INTO users (name, login, password, role) VALUES (?, ?, ?, ?)", [name, login, passwordHash, roleKey], function (err)
				{
					if (err)
					{
						console.error("Error querying database", err);
						throw new Error(err);
					}
					else
					{
						self._db.get("SELECT * FROM users WHERE login = ? AND password = ?;", [login, passwordHash], function (err, row)
						{
							if (err)
							{
								console.error("Error querying database", err);
								throw new Error(err);
							}
							callback(null, row);
						});
					}
				});
			}
		});
	};
	
	//--Expenses
	
	this.addExpense = function (userId, data, callback)
	{
		var date = data.Date;
		if (!this._isOpened())
			this._openDb();
		this._db.run("INSERT INTO expenses (user, datetime, data) VALUES (?, ?, ?);", [userId, date, JSON.stringify(data)], function (err)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null, this.lastID);
		});
	};
	
	this.editExpense = function (userId, data, callback)
	{
		var date = data.Date;
		if (!this._isOpened())
			this._openDb();
		var key = data.Id;
		delete data.Id;
		this._db.run("UPDATE expenses SET datetime = ?, data = ? WHERE user = ? AND key = ?", [date, JSON.stringify(data), userId, key], function (err)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null, key);
		});
	};
	
	this.removeExpense = function (userId, key, callback)
	{
		if (!this._isOpened())
			this._openDb();
		this._db.run("DELETE FROM expenses WHERE user = ? AND key = ?;", [userId, key], function (err)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null);
		});
	};
	
	this.getExpenses = function (userId, filter, callback)
	{
		if (!this._isOpened())
			this._openDb();
		var self = this;
		
		var statement;
		
		if (!filter || !filter.StartDate || !filter.EndDate)
			statement = this._db.prepare("SELECT key, datetime, data FROM expenses WHERE user = ?;", [userId]);
		else
			statement = this._db.prepare("SELECT key, datetime, data FROM expenses WHERE user = ? AND datetime >= ? AND datetime <= ?;", [userId, filter.StartDate, filter.EndDate]);
		
		statement.all(function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null, row);
		});
	};
	
	this.getUsers = function (callback)
	{
		if (!this._isOpened())
			this._openDb();
		var self = this;
		
		this._db.all("SELECT key, name, login, role FROM users;", function (err, row)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null, row);
		});
	};
	
	this.removeUser = function (key, callback)
	{
		if (!this._isOpened())
			this._openDb();
		this._db.run("DELETE FROM users WHERE key = ?;", [key], function (err)
		{
			if (err)
			{
				console.error("Error querying database", err);
				throw new Error(err);
			}
			callback(null);
		});
	};
}

module.exports = new DBTools();