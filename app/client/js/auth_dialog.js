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
	this._errNode.innerHTML = "Incorrect login or password. Please try again";
	
	this._loginBtn.addEventListener("Click", this._onLoginAttempt.bind(this));
};

proto.clear = function ()
{
	this._loginInputCtrl.clear();
	this._passwordInputCtrl.clear();
};

proto._onLoginAttempt = function ()
{
	if (this._errNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._errNode);
	Service.AuthService("Auth",
		{
			Method: "Auth",
			Login: this._loginInputCtrl.getContent(),
			Password: this._passwordInputCtrl.getContent()
		}).then(function (arg)
	{
		this.fireEvent("AuthSuccess", arg.ResponseJSON);
	}.bind(this), function ()
		{
			this.fireEvent("AuthFailed");
			this._rootNode.appendChild(this._errNode);
		}.bind(this));
};

module.exports = AuthDialog;