var moment = require('moment');
moment.locale(navigator.language);
var BaseDialog = require('../base_controls/base_dialog.js');
var Input = require('../base_controls/input.js');
var Label = require('../base_controls/label.js');

AddExpenseDialog = function (settings)
{
	settings = settings || {};
	settings.Header = "New Expense";
	settings.OkButton = "ADD";
	BaseDialog.apply(this, [settings]);
};

AddExpenseDialog.prototype = Object.create(BaseDialog.prototype);

var proto = AddExpenseDialog.prototype;

proto.init = function ()
{
	BaseDialog.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("add_expense_dialog");
	
	this._descriptionInputCtrl = new Input();
	this._commentInputCtrl = new Input();
	this._valueInputCtrl = new Input({ Type: "number" });
	this._dateInputCtrl = new Input({ Type: "datetime-local" });
	
	new Label({ Content: "Description" }).render(this._contentNode);
	this._descriptionInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Comment (Optional)" }).render(this._contentNode);
	this._commentInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Value (in $)" }).render(this._contentNode);
	this._valueInputCtrl.render(this._contentNode);
	
	new Label({ Content: "Date" }).render(this._contentNode);
	this._dateInputCtrl.render(this._contentNode);
	
	this._errNode = document.createElement("div");
	this._errNode.classList.add("err_node");
};

proto.clear = function ()
{
	this._descriptionInputCtrl.clear();
	this._commentInputCtrl.clear();
	this._valueInputCtrl.clear();
	this._dateInputCtrl.clear();
	if (this._errNode.parentNode === this._contentNode)
		this._contentNode.removeChild(this._errNode);
};

proto.show = function ()
{
	BaseDialog.prototype.show.apply(this, arguments);
	this._valueInputCtrl.setParams({ min: .01, value: 1, required: true });
	this._dateInputCtrl.setParams({ value: moment().format("YYYY-MM-DDTHH:mm"), required: true });
};

proto.hide = function ()
{
	BaseDialog.prototype.hide.apply(this, arguments);
	this.clear();
};

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
	
	this.fireEvent("AddExpense",
		{
			Description: description,
			Comment: comment,
			Value: value,
			Date: Math.floor(date.getTime() / 1000)
		});
	this.hide();
};

module.exports = AddExpenseDialog;