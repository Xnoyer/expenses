var BaseControl = require('./base_control.js');

var Input = function (settings)
{
	settings = settings || {};
	this._type = settings.Type || "text";
	this._params = settings.Params || {};
	BaseControl.apply(this, arguments);
};

Input.prototype = Object.create(BaseControl.prototype);

var proto = Input.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("input");
	this._rootNode.type = this._type;
	this._rootNode.classList.add("input");
	this.setParams(this._params);
	this._rootNode.addEventListener("change", function ()
	{
		this.fireEvent("TextChanged", { Value: this._rootNode.value });
	}.bind(this));
};

proto.setParams = function (params)
{
	var paramKeys = Object.keys(params);
	for (var i = 0; i < paramKeys.length; i++)
	{
		this._rootNode[paramKeys[i]] = params[paramKeys[i]];
	}
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