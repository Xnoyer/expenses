var BaseModal = require('./base_modal.js');
var Input = require('./input.js');
var Button = require('./button.js');
var Label = require('./label.js');
var Service = require('./service.js');

AuthDialog = function ()
{
	BaseModal.apply(this, arguments);
};

AuthDialog.prototype = Object.create(BaseModal.prototype);

var proto = AuthDialog.prototype;

proto.init = function ()
{
	BaseModal.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("auth_dialog");
	this._loginInputCtrl = new Input();
	this._passwordInputCtrl = new Input({ IsPassword: true });
	this._loginBtn = new Button({ Text: "Sign In" });
	
	new Label({ Content: "Login" }).render(this._rootNode);
	this._loginInputCtrl.render(this._rootNode);
	
	new Label({ Content: "Password" }).render(this._rootNode);
	this._passwordInputCtrl.render(this._rootNode);
	
	this._loginBtn.render(this._rootNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
	
	this._loginBtn.addEventListener("Click", this._onLoginAttempt.bind(this));
};

proto.clear = function ()
{
	this._loginInputCtrl.clear();
	this._passwordInputCtrl.clear();
	if (this._errNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._errNode);
};

proto.hide = function ()
{
	BaseModal.prototype.hide.apply(this, arguments);
	this.clear();
};

proto._onLoginAttempt = function ()
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
		this._rootNode.appendChild(this._errNode);
		return;
	}
	
	if (this._errNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._errNode);
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
			this._errNode.innerHTML = "Incorrect login or password. Please try again";
			this._rootNode.appendChild(this._errNode);
		}.bind(this));
};

module.exports = AuthDialog;