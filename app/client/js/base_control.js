var BaseControl = function ()
{
	this._rootNode = null;
	this.init();
};

proto = BaseControl.prototype;

proto.init = function ()
{

};

proto.render = function (node)
{
	node.appendChild(this._rootNode);
};

proto.fireEvent = function (eventName, args)
{
	var event = new CustomEvent(eventName, args);
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