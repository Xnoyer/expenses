var BaseDialog = require('./base_dialog.js');
var Input = require('./input.js');
var Button = require('./button.js');
var Label = require('./label.js');
var Service = require('./service.js');

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
	Service.AuthService("Auth",
		{
			Method: "Auth",
			Login: login,
			Password: password
		}).then(function (arg)
	{
		this.fireEvent("AuthSuccess", arg.ResponseJSON);
	}.bind(this), function ()
		{
			this.fireEvent("AuthFailed");
			this._contentNode.innerHTML = "Incorrect login or password. Please try again";
			this._rootNode.appendChild(this._errNode);
		}.bind(this));
};

module.exports = AuthDialog;