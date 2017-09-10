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
				Data: {
					Login: "illegal",
					Password: "nopassword"
				}
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(401);
			expect(body.Error).toBeDefined();
			expect(body.Error).toBe("Unauthorized");
			
			options.json = {
				Method: "Auth",
				Data: {
					Login: "user",
					Password: "1"
				}
			};
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(res.headers['set-cookie']).toBeDefined();
				var sid = res.headers['set-cookie'][0];
				expect(sid).toBeDefined();
				expect(body.Result).toBeDefined();
				expect(body.Result.Login).toBe("user");
				
				options.json = {
					Method: "CheckAuth"
				};
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Result).toBeDefined();
					expect(body.Result.Login).toBe("user");
					
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
							expect(res.statusCode).toBe(403);
							expect(body.Error).toBeDefined();
							expect(body.Error).toBe("WasNotAuthorized");
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
				Data: {
					Name: "Temp User",
					Login: "tmpuser",
					Password: "tmp"
				}
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(res.headers['set-cookie']).toBeDefined();
			expect(body.Result).toBeDefined();
			expect(body.Result.Login).toBe("tmpuser");
			tempUser = body.Result;
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
				Data: {
					Description: "Description",
					Comment: "Comment",
					Value: 100500,
					Date: Math.floor(Date.now() / 1000)
				}
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body.Result).toBeDefined();
			expect(body.Result.Id).toBeDefined();
			expect(body.Result.Id).toBeGreaterThan(0);
			
			options.json = {
				Method: "Get"
			};
			var addedId = body.Result.Id;
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.Result.length).toBeDefined();
				expect(body.Result.length).toBeGreaterThan(0);
				
				options.json = {
					Method: "Remove",
					Data: {
						Id: addedId
					}
				};
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Result).toBeDefined();
					expect(body.Result.Id).toBeDefined();
					expect(body.Result.Id).toBe(addedId);
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
				Data: {
					Login: "admin",
					Password: "admin"
				}
			}
		};
		
		options.jar = cookieJar;
		
		request(options, function (err, res, body)
		{
			expect(err).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body.Result).toBeDefined();
			expect(body.Result.Login).toBe("admin");
			expect(body.Result.Role).toBe(3);
			
			options.uri = url + "Service/Admin";
			options.json = {
				Method: "GetUsers"
			};
			
			request(options, function (err, res, body)
			{
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.Result).toBeDefined();
				expect(body.Result.length).toBeGreaterThan(2); //user, admin & temp
				
				options.json = {
					Method: "RemoveUser",
					Data: {
						Key: tempUser.Key
					}
				};
				
				request(options, function (err, res, body)
				{
					expect(err).toBeNull();
					expect(res.statusCode).toBe(200);
					expect(body.Result).toBeDefined();
					expect(body.Result.Key).toBeDefined();
					expect(body.Result.Key).toBe(tempUser.Key);
					done();
				});
			});
		});
	});
});