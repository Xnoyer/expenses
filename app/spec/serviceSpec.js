var request = require("request");
var fs = require("fs");

var url = "http://localhost:3000/";
var cookieJar = request.jar();

describe("App Service Test", function ()
{
	it("Must return index page", function (done)
	{
		var indexHtml = fs.readFileSync("./client/index.html", 'utf8');
		request.get(url, function (err, res, body)
		{
			expect(err).toBeNull();
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
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(401);
			expect(body.Result).toBeDefined();
			expect(body.Result).toBe("Unauthorized");
			
			options.json = {
				Method: "Auth",
				Login: "user",
				Password: "1"
			};
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(res.headers['set-cookie']).toBeDefined();
				var sid = res.headers['set-cookie'][0];
				expect(sid).toBeDefined();
				expect(body.Login).toBe("user");
				
				options.json = {
					Method: "CheckAuth"
				};
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Login).toBe("user");
					
					options.json = {
						Method: "Logout"
					};
					request(options, function (err, res, body)
					{
						expect(err).toBeNull();
						expect(res.statusCode).toBe(200);
						expect(body.Result).toBeDefined();
						expect(body.Result).toBe("Success");
						
						request(options, function (err, res, body)
						{
							expect(err).toBeNull();
							expect(res.statusCode).toBe(200);
							expect(body.Result).toBeDefined();
							expect(body.Result).toBe("WasNotAuthorized");
							done();
						});
					});
				});
			});
		});
	});
	
	var tempUser;
	
	it("Test registration service", function (done)
	{
		var options = {
			uri: url + "Service/Auth",
			method: 'POST',
			json: {
				Method: "Register",
				Name: "Temp User",
				Login: "tmpuser",
				Password: "tmp"
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(res.headers['set-cookie']).toBeDefined();
			expect(body.Login).toBe("tmpuser");
			tempUser = body;
			done();
		});
	});
	
	it("Test expense service", function (done)
	{
		var options = {
			uri: url + "Service/Expense",
			method: 'POST',
			json: {
				Method: "Add",
				Description: "Description",
				Comment: "Comment",
				Value: 100500,
				Date: Math.floor(Date.now() / 1000)
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body.Id).toBeDefined();
			expect(body.Id).toBeGreaterThan(0);
			
			options.json = {
				Method: "Get"
			};
			var addedId = body.Id;
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.length).toBeDefined();
				expect(body.length).toBeGreaterThan(0);
				
				options.json = {
					Method: "Remove",
					Id: addedId
				};
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Id).toBeDefined();
					expect(body.Id).toBe(addedId);
					done();
				});
			});
		});
	});
	
	it("Test admin service", function (done)
	{
		var options = {
			uri: url + "Service/Auth",
			method: 'POST',
			json: {
				Method: "Auth",
				Login: "admin",
				Password: "admin"
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body.Login).toBe("admin");
			expect(body.Role).toBe(3);
			
			options.uri = url + "Service/Admin";
			options.json = {
				Method: "GetUsers"
			};
			
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.length).toBeDefined();
				expect(body.length).toBeGreaterThan(2); //user, admin & temp
				
				options.json = {
					Method: "RemoveUser",
					Key: tempUser.Key
				};
				
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Key).toBeDefined();
					expect(body.Key).toBe(tempUser.Key);
					done();
				});
			});
		});
	});
});