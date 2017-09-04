var BaseControl = require('./base_control.js');

var DateGroup = function (settings)
{
	settings = settings || {};
	this._month = settings.Month || "Sep";
	this._day = settings.Day || "03";
	BaseControl.apply(this, arguments);
};

DateGroup.prototype = Object.create(BaseControl.prototype);

var proto = DateGroup.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("date_group");
	
	this._dateNode = document.createElement("div");
	this._dateNode.classList.add("date");
	this._rootNode.appendChild(this._dateNode);
	
	this._dateNode.innerHTML = this._month;
	
	this._dayNode = document.createElement("div");
	this._dayNode.classList.add("day");
	this._dayNode.innerHTML = this._day;
	
	this._dateNode.appendChild(this._dayNode);
};

module.exports = DateGroup;