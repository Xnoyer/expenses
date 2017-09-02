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
}

module.exports = new DBTools();