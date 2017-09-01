var BaseControl = require('./base_control.js');

var BaseModal = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
	this._width = settings.Width || document.documentElement.clientWidth / 2;
	this._height = settings.Height || document.documentElement.clientHeight / 2;
};

BaseModal.prototype = Object.create(BaseControl.prototype);

var proto = BaseModal.prototype;

proto.init = function ()
{
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("modal");
	this._bgNode = document.createElement("div");
	this._bgNode.classList.add("modal_bg");
	this._bgNode.appendChild(this._rootNode);
};

proto.render = function ()
{
	//render directly to document
	document.body.appendChild(this._bgNode);
};

proto.hide = function ()
{
	this._bgNode.style.display = "none";
};

proto.show = function ()
{
	this._bgNode.style.display = "";
	this._rootNode.style.width = this._width + "px";
	this._rootNode.style.height = this._height + "px";
};

module.exports = BaseModal;