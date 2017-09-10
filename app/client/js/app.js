var service = require('./service.js');
var AuthHeader = require('./auth_controls/auth_header.js');
var AuthBanner = require('./auth_controls/auth_banner.js');
var Confirm = require('./base_controls/confirm.js');
var AuthDialog = require('./auth_controls/auth_dialog.js');
var RegisterDialog = require('./auth_controls/register_dialog.js');
var ExpensesCtrl = require('./expense_controls/expenses_ctrl.js');
var AdminCtrl = require('./admin_controls/admin_ctrl.js');

(function ()
{
	document.addEventListener("DOMContentLoaded", init);
	var app, auth_header, auth_banner, auth_dialog, register_dialog, expenses_ctrl, admin_ctrl;
	
	function init ()
	{
		app = new (function ()
		{
			this.state =
				{
					Authorized: false,
					User: null,
					Expenses: [],
					Filter: null
				};
			
			this.drawInterface = function ()
			{
				auth_header.render(document.querySelector(".menu"));
				if (app.state.Authorized)
				{
					auth_header.login(app.state.User);
					auth_banner.detach();
					expenses_ctrl.show();
					if (app.state.User.Role > 2)
					{
						//Admin
						showAdminCtrl();
					}
				}
				else
				{
					auth_header.logout();
					auth_banner.render(document.querySelector("#banner-container"));
					expenses_ctrl.hide();
				}
				auth_dialog.render();
				auth_dialog.hide();
				register_dialog.render();
				register_dialog.hide();
				
				expenses_ctrl.render(document.querySelector("#page"));
			}
		})();
		
		auth_header = new AuthHeader();
		auth_header.addEventListener("SignIn", onSignInRequested);
		auth_header.addEventListener("SignUp", onSignUpRequested);
		auth_header.addEventListener("LogOut", onLogOut);
		
		auth_banner = new AuthBanner();
		auth_banner.addEventListener("SignIn", onSignInRequested);
		auth_banner.addEventListener("SignUp", onSignUpRequested);
		
		auth_dialog = new AuthDialog({ Width: 360, Height: 450 });
		auth_dialog.addEventListener("Auth", onAuthAttempt);
		
		register_dialog = new RegisterDialog({ Width: 360, Height: 550 });
		register_dialog.addEventListener("RegisterSuccess", onRegisterAttempt);
		
		expenses_ctrl = new ExpensesCtrl();
		expenses_ctrl.addEventListener("AddExpense", onAddExpense);
		expenses_ctrl.addEventListener("EditExpense", onEditExpense);
		expenses_ctrl.addEventListener("RemoveExpense", onRemoveExpense);
		expenses_ctrl.addEventListener("FilterExpenses", onFilterExpenses);
		
		admin_ctrl = new AdminCtrl();
		admin_ctrl.addEventListener("DeleteUser", onDeleteUser);
		
		service.AuthService("CheckAuth").then(function (arg)
		{
			if (arg && arg.ResponseJSON)
			{
				if (arg.ResponseJSON == "Unauthorized")
				{
					app.state.Authorized = false;
					app.state.User = null;
				}
				else
				{
					app.state.Authorized = true;
					app.state.User = arg.ResponseJSON;
					getExpenses();
				}
			}
			app.drawInterface();
		});
	}
	
	function onLogOut ()
	{
		service.AuthService("Logout").then(function ()
		{
			auth_header.logout();
			auth_banner.render(document.querySelector("#banner-container"));
			expenses_ctrl.hide();
			hideAdminCtrl();
		});
	}
	
	function onAuthAttempt (e)
	{
		var data = e.detail;
		service.AuthService("Auth",
			{
				Method: "Auth",
				Login: data.Login,
				Password: data.Password
			}).then(function (arg)
		{
			var user = arg.ResponseJSON;
			auth_dialog.clear();
			auth_dialog.hide();
			app.state.Authorized = true;
			app.state.User = user;
			auth_header.login(user);
			auth_banner.detach();
			expenses_ctrl.show();
			getExpenses();
			if (app.state.User.Role > 2)
			{
				//Admin
				showAdminCtrl();
			}
		}.bind(this), function ()
		{
			auth_dialog.error("Incorrect login or password. Please try again");
		}.bind(this));
	}
	
	function onRegisterAttempt (evt)
	{
		var data = e.detail;
		service.AuthService("Register",
			{
				Name: data.Name,
				Login: data.Login,
				Password: data.Password
			}).then(function (arg)
		{
			var user = arg.ResponseJSON;
			register_dialog.clear();
			register_dialog.hide();
			app.state.Authorized = true;
			app.state.User = user;
			auth_header.login(user);
			auth_banner.detach();
			expenses_ctrl.refresh();
			expenses_ctrl.show();
		}.bind(this), function ()
		{
			register_dialog.error("Sorry, the same login is already used. Please try again");
		}.bind(this));
	}
	
	function onSignInRequested ()
	{
		auth_dialog.show();
	}
	
	function onSignUpRequested ()
	{
		register_dialog.show();
	}
	
	function getExpenses ()
	{
		service.ExpenseService("Get", app.state.Filter).then(function (arg)
		{
			app.state.Expenses = arg.ResponseJSON;
			expenses_ctrl.clear();
			expenses_ctrl.refresh(app.state.Expenses);
		});
	}
	
	function onAddExpense (e)
	{
		var data = e.detail;
		service.ExpenseService("Add", data).then(function (arg)
		{
			data.Id = arg.ResponseJSON.Id;
			app.state.Expenses.push(data);
			expenses_ctrl.clear();
			expenses_ctrl.refresh(app.state.Expenses);
		});
	}
	
	function onEditExpense (e)
	{
		var data = e.detail;
		service.ExpenseService("Edit", data).then(function (arg)
		{
			var index = -1;
			for (var i = 0; i < app.state.Expenses.length; i++)
			{
				if (app.state.Expenses[i].Id === arg.ResponseJSON.Id)
				{
					index = i;
					break;
				}
			}
			if (i > -1)
				app.state.Expenses[i] = data;
			else
				throw new Error("Expense not found");
			expenses_ctrl.clear();
			expenses_ctrl.refresh(app.state.Expenses);
		});
	}
	
	function onFilterExpenses (e)
	{
		var filterData = e.detail;
		if (filterData)
			app.state.Filter = filterData;
		else
			app.state.Filter = null;
		getExpenses();
	}
	
	function onRemoveExpense (e)
	{
		var confirm = new Confirm({ Message: "Do you really want to remove this expense? this action can not be undone." });
		confirm.addEventListener("Ok", function ()
		{
			service.ExpenseService("Remove", e.detail).then(function (arg)
			{
				var index = -1;
				for (var i = 0; i < app.state.Expenses.length; i++)
				{
					if (app.state.Expenses[i].Id === e.detail.Id)
					{
						index = i;
						break;
					}
				}
				if (i > -1)
					app.state.Expenses.splice(i, 1);
				else
					throw new Error("Expense not found");
				expenses_ctrl.getList().removeItem(e.detail.Id);
			});
		}.bind(this));
		confirm.show();
	}
	
	function showAdminCtrl ()
	{
		app.admin_node = document.createElement("div");
		app.admin_node.classList.add("admin_node");
		app.admin_node.classList.add("container");
		document.body.appendChild(app.admin_node);
		admin_ctrl.render(app.admin_node);
		getUsers();
	}
	
	function getUsers ()
	{
		service.AdminService("GetUsers").then(function (arg)
		{
			admin_ctrl.update(arg.ResponseJSON);
		});
	}
	
	function onDeleteUser (e)
	{
		if (!app.state.Authorized || app.state.User.Role < 3)
			return;
		service.AdminService("RemoveUser", { Key: e.detail.Key }).then(function (arg)
		{
			getUsers();
		});
	}
	
	function hideAdminCtrl ()
	{
		if (app.admin_node && app.admin_node.parentNode)
		{
			admin_ctrl.detach();
			app.admin_node.parentNode.removeChild(app.admin_node);
			delete app.admin_node;
		}
	}
})();