var db_tools = require("./db_tools.js");

module.exports = 
{
	CheckAuth: function (body, cookies)
	{
		if(!cookies["SESSIONID"])
		{
			return {Result: "Unauthorized"};
		}
	},
	
	Auth: function (body, cookies)
	{
		throw new Error("Incorrect Credentials");
	}
};