function Node (data)
{
	this.data = data;
	this.next = null;
}

function LinkedList ()
{
	this.head = null;
	
	this.createNode = function (data)
	{
		return new Node(data);
	};
	
	this.sortedInsert = function (node)
	{
		if (node.data == null)
			return;
		if (!this.head)
		{
			//if list is empty
			//make node the head of it
			this.head = node;
			return;
		}
		if (node.data < this.head.data)
		{
			//if node value less than first element
			//make it first
			node.next = this.head;
			this.head = node;
			return;
		}
		if (!this.head.next)
		{
			//if list contains 1 element and value greater or equal head
			this.head.next = node;
			return;
		}
		var pointer = this.head;
		while (pointer.next)
		{
			if (pointer.next.data > node.data)
			{
				node.next = pointer.next;
				pointer.next = node;
				return;
			}
			else
				pointer = pointer.next;
		}
		//strike the end, node has the greatest value
		pointer.next = node;
	}
}