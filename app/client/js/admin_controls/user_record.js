var BaseControl = require('../base_controls/base_control.js');

var UserRecord = function (settings)
{
	settings = settings || {};
	this._key = settings.Key;
	this._name = settings.Name;
	this._login = settings.Login;
	this._role = settings.Role;
	BaseControl.apply(this, arguments);
};

UserRecord.prototype = Object.create(BaseControl.prototype);

var proto = UserRecord.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("user_record");
	
	this._keyNode = document.createElement("div");
	this._keyNode.classList.add("field");
	this._keyNode.innerHTML = this._key;
	this._rootNode.appendChild(this._keyNode);
	
	this._nameNode = document.createElement("div");
	this._nameNode.classList.add("field");
	this._nameNode.innerHTML = this._name;
	this._rootNode.appendChild(this._nameNode);
	
	this._loginNode = document.createElement("div");
	this._loginNode.classList.add("field");
	this._loginNode.innerHTML = this._login;
	this._rootNode.appendChild(this._loginNode);
	
	this._roleNode = document.createElement("div");
	this._roleNode.classList.add("field");
	this._roleNode.innerHTML = this._role;
	this._rootNode.appendChild(this._roleNode);
	
	this._deleteNode = document.createElement("div");
	this._deleteNode.classList.add("delete");
	this._deleteNode.addEventListener("click", function ()
	{
		this.lock();
		this.fireEvent("Delete", { Key: this._key });
	}.bind(this));
	this._rootNode.appendChild(this._deleteNode);
};

module.exports = UserRecord;
