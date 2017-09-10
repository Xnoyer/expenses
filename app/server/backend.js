var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require("../webpack.config");
var authService = require("./auth_service.js");
var expenseService = require("./expense_service.js");
var adminService = require("./admin_service.js");

var app = express(),
	port = 3000;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//GET REQUESTS

app.use(express.static(__dirname + "/../client"));

app.get('/', function (req, res) {
	res.send("");
});

//POST REQUESTS

app.use(function (req, res, next) {
	res.set("Accept", "application/json");
	next();
});
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/Service/*', function (req, res) {
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
	console.log('Example app listening on port 3000!');
});