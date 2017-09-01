var BaseControl = require('./base_control.js');

var Input = function (settings)
{
	settings = settings || {};
	this._isPassword = settings.IsPassword;
	BaseControl.apply(this, arguments);
};

Input.prototype = Object.create(BaseControl.prototype);

var proto = Input.prototype;

proto.init = function ()
{
	this._rootNode = document.createElement("input");
	this._rootNode.type = this._isPassword ? "password" : "text";
	this._rootNode.classList.add("input");
	this._rootNode.addEventListener("change", function ()
	{
		this.fireEvent("TextChanged", { Value: this._rootNode.value });
	}.bind(this));
};

module.exports = Input;