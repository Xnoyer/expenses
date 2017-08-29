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
					resolve({ ResponseText: this.responseText });
				else
					reject({ ResponseText: this.responseText, Status: this.status, Url: settings.Url });
			}
		};
		xhr.open("POST", url, false);
		if (headers)
		{
			for (var i = 0; i < headers.length; i++)
				xhr.setRequestHeader(headers[i].Name, headers[i].Value);
		}
		xhr.send(body);
	});
};

module.exports = new Service();