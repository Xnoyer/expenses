var db_tools = require("./db_tools.js");

module.exports = 
{
	CheckAuth: function (body, cookies)
	{
		if(!cookies["SESSIONID"])
		{
			return {Result: "Unauthorized"};
		}
	}
};