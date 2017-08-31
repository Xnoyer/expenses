var React = require('react');
var ReactDOM = require('react-dom');
var service = require('./service.js');
var AuthHeader = require('./auth_header.jsx');

document.addEventListener("DOMContentLoaded", init);

function init ()
{
	let app = new (function () {
		this.state =
			{
				Authorized: false,
				UserName: null
			};

		function drawInterface ()
		{
			let auth_header = ReactDOM.render(<AuthHeader />, document.getElementById('menu'));
		}
	})();

	service.sendPost("http://localhost:3000/Service/Auth", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify({Method: "CheckAuth" })).then(function (arg) {
		if (arg.Result === "Unauthorized")
		{
			app.state.Authorized = false;
			app.state.UserName = null;
			app.drawInterface();
		}
	});
}