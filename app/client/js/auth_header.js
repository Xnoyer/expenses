var BaseControl = require('./base_control.js');

var AuthHeader = function ()
{
	BaseControl.apply(this, arguments);
	this._userName = null;
	this._authorized = false;
};

AuthHeader.prototype = Object.create(BaseControl.prototype);

var proto = AuthHeader.prototype;

proto.init = function ()
{
	this._rootNode = document.createElement("ul");
	this._signInButton = document.createElement("li");
	this._signInButton.innerHTML = "<a href='#' title='' id='SignIn'>Sign In</a>";
	this._signInButton.querySelector("#SignIn").addEventListener("click", this._onSignIn.bind(this));
	
	this._signUpButton = document.createElement("li");
	this._signUpButton.innerHTML = "<a href='#' title='' id='SignUp'>Sign Up</a>";
	this._signUpButton.querySelector("#SignUp").addEventListener("click", this._onSignUp.bind(this));
	
	this._signedInButton = document.createElement("li");
	this._signedInButton.innerHTML = "Authorized as {UserName} <a href='#' title='' id='LogOut'>(Log Out)</a>"
	this._signedInButton.querySelector("#LogOut").addEventListener("click", this._onLogOut.bind(this));
	
	this._rootNode.appendChild(this._signInButton);
	this._rootNode.appendChild(this._signUpButton);
};

proto._onSignIn = function ()
{
	this.fireEvent("SignIn");
};

proto._onSignUp = function ()
{
	this.fireEvent("SignUp");
};

proto._onLogOut = function ()
{
	this.fireEvent("LogOut");
};

module.exports = AuthHeader;