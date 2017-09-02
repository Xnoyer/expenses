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

proto.clear = function ()
{
	this._rootNode.value = "";
};

proto.getContent = function ()
{
	return this._rootNode.value;
};

module.exports = Input;