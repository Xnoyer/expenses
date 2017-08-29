var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require("../webpack.config");

var app = express(),
	port = 3000;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


app.use(express.static(__dirname + "/../client"));

app.get('/', function (req, res) {
	res.send("");
});

app.post('/Service/', function (req, res) {
	console.log(req);
});

app.listen(port, function () {
	console.log('Example app listening on port 3000!');
});