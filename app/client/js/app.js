var service = require('./service.js');
var AuthHeader = require('./auth_header.js');
var AuthDialog = require('./auth_dialog.js');

(function ()
{
	document.addEventListener("DOMContentLoaded", init);
	var app, auth_header, auth_dialog;
	
	function init ()
	{
		app = new (function ()
		{
			this.state =
				{
					Authorized: false,
					UserName: null
				};
			
			this.drawInterface = function ()
			{
				auth_header.render(document.querySelector("#menu"));
				auth_dialog.render();
				auth_dialog.hide();
			}
		})();
		
		auth_header = new AuthHeader();
		auth_dialog = new AuthDialog({ Width: 300, Height: 300 });
		
		auth_header.addEventListener("SignIn", function ()
		{
			auth_dialog.show()
		});
		
		service.sendPost("/Service/Auth", [{
			Name: "Content-Type",
			Value: "application/json"
		}], JSON.stringify({ Method: "CheckAuth" })).then(function (arg)
		{
			if (arg.ResponseJSON.Result === "Unauthorized")
			{
				app.state.Authorized = false;
				app.state.UserName = null;
			}
			app.drawInterface();
		});
	}
})();