var BaseDialog = require('../base_controls/base_dialog.js');
var Input = require('../base_controls/input.js');
var Label = require('../base_controls/label.js');

RegisterDialog = function (settings)
{
	settings = settings || {};
	settings.Header = "Sign Up";
	settings.OkButton = "Sign Up";
	BaseDialog.apply(this, [settings]);
};

RegisterDialog.prototype = Object.create(BaseDialog.prototype);

var proto = RegisterDialog.prototype;

proto.init = function ()
{
	BaseDialog.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("register_dialog");
	
	this._nameInputCtrl = new Input();
	this._loginInputCtrl = new Input();
	this._passwordInputCtrl = new Input({ Type: "password" });
	
	new Label({ Content: "Full Name" }).render(this._contentNode);
	this._nameInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Login" }).render(this._contentNode);
	this._loginInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Password" }).render(this._contentNode);
	this._passwordInputCtrl.render(this._contentNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
};

proto.clear = function ()
{
	this._nameInputCtrl.clear();
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
		this._contentNode.appendChild(this._errNode);
		return;
	}
	
	if (this._errNode.parentNode === this._contentNode)
		this._contentNode.removeChild(this._errNode);
	this.fireEvent("Register",
		{
			Name: name,
			Login: login,
			Password: password
		});
};

module.exports = RegisterDialog;