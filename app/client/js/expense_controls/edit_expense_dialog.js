var moment = require('moment');
moment.locale(navigator.language);
var BaseDialog = require('../base_controls/base_dialog.js');
var AddExpenseDialog = require('./add_expense_dialog.js');

EditExpenseDialog = function (settings)
{
	settings = settings || {};
	settings.Header = "Edit Expense";
	settings.OkButton = "Done";
	BaseDialog.apply(this, [settings]);
};

EditExpenseDialog.prototype = Object.create(AddExpenseDialog.prototype);

var proto = EditExpenseDialog.prototype;

proto.onOk = function ()
{
	var description = this._descriptionInputCtrl.getContent(),
		comment = this._commentInputCtrl.getContent(),
		value = this._valueInputCtrl.getContent(),
		date = new Date(this._dateInputCtrl.getContent()),
		errMsg = "";
	
	if (!description)
		errMsg += "Description couldn't be empty.";
	if (!value)
		errMsg += "<br/>Value couldn't be empty.";
	if (isNaN(date.getTime()))
		errMsg += "<br/>Date is incorrect.";
	if (errMsg)
	{
		this._errNode.innerHTML = errMsg;
		this._contentNode.appendChild(this._errNode);
		return;
	}
	
	if (this._errNode.parentNode === this._contentNode)
		this._contentNode.removeChild(this._errNode);
	
	this.fireEvent("EditExpense",
		{
			Description: description,
			Comment: comment,
			Value: value,
			Date: Math.floor(date.getTime() / 1000),
			Id: this._id
		});
	this.hide();
};

proto.update = function (expense)
{
	this._descriptionInputCtrl.setParams({ value: expense.Description });
	this._commentInputCtrl.setParams({ value: expense.Comment });
	this._valueInputCtrl.setParams({ value: expense.Value });
	this._dateInputCtrl.setParams({ value: moment.unix(expense.Date).format("YYYY-MM-DDTHH:mm") });
	this._id = expense.Id;
};

module.exports = EditExpenseDialog;