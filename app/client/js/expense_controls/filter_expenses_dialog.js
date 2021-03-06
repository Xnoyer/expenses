var moment = require('moment');
moment.locale(navigator.language);
var BaseDialog = require('../base_controls/base_dialog.js');
var Input = require('../base_controls/input.js');
var Label = require('../base_controls/label.js');

FilterExpensesDialog = function (settings)
{
	settings = settings || {};
	settings.Header = "Filter Expenses";
	settings.OkButton = "Filter";
	BaseDialog.apply(this, [settings]);
};

FilterExpensesDialog.prototype = Object.create(BaseDialog.prototype);

var proto = FilterExpensesDialog.prototype;

proto.init = function ()
{
	BaseDialog.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("add_expense_dialog");
	
	this._startDateInputCtrl = new Input({ Type: "datetime-local" });
	this._endDateInputCtrl = new Input({ Type: "datetime-local" });
	
	new Label({ Content: "Start Date" }).render(this._contentNode);
	this._startDateInputCtrl.render(this._contentNode);
	
	new Label({ Content: "End Date" }).render(this._contentNode);
	this._endDateInputCtrl.render(this._contentNode);
};

proto.clear = function ()
{
	this._startDateInputCtrl.clear();
	this._endDateInputCtrl.clear();
};

proto.refresh = function (filter)
{
	if (filter)
	{
		this._startDateInputCtrl.setParams({ value: moment.unix(filter.StartDate).format("YYYY-MM-DDTHH:mm"), required: true });
		this._endDateInputCtrl.setParams({ value: moment.unix(filter.EndDate).format("YYYY-MM-DDTHH:mm"), required: true });
	}
	else
	{
		this._startDateInputCtrl.setParams({ value: moment().add(-1, 'd').format("YYYY-MM-DDTHH:mm"), required: true });
		this._endDateInputCtrl.setParams({ value: moment().format("YYYY-MM-DDTHH:mm"), required: true });
	}
};

proto.onOk = function ()
{
	var startDate = new Date(this._startDateInputCtrl.getContent()),
		endDate = new Date(this._endDateInputCtrl.getContent());
	
	this.fireEvent("FilterExpenses",
		{
			StartDate: Math.floor(startDate.getTime() / 1000),
			EndDate: Math.floor(endDate / 1000)
		});
	this.hide();
};

module.exports = FilterExpensesDialog;