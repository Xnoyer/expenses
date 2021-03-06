var BaseControl = function ()
{
	this._rootNode = null;
	this.init();
};

proto = BaseControl.prototype;

proto.init = function ()
{
	this._lockNode = document.createElement("div");
	this._lockNode.classList.add("lock");
};

proto.lock = function ()
{
	this._rootNode.appendChild(this._lockNode);
};

proto.unlock = function ()
{
	if (this._lockNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._lockNode);
};

proto.hide = function ()
{
	this._rootNode.style.display = "none";
};

proto.show = function ()
{
	this._rootNode.style.display = "";
};

proto.addCssClass = function (className)
{
	this._rootNode.classList.add(className);
};

proto.removeCssClass = function (className)
{
	this._rootNode.classList.remove(className);
};

proto.render = function (node)
{
	if (node instanceof BaseControl)
		node = node._rootNode;
	node.appendChild(this._rootNode);
};

proto.detach = function ()
{
	if (this._rootNode.parentNode)
		this._rootNode.parentNode.removeChild(this._rootNode);
};

proto.pipeEvent = function (ctrl, event, optionalEventSelf)
{
	ctrl.addEventListener(event, function (e)
	{
		this.fireEvent(optionalEventSelf || event, e.detail);
	}.bind(this));
};

proto.fireEvent = function (eventName, args)
{
	var event = new CustomEvent(eventName, { detail: args });
	this._rootNode.dispatchEvent(event);
};

proto.addEventListener = function (eventName, callback)
{
	this._rootNode.addEventListener(eventName, callback);
};

proto.removeEventListener = function (eventName, callback)
{
	this._rootNode.removeEventListener(eventName, callback);
};

module.exports = BaseControl;