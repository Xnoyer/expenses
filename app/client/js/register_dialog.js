var BaseModal = require('./base_modal.js');
var Input = require('./input.js');
var Button = require('./button.js');
var Label = require('./label.js');
var Service = require('./service.js');

RegisterDialog = function ()
{
	BaseModal.apply(this, arguments);
};

RegisterDialog.prototype = Object.create(BaseModal.prototype);

var proto = RegisterDialog.prototype;

proto.init = function ()
{
	BaseModal.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("register_dialog");
	
	this._nameInputCtrl = new Input();
	this._loginInputCtrl = new Input();
	this._passwordInputCtrl = new Input({ IsPassword: true });
	
	this._loginBtn = new Button({ Text: "Sign Up" });
	
	new Label({ Content: "Full Name" }).render(this._rootNode);
	this._nameInputCtrl.render(this._rootNode);
	
	new Label({ Content: "Login" }).render(this._rootNode);
	this._loginInputCtrl.render(this._rootNode);
	
	new Label({ Content: "Password" }).render(this._rootNode);
	this._passwordInputCtrl.render(this._rootNode);
	this._loginBtn.render(this._rootNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
	
	this._loginBtn.addEventListener("Click", this._onRegisterAttempt.bind(this));
};

proto.clear = function ()
{
	this._nameInputCtrl.clear();
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

proto._onRegisterAttempt = function ()
{
	var name = this._nameInputCtrl.getContent(),
		login = this._loginInputCtrl.getContent(),
		password = this._passwordInputCtrl.getContent(),
		errMsg = "";
	
	if (!name)
		errMsg += "Name couldn't be empty.";
	if (!login)
		errMsg += "<br/>Login couldn't be empty.";
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
	Service.AuthService("Register",
		{
			Name: name,
			Login: login,
			Password: password
		}).then(function (arg)
	{
		this.fireEvent("RegisterSuccess", arg.ResponseJSON);
	}.bind(this), function ()
	{
		this.fireEvent("RegisterFailed");
		this._errNode.innerHTML = "Sorry, the same login is already used. Please try again";
		this._rootNode.appendChild(this._errNode);
	}.bind(this));
};

module.exports = RegisterDialog;