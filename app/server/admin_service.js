var db_tools = require("./db_tools.js");

module.exports =
	{
		GetUsers: function (req, res)
		{
			if (!req.cookies["SESSIONID"])
			{
				res.status(401).send({ Result: "Unauthorized" });
			}
			else
			{
				db_tools.getUserBySessionId(req.cookies["SESSIONID"], function (err, row)
				{
					if (err || !row)
					{
						if (err)
							console.warn(err.message);
						res.status(401).send({ Result: "Unauthorized" });
						return;
					}
					if (row.role < 3)
					{
						res.status(403).send({ Result: "Access Denied" });
						return;
					}
					db_tools.getUsers(function (err, rows)
					{
						if (err)
						{
							res.status(500).send({ Error: "Unable to get users" });
						}
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
							res.send(ret);
						}
					})
				});
			}
		},
		
		RemoveUser: function (req, res)
		{
			if (!req.cookies["SESSIONID"])
			{
				res.status(401).res.send({ Result: "Unauthorized" });
			}
			else
			{
				db_tools.getUserBySessionId(req.cookies["SESSIONID"], function (err, row)
				{
					if (err || !row)
					{
						if (err)
							console.warn(err.message);
						res.status(401).res.send({ Result: "Unauthorized" });
						return;
					}
					if (row.role < 3)
					{
						res.status(403).send({ Result: "Access Denied" });
						return;
					}
					db_tools.removeUser(req.body.Key, function (err)
					{
						if (err)
						{
							res.status(500).send({ Error: "Unable to remove user" });
						}
						else
						{
							res.send({ Id: req.body.Id });
						}
					})
				});
			}
		}
	};