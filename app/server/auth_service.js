var db_tools = require("./db_tools.js");
var crypto = require('crypto');
var hash;

module.exports = 
{
	_encryptPassword: function (password)
	{
		hash = crypto.createHash('sha256');
		return hash.update(password).digest('hex');
	},
	
	CheckAuth: function (req, res)
	{
		if (!req.cookies["SESSIONID"])
		{
			res.status(401);
			res.send({ Result: "Unauthorized" });
		}
		else
		{
			db_tools.checkAndProlongSession(req.cookies["SESSIONID"], function (err, row)
			{
				if (err)
				{
					res.status(401);
					res.send({ Result: "Unauthorized" });
				}
				else
				{
					var user = { Login: row.login, Name: row.name, Role: row.role, Key: row.key };
					console.log("User still logged in for login [" + row.login + "], Session ID is [" + req.cookies["SESSIONID"] + ']');
					res.cookie("SESSIONID", req.cookies["SESSIONID"], { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
					res.send(user);
				}
			});
		}
	},
	
	Auth: function (req, res)
	{
		var login = req.body.Login,
			password = req.body.Password;
		
		db_tools.getUserByCredentials(login, this._encryptPassword(password), function (row)
		{
			if (row)
			{
				var user = { Login: row.login, Name: row.name, Role: row.role, Key: row.key };
				hash = crypto.createHash('sha256');
				var sessionId = hash.update(new Date().getTime().toString()).digest("hex");
				db_tools.loginUser(user.Key, sessionId);
				console.log("User login succeeded for login [" + login + "], Session ID is [" + sessionId + ']');
				res.cookie("SESSIONID", sessionId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
				res.send(user);
			}
			else
			{
				console.warn("User not found for login [" + login + "]");
				res.status(401);
				res.send({ Result: "Unauthorized" });
			}
		})
	},
	
	Register: function (req, res)
	{
		var name = req.body.Name,
			login = req.body.Login,
			password = req.body.Password;
		
		db_tools.tryCreateUser(name, login, this._encryptPassword(password), 1 /* simple user role */, function (err, row)
		{
			if (err)
			{
				console.warn(err.message);
				res.status(401);
				res.send({ Result: "Unauthorized" });
				return;
			}
			var user = { Login: login, Name: name, Role: row.role, Key: row.key };
			hash = crypto.createHash('sha256');
			var sessionId = hash.update(new Date().getTime().toString()).digest("hex");
			db_tools.loginUser(user.Key, sessionId);
			console.log("User created successfully for login [" + login + "], Session ID is [" + sessionId + ']');
			res.cookie("SESSIONID", sessionId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			res.send(user);
		})
	},
	
	Logout: function (req, res)
	{
		if (!req.cookies["SESSIONID"])
		{
			res.send({ Result: "WasNotAuthorized" });
		}
		else
		{
			var sessionId = req.cookies["SESSIONID"];
			db_tools.expirySession(sessionId);
			res.clearCookie('SESSIONID');
			res.send({ Result: "Success" });
		}
	}
};