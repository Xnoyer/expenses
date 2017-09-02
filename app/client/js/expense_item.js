var BaseControl = require('./base_control.js');

var ExpenseItem = function (settings)
{
	settings = settings || {};
	this._description = settings.Description;
	this._comment = settings.Comment;
	this._value = settings.Value;
	this._time = settings.Time;
	BaseControl.apply(this, arguments);
};

ExpenseItem.prototype = Object.create(BaseControl.prototype);

var proto = ExpenseItem.prototype;

proto.init = function ()
{
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("expense_item");
	
	this._descriptionNode = document.createElement("h3");
	this._descriptionNode.classList.add("description");
	this._descriptionNode.innerHTML = this._description;
	
	this._commentNode = document.createElement("span");
	this._commentNode.classList.add("comment");
	this._commentNode.innerHTML = this._comment || "";
	
	this._valueNode = document.createElement("div");
	this._valueNode.classList.add("value");
	this._valueNode.innerHTML = this._value;
	
	this._rootNode.appendChild(this._descriptionNode);
	this._rootNode.appendChild(this._commentNode);
	this._rootNode.appendChild(this._valueNode);
};

module.exports = ExpenseItem;