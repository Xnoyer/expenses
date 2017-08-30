var react = require('react');
var reactDom = require('react-dom');
var service = require('./service.js');

document.addEventListener("DOMContentLoaded", init);

function init ()
{
	service.sendPost("http://localhost:3000/Service/Auth", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify({Method: "CheckAuth" })).then(function (arg) {
		debugger;
		alert(arg.ResponseJSON.Result);
	});
}