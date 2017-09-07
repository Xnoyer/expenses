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
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("modal");
	this._bgNode = document.createElement("div");
	this._bgNode.classList.add("modal_bg");
	this._bgNode.appendChild(this._rootNode);
	this._bgNode.addEventListener("click", this.onBgClick.bind(this));
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

proto.onBgClick = function (e)
{
	if (e.srcElement === this._bgNode)
		this.hide();
};

proto.destroy = function ()
{
	if (this._bgNode.parentNode)
		document.body.removeChild(this._bgNode);
	delete this._bgNode;
};

module.exports = BaseModal;