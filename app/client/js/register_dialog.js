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
	this._errNode.innerHTML = "Sorry, the same login is already used. Please try again";
	
	this._loginBtn.addEventListener("Click", this._onRegisterAttempt.bind(this));
};

proto.clear = function ()
{
	this._nameInputCtrl.clear();
	this._loginInputCtrl.clear();
	this._passwordInputCtrl.clear();
};

proto._onRegisterAttempt = function ()
{
	if (this._errNode.parentNode === this._rootNode)
		this._rootNode.removeChild(this._errNode);
	Service.AuthService("Register",
		{
			Name: this._nameInputCtrl.getContent(),
			Login: this._loginInputCtrl.getContent(),
			Password: this._passwordInputCtrl.getContent()
		}).then(function (arg)
	{
		this.fireEvent("RegisterSuccess", arg.ResponseJSON);
	}.bind(this), function ()
	{
		this.fireEvent("RegisterFailed");
		this._rootNode.appendChild(this._errNode);
	}.bind(this));
};

module.exports = RegisterDialog;