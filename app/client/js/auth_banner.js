var BaseControl = require('./base_control.js');
var Button = require('./button.js');

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
	this._rootNode = document.createElement("div");
	this._rootNode.id = "banner-wrapper";
	
	this._bannerNode = document.createElement("div");
	this._bannerNode.classList.add("container");
	this._bannerNode.id = "banner";
	
	this._signInBlock = document.createElement("div");
	this._signInBlock.classList.add("boxA");
	this._signInBlock.innerHTML = '<h3>Sign In</h3><p>You must sign in to your account to manage your expenses.</p>';
	this._signInButton = new Button({ Text: "Sign In" });
	this._signInButton.render(this._signInBlock);
	this._signInButton.addEventListener("click", this._onSignIn.bind(this));
	
	this._signUpBlock = document.createElement("div");
	this._signUpBlock.classList.add("boxB");
	this._signUpBlock.innerHTML = '<h3>Sign In</h3><p>Not having an account?</p>';
	this._signUpButton = new Button({ Text: "Create One" });
	this._signUpButton.render(this._signUpBlock);
	this._signUpButton.addEventListener("click", this._onSignUp.bind(this));
	
	this._bannerNode.appendChild(this._signInBlock);
	this._bannerNode.appendChild(this._signUpBlock);
	this._rootNode.appendChild(this._bannerNode);
};

proto._onSignIn = function ()
{
	this.fireEvent("SignIn");
};

proto._onSignUp = function ()
{
	this.fireEvent("SignUp");
};

module.exports = AuthHeader;