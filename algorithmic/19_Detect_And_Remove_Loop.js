//We'll use tree nodes from task 03

function detectAndRemoveLoop (list)
{
	if (!list.next)
		return false;
	var flat = [list];
	while (list.next)
	{
		if (flat.indexOf(list.next) > -1)
		{
			list.next = null;
			return true; //if last node link to next will be null, this will be end of list anyway
		}
		flat.push(list.next);
		list = list.next;
	}
}