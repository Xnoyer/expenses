function findCommon (arr1, arr2)
{
	var numSort = function (a, b)
	{
		return a - b;
	};
	var struct = [
		{ arr: arr1.sort(numSort), i: 0 },
		{ arr: arr2.sort(numSort), i: 0 }
	];
	var common = [], i = 0, cursor, opposite;
	
	while (true)
	{
		//Find first different element and set array with greater element as current
		if (struct[0].arr[i] === struct[1].arr[i])
			common.push(struct[0].arr[i++]);
		else
		{
			cursor = struct[0].arr[i] > struct[1].arr[i] ? 0 : 1;
			opposite = Math.abs(cursor - 1);
			struct[cursor].i = i;
			struct[opposite].i = ++i;
			break;
		}
	}
	
	while (true)
	{
		var ci = struct[cursor].i,
			cur = struct[cursor].arr[ci],
			oi = struct[opposite].i,
			opp = struct[opposite].arr[oi];
		if (opp === cur)
		{
			common.push(cur);
			struct[cursor].i++;
			struct[opposite].i++;
			if (ci === struct[cursor].arr.length - 1)
				break;
			continue;
		}
		if (opp > cur)
		{
			struct[cursor].i++;
			cursor = Math.abs(cursor - 1);
			opposite = Math.abs(cursor - 1);
			continue;
		}
		struct[opposite].i++;
		if (ci === struct[cursor].arr.length - 1)
			break;
	}
	return common;
}
