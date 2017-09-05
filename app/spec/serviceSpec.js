var request = require("request");
var fs = require("fs");

var url = "http://localhost:3000/";

describe("App Service Test", function ()
{
	it("Must return index page", function (done)
	{
		var indexHtml = fs.readFileSync("./client/index.html", 'utf8');
		request.get(url, function (err, res, body)
		{
			expect(res.statusCode).toBe(200);
			expect(res.body).toBe(indexHtml);
			done();
		});
	});
	
	it("Test auth service", function (done)
	{
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
			expect(res.statusCode).toBe(401);
			expect(body.Result).toBe("Unauthorized");
			done();
		});
	});
});