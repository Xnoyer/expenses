function Service ()
{

}

var proto = Service.prototype;

proto.sendPost = function (url, headers, body) {

	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState === 4)
			{
				if (this.status === 200)
					resolve({ ResponseText: this.responseText, ResponseJSON: JSON.parse(this.responseText) });
				else
					reject({ ResponseText: this.responseText, ResponseJSON: JSON.parse(this.responseText), Status: this.status, Url: url });
			}
		};
		xhr.open("POST", url, true);
		if (headers)
		{
			for (var i = 0; i < headers.length; i++)
				xhr.setRequestHeader(headers[i].Name, headers[i].Value);
		}
		xhr.send(body);
	});
};

proto.AuthService = function (method, data)
{
	data = data || {};
	data.Method = method;
	return this.sendPost("/Service/Auth", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify(data));
};

proto.ExpenseService = function (method, data)
{
	data = data || {};
	data.Method = method;
	return this.sendPost("/Service/Expense", [{
		Name: "Content-Type",
		Value: "application/json"
	}], JSON.stringify(data));
};

module.exports = new Service();