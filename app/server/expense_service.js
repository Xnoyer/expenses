var db_tools = require("./db_tools.js");

module.exports =
	{
		Add: function (req, res)
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
					var data = req.body;
					db_tools.addExpense(row.key, data, function (err, key)
					{
						if (err)
						{
							res.status(500).send({ Error: "Unable to add expense" });
						}
						else
						{
							res.send({ Id: key });
						}
					})
				});
			}
		},
		
		Get: function (req, res)
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
					db_tools.getExpenses(row.key, function (err, rows)
					{
						if (err)
						{
							res.status(500).send({ Error: "Unable to get expenses" });
						}
						else
						{
							var ret = [], data;
							if (!rows)
							{
								res.send(ret);
								return;
							}
							for (var i = 0; i < rows.length; i++)
							{
								data = JSON.parse(rows[i].data);
								data.Id = rows[i].key;
								ret.push(data);
							}
							res.send(ret);
						}
					})
				});
			}
		},
		
		Remove: function (req, res)
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
					db_tools.removeExpense(row.key, req.body.Id, function (err)
					{
						if (err)
						{
							res.status(500).send({ Error: "Unable to remove expense" });
						}
						else
						{
							res.send({ Id: req.body.Id });
						}
					})
				});
			}
		},
	};