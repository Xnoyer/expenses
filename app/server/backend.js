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
	var path = req.path, method;
	path = path.split("/");
	if(path[1] === "Service")
	{
		switch (path[2])
		{
			case "Auth":
				method = req.body.Method;
				authService[method](req, res);
				break;
			case "Expense":
				method = req.body.Method;
				expenseService[method](req, res);
				break;
			case "Admin":
				method = req.body.Method;
				adminService[method](req, res);
				break;
		}
	}
});

//SERVER

app.listen(port, function ()
{
	console.log('Example app listening on port 3000!');
});

app.listen(8080, "192.168.0.126", function ()
{
	console.log('Example app listening on port 8080!');
});