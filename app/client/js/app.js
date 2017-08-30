var react = require('react');
var reactDom = require('react-dom');
var service = require('./service.js');

document.addEventListener("DOMContentLoaded", init);

function init ()
{
	service.sendPost("http://localhost:3000/Service/test", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify({ key: "value" })).then(function (arg) {
		alert(arg.ResponseText)
	});
}