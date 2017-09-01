var BaseModal = require('./base_modal.js');
var Input = require('./input.js');
var Button = require('./button.js');
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
	
	this._rootNode.innerHTML += "<span>Login</span>";
	this._loginInputCtrl.render(this._rootNode);
	this._rootNode.innerHTML += "<span>Password</span>";
	this._passwordInputCtrl.render(this._rootNode);
	this._loginBtn.render(this._rootNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
	this._errNode.innerHTML = "Incorrect login or password. Please try again";
	
	this._loginBtn.addEventListener("Click", this._onLoginAttempt.bind(this));
};

proto._onLoginAttempt = function ()
{
	if (this._errNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._errNode);
	Service.sendPost("/Service/Auth", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify({ Method: "Auth", Login: this._loginInputCtrl.getContent(), Password: this._passwordInputCtrl.getContent() }))
		.then(function (arg)
		{
			this.fireEvent("AuthSuccess", { UserName: arg.UserName });
		}.bind(this), function (arg)
		{
			this.fireEvent("AuthFailed");
			this._rootNode.appendChild(this._errNode);
		}.bind(this));
};

module.exports = AuthDialog;