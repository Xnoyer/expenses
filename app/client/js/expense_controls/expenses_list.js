var BaseControl = require('../base_controls/base_control.js');
var DateGroup = require("./date_group.js");
var ExpenseItem = require("./expense_item.js");
var Label = require("../base_controls/label.js");
var numeral = require('numeral');

var ExpensesList = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
	this._items = {};
	this._weekItems = [];
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
	this._weekItems = [];
	this._items = {};
	this._rootNode.innerHTML = "";
};

proto.showNoData = function ()
{
	this._noDataLabel.render(this._rootNode);
};

proto.setNoDataText = function (text)
{
	this._noDataLabel.setContent(text || "You have no expenses yet. Add one with button above");
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
	this._weekItems.push(data);
	
	this.pipeEvent(item, "Delete");
	this.pipeEvent(item, "Edit");
};

proto.separateWeek = function ()
{
	var sum = 0, avg;
	for (var i = 0; i < this._weekItems.length; i++)
		sum += +this._weekItems[i].Value;
	avg = (sum / this._weekItems.length).toFixed(2);
	var totalsLabel = new Label({ Content: "Week total expenses: " + numeral(sum).format("0,0.[00]") + "$ | Daily average: " + numeral(avg).format("0,0.[00]") + "$" });
	totalsLabel.addCssClass("week_total");
	totalsLabel.render(this._dateGroup);
	this._weekItems = [];
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
	if (!Object.keys(this._items).length)
	{
		this._dateGroup.detach();
		this.showNoData();
	}
};

module.exports = ExpensesList;