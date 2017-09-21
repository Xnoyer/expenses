//We'll use tree from task 04

function maxHeightOfTree (tree)
{
	var h = 0;
	if (!tree.childs.length)
		return h;
	
	//the iteration will be similiar to task 04 (counter clockwise)
	return _iterateNodesHeightInner(tree, h);
}

function _iterateNodesHeightInner (node, l)
{
	var a, b;
	l++;
	if (node.childs.length)
	{
		if (node.childs[0])
			a = _iterateNodesHeightInner(node.childs[0], l);
		else
			a = l;
		if (node.childs[1])
			b = _iterateNodesHeightInner(node.childs[1], l);
		else
			b = l;
		return Math.max(a, b);
	}
	else
		return l;
}