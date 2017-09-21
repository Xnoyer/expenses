var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var isDev = process.argv[2] === "--dev";

var config = isDev ? require("../webpack.dev.js") : require("../webpack.release.js");
var authService = require("./auth_service.js");
var expenseService = require("./expense_service.js");
var adminService = require("./admin_service.js");

var app = express(),
	port = 8081;

var compiler = webpack(config);

compiler.run(function (err, stats)
{
	if (err)
		console.log(err);
	else
	{
		
		//GET REQUESTS
		
		app.use(express.static(__dirname + "/../client"));
		
		app.get('/', function (req, res)
		{
			res.send("");
		});
		
		//POST REQUESTS
		
		app.use(function (req, res, next)
		{
			res.set("Accept", "application/json");
			next();
		});
		app.use(bodyParser.json());
		app.use(cookieParser());
		app.post('/Service/*', function (req, res)
		{
			var path = req.path, method, callback;
			path = path.split("/");
			
			method = req.body.Method;
			callback = function (err)
			{
				if (err)
				{
					var msg = "Unable to " + method + " on " + path[2] + " service. Error: " + err.message;
					res.status(500).send({ Error: msg });
					console.log(msg);
				}
			};
			if (path[1] === "Service")
			{
				switch (path[2])
				{
					case "Auth":
						authService[method](req, res, callback);
						break;
					case "Expense":
						expenseService[method](req, res, callback);
						break;
					case "Admin":
						adminService[method](req, res, callback);
						break;
				}
			}
		});
		
		//SERVER
		
		app.listen(port, function ()
		{
			console.log('Expenses app listening on port ' + port);
		});
	}
});