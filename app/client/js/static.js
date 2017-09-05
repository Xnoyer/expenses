module.exports =
	{
		dateToString: function (date)
		{
			var ret = "";
			ret += date.getFullYear();
			var month = (date.getMonth() + 1).toString();
			if (month.length === 1)
				month = "0" + month;
			ret += "-" + month;
			var day = date.getDate().toString();
			if (day.length === 1)
				day = "0" + day;
			ret += "-" + day;
			
			ret += "T";
			
			var hour = date.getHours().toString();
			if (hour.length === 1)
				hour = "0" + hour;
			ret += hour;
			var min = date.getMinutes().toString();
			if (min.length === 1)
				min = "0" + min;
			ret += ":" + min;
			var sec = date.getSeconds().toString();
			if (sec.length === 1)
				sec = "0" + sec;
			ret += ":" + sec;
			return ret;
		},
		dateToReadableString: function (date)
		{
			var ret = "";
			ret += date.getFullYear();
			var month = (date.getMonth() + 1).toString();
			if (month.length === 1)
				month = "0" + month;
			ret += "." + month;
			var day = date.getDate().toString();
			if (day.length === 1)
				day = "0" + day;
			ret += "." + day;
			
			ret += " ";
			
			var hour = date.getHours().toString();
			if (hour.length === 1)
				hour = "0" + hour;
			ret += hour;
			var min = date.getMinutes().toString();
			if (min.length === 1)
				min = "0" + min;
			ret += ":" + min;
			var sec = date.getSeconds().toString();
			if (sec.length === 1)
				sec = "0" + sec;
			ret += ":" + sec;
			return ret;
		},
		shortTimestampToString: function (ts)
		{
			var date = new Date(ts * 1000);
			return this.dateToString(date);
		},
		shortTimestampToReadableString: function (ts)
		{
			var date = new Date(ts * 1000);
			return this.dateToReadableString(date);
		},
		timestampToTime: function (ts)
		{
			var date = new Date(ts), ret = "";
			var hour = date.getHours().toString();
			if (hour.length === 1)
				hour = "0" + hour;
			ret += hour;
			var min = date.getMinutes().toString();
			if (min.length === 1)
				min = "0" + min;
			ret += ":" + min;
			var sec = date.getSeconds().toString();
			if (sec.length === 1)
				sec = "0" + sec;
			ret += ":" + sec;
			return ret;
		}
	};