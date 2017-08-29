var react = require('react');
var reactDom = require('react-dom');
var service = require('./service.js');

document.addEventListener("DOMContentLoaded", init);

function init ()
{
	service.sendPost("localhost:3000/Service/test", null, { test: 1 });
}