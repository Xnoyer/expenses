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
		},
		getWeek: function (date, dowOffset)
		{
			/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
			
			dowOffset = typeof(dowOffset) === 'int' ? dowOffset : 0; //default dowOffset to zero
			var newYear = new Date(date.getFullYear(), 0, 1);
			var day = newYear.getDay() - dowOffset; //the day of week the year begins on
			day = (day >= 0 ? day : day + 7);
			var daynum = Math.floor((date.getTime() - newYear.getTime() -
				(date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
			var weeknum;
			//if the year starts before the middle of a week
			if (day < 4)
			{
				weeknum = Math.floor((daynum + day - 2) / 7) + 1;
				if (weeknum > 52)
				{
					nYear = new Date(date.getFullYear() + 1, 0, 1);
					nday = nYear.getDay() - dowOffset;
					nday = nday >= 0 ? nday : nday + 7;
					/*if the next year starts before the middle of
					  the week, it is week #1 of that year*/
					weeknum = nday < 4 ? 1 : 53;
				}
			}
			else
			{
				weeknum = Math.floor((daynum + day - 1) / 7);
			}
			return weeknum;
		}
	};