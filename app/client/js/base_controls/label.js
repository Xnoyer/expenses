var BaseControl = require('./base_control.js');

var Label = function (settings)
{
	settings = settings || {};
	this._content = settings.Content;
	BaseControl.apply(this, arguments);
};

Label.prototype = Object.create(BaseControl.prototype);

var proto = Label.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("span");
	this._rootNode.classList.add("label");
	this._rootNode.innerHTML = this._content;
};

proto.setContent = function (content)
{
	this._content = content;
	this._rootNode.innerHTML = this._content;
	return this;
};

module.exports = Label;