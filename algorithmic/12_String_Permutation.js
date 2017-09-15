function checkStringPermutation (first, second)
{
	//assume all characters in strings is important
	
	if (first.length !== second.length)
		return false;
	
	var sortedFirst = ((first.split("")).sort()).join(""),
		sortedSecond = ((second.split("")).sort()).join("");
	return sortedFirst === sortedSecond;
}