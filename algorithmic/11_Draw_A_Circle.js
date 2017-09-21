function drawCircle (r, node)
{
	var points = [];
	var x, y, i, j;
	
	//running for each point in rectangle 2r x 2r
	//checking that point distant of center belongs to a circle
	//if it is, put point to array
	
	for (i = 0; i < r * 2; i++)
	{
		x = r - i;
		for (j = 0; j < r * 2; j++)
		{
			y = j - r;
			//x and y are sides of a triangle and r is this triangle's hypotenuse
			if (x * x + y * y < r * r)
				points.push([x, y]);
		}
	}
	
	//also we can skip all points in a column except first and last to get shaped circle
	
	var canvas = document.createElement("canvas");
	node.appendChild(canvas);
	canvas.setAttribute("width", r * 3);
	canvas.setAttribute("height", r * 3);
	var ctx = canvas.getContext("2d");
	
	for (i = 0; i < points.length; i++)
	{
		ctx.rect(points[i][0] + r * 1.5, points[i][1] + r * 1.5, 1, 1);
	}
	ctx.stroke();
}