var request = require("request");

var url = "http://localhost:3000/";

var options = {
	uri: url + "Service/Auth",
	method: 'POST',
	json: {
		Method: "Auth",
		Login: "illegal",
		Password: "nopassword"
	}
};

request(options, function (err, res, body)
{
	debugger;
});