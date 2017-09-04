var BaseControl = require('./base_control.js');
var ExpensesList = require('./expenses_list.js');
var Button = require('./button.js');
var AddExpenseDialog = require('./add_expense_dialog.js');

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
	BaseControl.prototype.init.apply(this, arguments);
	this._rootNode = document.createElement("div");
	this._rootNode.classList.add("expenses_ctrl");
	
	this._header = document.createElement("h1");
	this._header.innerHTML = "My expenses list";
	this._rootNode.appendChild(this._header);
	
	this._addButton = new Button({ Text: "+ Add new Expense" });
	this._addButton.addCssClass("add_button");
	this._addButton.addEventListener("Click", this._onAddButtonClick.bind(this));
	this._addButton.render(this);
	
	this._expensesList = new ExpensesList();
	this._expensesList.render(this);
	this._expensesList.addEventListener("Delete", function (e)
	{
		this.fireEvent("RemoveExpense", e.detail);
	}.bind(this));
	
	this._add_dialog = new AddExpenseDialog({ Width: 400, Height: 600 });
	this._add_dialog.addEventListener("AddExpense", function (e)
	{
		this.fireEvent("AddExpense", e.detail);
	}.bind(this));
	this._add_dialog.render();
	this._add_dialog.hide();
};

proto.hide = function ()
{
	this.clear();
	this._rootNode.style.display = "none";
};

proto.show = function ()
{
	this._rootNode.style.display = "";
};

proto.clear = function()
{
	this._expensesList.clear();
};

proto._onAddButtonClick = function ()
{
	this._add_dialog.show();
};

proto.getList = function ()
{
	return this._expensesList;
};

proto.refresh = function (data)
{
	if (!data || !data.length)
	{
		this._expensesList.showNoData();
		return;
	}
	var lastDay, day, month, date, dateGroup, item;
	data.sort(function (a, b)
	{
		return a.Date - b.Date;
	});
	
	for (var i = 0; i < data.length; i++)
	{
		date = new Date(data[i].Date * 1000);
		data[i].DateTime = date;
		day = date.getDate().toString();
		if (day.length < 2)
			day = "0" + day;
		month = this._monthArray[date.getMonth()];
		if (day !== lastDay)
		{
			this._expensesList.dateGroup({ Month: month, Day: day });
			lastDay = day;
		}
		this._expensesList.addItem(data[i]);
	}
};

module.exports = ExpensesCtrl;