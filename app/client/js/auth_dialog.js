var BaseModal = require('./base_modal.js');
var Input = require('./input.js');
var Button = require('./button.js');

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
};

module.exports = AuthDialog;