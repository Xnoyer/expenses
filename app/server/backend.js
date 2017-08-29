var express = require('express');
var sqlite = require('sqlite3');
var app = express();

app.use(function (req, res, next) {
	res.header("X-Header", "Bla");
	console.log("request");
	next();
});
app.use(express.static(__dirname + "/../client"));

app.get('/', function (req, res) {
	res.send("");
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});