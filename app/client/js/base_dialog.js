var BaseModal = require('./base_modal.js');
var Button = require('./button.js');
var Label = require('./label.js');

BaseDialog = function (settings)
{
	settings = settings || {};
	this._headerContent = settings.Header || "Dialog";
	this._okButtonText = settings.OkButton || "Ok";
	this._cancelButtonText = settings.CancelButton || "Cancel";
	BaseModal.apply(this, arguments);
};

BaseDialog.prototype = Object.create(BaseModal.prototype);

var proto = BaseDialog.prototype;

proto.init = function ()
{
	BaseModal.prototype.init.apply(this, arguments);
	
	this._rootNode.classList.add("base_dialog");
	
	this._header = new Label({ Content: this._headerContent });
	this._header.addCssClass("dialog_header");
	
	this._buttonsNode = document.createElement("div");
	this._buttonsNode.classList.add("buttons_node");
	
	this._cancelButton = new Button({ Text: this._cancelButtonText });
	this._okButton = new Button({ Text: this._okButtonText });
	
	this._cancelButton.render(this._buttonsNode);
	this._okButton.render(this._buttonsNode);
	
	this._cancelButton.addEventListener("Click", this.onCancel.bind(this));
	this._okButton.addEventListener("Click", this.onOk.bind(this));
	
	this._contentNode = document.createElement("div");
	this._contentNode.classList.add("content_node");
	
	this._header.render(this._rootNode);
	this._rootNode.appendChild(this._contentNode);
	this._rootNode.appendChild(this._buttonsNode);
	
	this._rootNode.addEventListener("keydown", this.onKeyDown.bind(this));
};

proto.onKeyDown = function (e)
{
	if (e.keyCode === 13) //Enter
	{
		this._okButton.fireEvent("Click");
	}
};

proto.onCancel = function ()
{
	this.hide();
};

proto.onOk = function ()
{

};

module.exports = BaseDialog;