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
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("auth_header");
	
	this._signInButton = document.createElement("div");
	this._signInButton.classList.add("auth_header_item");
	this._signInButton.classList.add("active");
	this._signInButton.innerHTML = "Sign In";
	this._signInButton.addEventListener("click", this._onSignIn.bind(this));
	
	this._signUpButton = document.createElement("div");
	this._signUpButton.classList.add("auth_header_item");
	this._signUpButton.classList.add("active");
	this._signUpButton.innerHTML = "Sign Up";
	this._signUpButton.addEventListener("click", this._onSignUp.bind(this));
	
	this._signedInButton = document.createElement("div");
	this._signedInButton.classList.add("auth_header_item");
	this._signedInButton.innerHTML = "Authorized as <span id='username'>UserName</span> <span id='logout' class='active'>(Log Out)</span>";
	this._signedInButton.querySelector("#logout").addEventListener("click", this._onLogOut.bind(this));
	
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