var BaseControl = require('./base_control.js');
var ExpensesList = require('./expenses_list.js');
var DateGroup = require("./date_group.js");
var ExpenseItem = require("./expense_item.js");

var ExpensesCtrl = function (settings)
{
	settings = settings || {};
	BaseControl.apply(this, arguments);
};

ExpensesCtrl.prototype = Object.create(BaseControl.prototype);

var proto = ExpensesCtrl.prototype;

proto._monthArray = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

proto.init = function ()
{
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("tbox1");
	this._rootNode.id = "box1";
	
	this._header = document.createElement("h1");
	this._header.innerHTML = "My expenses list";
	this._rootNode.appendChild(this._header);
	
	this._expensesList = new ExpensesList();
	this._expensesList.render(this);
};

proto.refresh = function (data)
{
	data = [
		{
			Description: "Ice-cream",
			Comment: "Icy ice-cream with strawberry jam",
			Value: 100,
			Date: Math.floor(Date.now() / 1000) - 20
		},
		{
			Description: "Sandwhich",
			Value: 150,
			Date: Math.floor(Date.now() / 1000)
		}
	];
	var lastDay, day, month, date, dateGroup, item;
	data.sort(function (a, b)
	{
		return a.Date - b.Date;
	});
	
	for (var i = 0; i < data.length; i++)
	{
		date = new Date(data[i].Date * 1000);
		day = date.getDate().toString();
		if (day.length < 2)
			day = "0" + day;
		month = this._monthArray[date.getMonth()];
		if (day !== lastDay)
		{
			dateGroup = new DateGroup({ Month: month, Day: day });
			dateGroup.render(this._expensesList);
			lastDay = day;
		}
		item = new ExpenseItem({
			Description: data[i].Description,
			Comment: data[i].Comment,
			Value: data[i].Value + "$",
			Time: date.getTime()
		});
		item.render(dateGroup);
	}
};

module.exports = ExpensesCtrl;