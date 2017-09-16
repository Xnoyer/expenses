function largestSum (arr)
{
	var res = arr[0],
		left_bound = 0, right_bound = 0,
		sum = 0, current_sum,
		min_sum = 0, min_pos = -1;
	for (var i = 1; i <= arr.length; i++)
	{
		//sum is a sum of all elements from first to current
		sum += arr[i];
		
		//current_sum is a sum from start of last grow interval
		current_sum = sum - min_sum;
		if (current_sum > res)
		{
			//just update result, correct bounds and continue
			res = current_sum;
			left_bound = min_pos + 1;
			right_bound = i;
		}
		
		if (sum < min_sum)
		{
			// if total sum is less than minimal one, remember this sum and move
			//min_pos cursor here (after this point array may start to grow up)
			min_sum = sum;
			min_pos = i;
		}
	}
	return {Sum: res, Bounds: [left_bound, right_bound]};
}