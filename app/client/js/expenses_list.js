var BaseControl = require('./base_control.js');

var ExpensesList = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
};

ExpensesList.prototype = Object.create(BaseControl.prototype);

var proto = ExpensesList.prototype;

proto.init = function ()
{
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("expenses_list");
};

module.exports = ExpensesList;