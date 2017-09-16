function sortedMerge (arr1, arr2)
{
	var firstEmptyElement = -1, i;
	for (i = 0; i < arr1.length; i++)
	{
		if (arr1[i] === undefined)
		{
			firstEmptyElement = i;
			break;
		}
	}
	
	for (i = 0; i < arr2.length; i++)
	{
		if (arr1.length === i + firstEmptyElement)
			throw new Error("")
		arr1[i + firstEmptyElement] = arr2[i];
	}
	arr1.sort(function (a, b)
	{
		return a - b;
	});
	return arr1;
}