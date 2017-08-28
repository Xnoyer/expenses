
function binarySearch(array, target)
{
	var startIndex = 0,
		endIndex = array.length;
	
	//each iteration of cycle we should logically split array by half and select
	//appropriate half (probably) with target value
	while (true)
	{
		var midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
		
		if (array[midIndex] === target)
			return midIndex;
		
		if (endIndex === startIndex)
			return -1;
		
		if (array[midIndex] < target)
			startIndex = midIndex + 1;
		else
			endIndex = midIndex;
	}
}