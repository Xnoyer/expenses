var BaseDialog = require('../base_controls/base_dialog.js');
var Label = require('../base_controls/label.js');

Confirm = function (settings)
{
	settings = settings || {};
	settings.Header = settings.Header || "Confirm";
	settings.OkButton = settings.OkButton || "Ok";
	settings.Width = settings.Width || 400;
	settings.Height = settings.Height || 200;
	this._message = settings.Message;
	BaseDialog.apply(this, [settings]);
};

Confirm.prototype = Object.create(BaseDialog.prototype);

var proto = Confirm.prototype;

proto.init = function ()
{
	BaseDialog.prototype.init.apply(this, arguments);
	this._rootNode.classList.add("confirm_dialog");
	new Label({ Content: this._message }).render(this._contentNode);
	this.render();
};

proto.onOk = function ()
{
	this.fireEvent("Ok");
	this.destroy();
};

proto.onCancel = function ()
{
	this.fireEvent("Cancel");
	this.destroy();
};

module.exports = Confirm;