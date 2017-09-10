var db_tools = require("./db_tools.js");

module.exports =
	{
		_checkUserLoggedIn: function (req, res, callback)
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
					callback(null, row);
				});
			}
		},
		
		Add: function (req, res, callback)
		{
			this._checkUserLoggedIn(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					var data = req.body.Data;
					db_tools.addExpense(row.key, data, function (err, key)
					{
						if (err)
							callback(err);
						else
							res.send({ Result: { Id: key } });
					});
				}
			});
		},
		
		Edit: function (req, res, callback)
		{
			this._checkUserLoggedIn(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					var data = req.body.Data;
					db_tools.editExpense(row.key, data, function (err, key)
					{
						if (err)
							callback(err);
						else
							res.send({ Result: { Id: key } });
					});
				}
			});
		},
		
		Get: function (req, res, callback)
		{
			this._checkUserLoggedIn(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					var filter = req.body.Data;
					db_tools.getExpenses(row.key, filter, function (err, rows)
					{
						if (err)
							callback(err);
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
							res.send({ Result: ret });
						}
					});
				}
			});
		},
		
		Remove: function (req, res, callback)
		{
			this._checkUserLoggedIn(req, res, function (err, row)
			{
				if (err)
					callback(err);
				else
				{
					var id = req.body.Data.Id;
					db_tools.removeExpense(row.key, id, function (err)
					{
						if (err)
							callback(err);
						else
							res.send({ Result: { Id: id } });
					});
				}
			});
		}
	};