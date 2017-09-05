var BaseControl = require('../base_controls/base_control.js');
var DateGroup = require("./date_group.js");
var ExpenseItem = require("./expense_item.js");
var Label = require("../base_controls/label.js");

var ExpensesList = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
	this._items = {};
	this._dateGroup = null;
};

ExpensesList.prototype = Object.create(BaseControl.prototype);

var proto = ExpensesList.prototype;

proto.init = function ()
{
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("expenses_list");
	
	this._noDataLabel = new Label({ Content: "You have no expenses yet. Add one with button above" });
	this._noDataLabel.addCssClass("no_data");
};

proto.clear = function ()
{
	var keys = Object.keys(this._items);
	for (var i = 0; i < keys.length; i++)
	{
		this._items[keys[i]].detach();
		delete this._items[keys[i]];
	}
	this._rootNode.innerHTML = "";
};

proto.showNoData = function ()
{
	this._noDataLabel.render(this._rootNode);
};

proto.addItem = function (data)
{
	this._noDataLabel.detach();
	var item = new ExpenseItem({
		Description: data.Description,
		Comment: data.Comment,
		Value: data.Value + "$",
		Time: data.DateTime.getTime(),
		Id: data.Id
	});
	if (this._dateGroup)
		item.render(this._dateGroup);
	this._items[data.Id] = item;
	item.addEventListener("Delete", function (e)
	{
		this.fireEvent("Delete", e.detail);
	}.bind(this));
};

proto.dateGroup = function (data)
{
	var dateGroup = new DateGroup(data);
	dateGroup.render(this);
	this._dateGroup = dateGroup;
};

proto.removeItem = function (id)
{
	this._items[id].detach();
	delete this._items[id];
};

module.exports = ExpensesList;