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
	this._signedInButton.innerHTML = "Authorized as <span id='username'>UserName</span> <a href='#' title='' id='LogOut'>(Log Out)</a>";
	this._signedInButton.querySelector("#LogOut").addEventListener("click", this._onLogOut.bind(this));
	
	this._rootNode.appendChild(this._signInButton);
	this._rootNode.appendChild(this._signUpButton);
};

proto.login = function (user)
{
	this._userName = user.Name;
	if (!this._authorized)
	{
		this._rootNode.removeChild(this._signInButton);
		this._rootNode.removeChild(this._signUpButton);
		
		this._rootNode.appendChild(this._signedInButton);
		this._authorized = true;
	}
	this._signedInButton.querySelector("#username").innerHTML = this._userName;
};

proto.logout = function ()
{
	if (!this._authorized)
		return;
	this._userName = null;
	this._rootNode.appendChild(this._signInButton);
	this._rootNode.appendChild(this._signUpButton);
	this._rootNode.removeChild(this._signedInButton);
	this._authorized = false;
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