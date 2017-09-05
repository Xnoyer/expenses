var request = require("request");

var url = "http://localhost:3000/";

describe("App Service Test", function ()
{
	it("Must return index page", function (done)
	{
		request.get(url, function (err, res, body)
		{
			expect(res.statusCode).toBe(300);
			done();
		});
	});
});