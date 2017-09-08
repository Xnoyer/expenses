TreeNode = function (value)
{
	this.childs = [];
	this.value = value;
};

function Tree ()
{
	this.head = null;
}

function BinarySearchTree (min, max)
{
	this.tree = new Tree();
	
	var intervals = [{ start: min, end: max }],
		interval, midIndex, node;
	for (var i = 0; i < intervals.length; i++)
	{
		interval = intervals[i];
		midIndex = interval.start + Math.floor((interval.end - interval.start) / 2);
		node = new TreeNode(midIndex);
		if (interval.parent)
			interval.parent.childs.push(node);
		else
			this.tree.head = node;
		if (midIndex - interval.start > 1)
		{
			intervals.push({ start: interval.start, end: midIndex, parent: node });
			intervals.push({ start: midIndex + 1, end: interval.end, parent: node });
		}
	}
	
	this.getTree = function ()
	{
		return this.tree;
	}
}

function iterateTree (binaryTree)
{
	return _iterateNodesInner(binaryTree.getTree().head);
}

function _iterateNodesInner (node)
{
	var values = [];
	values.push(node.value);
	if (node.childs.length)
	{
		if (node.childs[0])
			values = values.concat(_iterateNodesInner(node.childs[0]));
		if (node.childs[1])
			values = values.concat(_iterateNodesInner(node.childs[1]));
	}
	return values;
}