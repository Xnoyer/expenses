var BaseDialog = require('../base_controls/base_dialog.js');
var Input = require('../base_controls/input.js');
var Label = require('../base_controls/label.js');

AuthDialog = function (settings)
{
	settings = settings || {};
	settings.Header = "Sign In";
	settings.OkButton = "Sign In";
	BaseDialog.apply(this, [settings]);
};

AuthDialog.prototype = Object.create(BaseDialog.prototype);

var proto = AuthDialog.prototype;

proto.init = function ()
{
	BaseDialog.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("auth_dialog");
	this._loginInputCtrl = new Input();
	this._passwordInputCtrl = new Input({ Type: "password" });
	
	new Label({ Content: "Login" }).render(this._contentNode);
	this._loginInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Password" }).render(this._contentNode);
	this._passwordInputCtrl.render(this._contentNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
};

proto.clear = function ()
{
	this._loginInputCtrl.clear();
	this._passwordInputCtrl.clear();
	if (this._errNode.parentNode === this._contentNode)
		this._contentNode.removeChild(this._errNode);
};

proto.hide = function ()
{
	BaseDialog.prototype.hide.apply(this, arguments);
	this.clear();
};

proto.error = function (text)
{
	this._errNode.innerHTML = text;
	this._contentNode.appendChild(this._errNode);
};

proto.onOk = function ()
{
	var login = this._loginInputCtrl.getContent(),
		password = this._passwordInputCtrl.getContent(),
		errMsg = "";
	
	if (!login)
		errMsg += "Login couldn't be empty.";
	if (!password)
		errMsg += "<br/>Password couldn't be empty.";
	if (errMsg)
	{
		this._errNode.innerHTML = errMsg;
		this._contentNode.appendChild(this._errNode);
		return;
	}
	
	if (this._errNode.parentNode === this._contentNode)
		this._contentNode.removeChild(this._errNode);
	this.fireEvent("Auth", { Login: login, Password: password });
};

module.exports = AuthDialog;