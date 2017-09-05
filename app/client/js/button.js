var BaseControl = require('./base_control.js');

var Button = function (settings)
{
	settings = settings || {};
	this._content = settings.Text || "Button";
	BaseControl.apply(this, arguments);
};

Button.prototype = Object.create(BaseControl.prototype);

var proto = Button.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("a");
	this._rootNode.innerHTML = this._content;
	this._rootNode.href = "#";
	this._rootNode.classList.add("button");
	this._rootNode.addEventListener("click", function ()
	{
		this.fireEvent("Click");
	}.bind(this));
};

proto.setText = function (text)
{
	this._content = text;
	this._rootNode.innerHTML = this._content;
};

module.exports = Button;