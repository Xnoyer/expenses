function NameResolver (synonyms)
{
	realNames = {};
	for (var i = 0; i < synonyms.length; i++)
	{
		if (!realNames[synonyms[i][0]] && !realNames[synonyms[i][1]])
		{
			realNames[synonyms[i][0]] = synonyms[i][0];
			realNames[synonyms[i][1]] = synonyms[i][0];
		}
		else
		{
			if (realNames[synonyms[i][0]])
				realNames[synonyms[i][1]] = realNames[synonyms[i][0]];
			else
				realNames[synonyms[i][0]] = realNames[synonyms[i][1]];
		}
	}
	
	NameResolver.prototype.parseNames = function (namesObj)
	{
		var ret = {}, realName;
		for (var name in namesObj)
		{
			if (!namesObj.hasOwnProperty(name))
				continue;
			realName = realNames[name] || name;
			if (!ret[realName])
				ret[realName] = namesObj[name]; //value
			else
				ret[realName] += namesObj[name]; //value
		}
		return ret;
	}
}