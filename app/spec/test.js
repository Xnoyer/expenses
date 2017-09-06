var request = require("request");

var url = "http://localhost:3000/";
var jar = request.jar();

var options = {
	uri: url + "Service/Auth",
	jar: jar,
	method: 'POST',
	json: {
		Method: "Auth",
		Login: "user",
		Password: "1"
	}
};

request(options, function (err, res, body)
{
	debugger;
	var sid = res.headers["set-cookie"][0];
	jar.setCookie("SESSIONID=" + sid);
}.bind(this));
