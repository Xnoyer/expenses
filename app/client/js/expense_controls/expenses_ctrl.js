var Static = require('../static.js');
var BaseControl = require('../base_controls/base_control.js');
var ExpensesList = require('./expenses_list.js');
var Button = require('../base_controls/button.js');
var AddExpenseDialog = require('./add_expense_dialog.js');
var EditExpenseDialog = require('./edit_expense_dialog.js');
var FilterExpensesDialog = require('./filter_expenses_dialog.js');

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
	
	this._headerContainer = document.createElement("div");
	this._headerContainer.classList.add("header-wrapper");
	this._rootNode.appendChild(this._headerContainer);
	
	this._header = document.createElement("h1");
	this._header.classList.add("expenses_header");
	this._header.innerHTML = "My expenses list";
	this._headerContainer.appendChild(this._header);
	
	this._filterButton = new Button({ Text: "Filter" });
	this._filterButton.addCssClass("filter_button");
	this._filterButton.addEventListener("Click", this._onFilterButtonClick.bind(this));
	this._filterButton.render(this._headerContainer);
	
	this._resetFilterButton = new Button({ Text: "Reset" });
	this._resetFilterButton.addCssClass("reset_filter_button");
	this._resetFilterButton.addEventListener("Click", this._onResetFilterButtonClick.bind(this));
	this._resetFilterButton.render(this._headerContainer);
	this._resetFilterButton.hide();
	
	this._addButton = new Button({ Text: "+ Add new Expense" });
	this._addButton.addCssClass("add_button");
	this._addButton.addEventListener("Click", this._onAddButtonClick.bind(this));
	this._addButton.render(this._headerContainer);
	
	this._expensesList = new ExpensesList();
	this._expensesList.render(this);
	this.pipeEvent(this._expensesList, "Delete", "RemoveExpense");
	this._expensesList.addEventListener("Edit", function (e)
	{
		this._editDialog.show();
		this._editDialog.update(this._dataById[e.detail.Id]);
	}.bind(this));
	
	this._addDialog = new AddExpenseDialog({ Width: 400, Height: 600 });
	this.pipeEvent(this._addDialog, "AddExpense");
	this._addDialog.render();
	this._addDialog.hide();
	
	this._editDialog = new EditExpenseDialog({ Width: 400, Height: 600 });
	this.pipeEvent(this._editDialog, "EditExpense");
	this._editDialog.render();
	this._editDialog.hide();
	
	this._filterDialog = new FilterExpensesDialog({ Width: 400, Height: 400 });
	this._filterDialog.addEventListener("FilterExpenses", function (e)
	{
		this._filter = e.detail;
		this.fireEvent("FilterExpenses", e.detail);
		this._resetFilterButton.show();
		var text = "Filter (" + Static.shortTimestampToReadableString(this._filter.StartDate) + " - " + Static.shortTimestampToReadableString(this._filter.EndDate);
		this._filterButton.setText(text);
		this._expensesList.setNoDataText("Nothing to display here. Try to reset filter");
	}.bind(this));
	this._filterDialog.render();
	this._filterDialog.hide();
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
	this._addDialog.show();
};

proto._onFilterButtonClick = function ()
{
	this._filterDialog.show();
	this._filterDialog.refresh(this._filter);
};

proto._onResetFilterButtonClick = function ()
{
	this._filter = null;
	this._resetFilterButton.hide();
	this._filterButton.setText("Filter");
	this.fireEvent("FilterExpenses", null);
	this._expensesList.setNoDataText();
};

proto.getList = function ()
{
	return this._expensesList;
};

proto.refresh = function (data)
{
	this._dataById = {};
	if (!data || !data.length)
	{
		this._expensesList.showNoData();
		return;
	}
	var lastDay, lastWeek, day, week, month, date, dateGroup, item;
	data.sort(function (a, b)
	{
		return a.Date - b.Date;
	});
	
	for (var i = 0; i < data.length; i++)
	{
		date = new Date(data[i].Date * 1000);
		
		week = Static.getWeek(date);
		if (lastWeek !== week)
		{
			if (lastWeek)
				this._expensesList.separateWeek();
			lastWeek = week;
		}
		
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
		this._dataById[data[i].Id] = data[i];
		
		this._expensesList.addItem(data[i]);
	}
	this._expensesList.separateWeek();
};

module.exports = ExpensesCtrl;