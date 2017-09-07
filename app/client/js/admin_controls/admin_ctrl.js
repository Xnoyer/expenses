var BaseControl = require('../base_controls/base_control.js');
var UserRecord = require('./user_record.js');

var AdminCtrl = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
};

AdminCtrl.prototype = Object.create(BaseControl.prototype);

var proto = AdminCtrl.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("admin_ctrl");
	
	this._headerContainer = document.createElement("div");
	this._headerContainer.classList.add("header-wrapper");
	this._rootNode.appendChild(this._headerContainer);
	
	this._header = document.createElement("h1");
	this._header.classList.add("admin_header");
	this._header.innerHTML = "Administrator";
	this._headerContainer.appendChild(this._header);
	
	this._userListNode = document.createElement("div");
	this._userListNode.classList.add("user_list");
	this._rootNode.appendChild(this._userListNode);
};

proto.update = function (users)
{
	var i;
	if (this._users && this._users.length)
	{
		for (i = 0; i < this._users.length; i++)
		{
			this._users[i].detach();
		}
		this._userListNode.innerHTML = "";
	}
	var headerRecord = new UserRecord({
		Key: "Key",
		Name: "Name",
		Login: "Login",
		Role: "Role"
	});
	headerRecord.addCssClass("list_header");
	headerRecord.render(this._userListNode);
	this._users = [];
	for (i = 0; i < users.length; i++)
	{
		var userRecord = new UserRecord(
			{
				Key: users[i].Key,
				Name: users[i].Name,
				Login: users[i].Login,
				Role: users[i].Role
			});
		userRecord.addEventListener("Delete", function (e)
		{
			this.fireEvent("DeleteUser", { Key: e.detail.Key });
		}.bind(this));
		userRecord.render(this._userListNode);
		this._users.push(userRecord);
	}
};

module.exports = AdminCtrl;