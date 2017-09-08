function getCubeEquals ()
{
	/*
	* (a^3 + b^3 === c^3 + d^3)?
	*
	* First statement is when all 4 numbers is equal (1, 1, 1, 1), the sums are equal
	* (1^3 + 1^3) === (1^3 + 1^3) | (1 + 1) === (1 + 1) | 1 === 1
	*
	* If b will be 2, the left sum will increase to 9 (1^3 + 2^3) === (1 + 8) === 9
	* To correspond this value, the right sum must be 9
	* The cube of 3 is 27 which is bigget than target sum,
	* so the right sum can only consist 1^3 and 2^3,
	* and the next statement is when left sum has same values as the right one (with rearrangement too), the sums are equal
	* (4^3 + 6^3) === (6^3 = 4^3) | (64 + 216) === (216 = 64) | 280 === 280
	*
	* The final statement is there is no cube which can be represented by 2 cubes
	* each cube (a^3) differs from previous one ((a-1)^3) by ((a-1)^2 + a * (a-1)^2 + a^2)
	* which cannot be represented as any cube or be combined to represent a cube.
	*
	* So the only possible variant is when left sum has some numbers as the right one with rearrangement
	*
	* */
	
	//It is not so good idea to display all combinations from 1 to 1000, so printing from 1 to 10
	var ret = "";
	for (var a = 1; a <= 10; a++)
	{
		for (var b = 1; b <= 10; b++)
		{
			ret += a + "^3 + " + b + "^3 = " + a + "^3 + " + b + "^3<br/>";
			if (a !== b)
				ret += a + "^3 + " + b + "^3 = " + b + "^3 + " + a + "^3<br/>";
		}
	}
	return ret;
}