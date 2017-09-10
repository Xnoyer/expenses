var db_tools = require("./db_tools.js");

module.exports =
	{
		_checkUserLoggedInAndAdmin: function (req, res, callback)
		{
			if (!req.cookies["SESSIONID"])
				res.status(401).send({ Error: "Unauthorized" });
			else
			{
				db_tools.getUserBySessionId(req.cookies["SESSIONID"], function (err, row)
				{
					if (err || !row || !row.key)
					{
						if (err)
							callback(err);
						else
							res.status(401).send({ Error: "Unauthorized" });
						return;
					}
					if (row.role < 3)
					{
						res.status(403).send({ Error: "Access Denied" });
						return;
					}
					callback(null, row);
				});
			}
		},
		
		GetUsers: function (req, res, callback)
		{
			this._checkUserLoggedInAndAdmin(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					db_tools.getUsers(function (err, rows)
					{
						if (err)
							callback(err);
						else
						{
							var ret = [], user;
							for (var i = 0; i < rows.length; i++)
							{
								user = {
									Key: rows[i].key,
									Name: rows[i].name,
									Login: rows[i].login,
									Role: rows[i].role
								};
								ret.push(user);
							}
							res.send({ Result: ret });
						}
					});
				}
			});
		},
		
		RemoveUser: function (req, res, callback)
		{
			this._checkUserLoggedInAndAdmin(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					db_tools.removeUser(req.body.Data.Key, function (err)
					{
						if (err)
							callback(err);
						else
							res.send({ Result: { Key: req.body.Data.Key } });
					});
				}
			});
		}
	};