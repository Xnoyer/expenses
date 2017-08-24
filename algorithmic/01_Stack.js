function Stack()
{
	//Stack is a simple object with own collection, managed by rule
	//last in - first out
	//here we'll not use any of JS array methods
	
	this._elements = [];
	this._topIndex = -1;
}

/* *
 * push method
 * allows to push any element on top of the stack
 * inner index will be increased to point on top element of the stack
 */
Stack.prototype.push = function (element)
{
	this._topIndex++;
	this._elements[this._topIndex] = element;
	return this._topIndex;
};

/* *
 * pop method
 * allows to get element from top of the stack
 * element will be removed from stack, stack size will be decreased,
 * inner index will be decreased to point on top element of the stack
 */
Stack.prototype.pop = function ()
{
	if(this._topIndex === -1)
		throw new Error("Stack is empty, call hasElements to ensure stack in not empty");
	var element = this._elements[this._topIndex];
	//this operation only remove element from array and will not decrease it's size
	//in simple situation it doesn't matter but potentially it may produce memory issues
	delete this._elements[this._topIndex--];
	//JS allows to decrease size of array - we'll use this ability to keep array length correct
	this._elements.length--;
	return element;
};

/* *
 * hasElements method
 * should be used before popping an element from stack to avoid popping from empty stack
 * based on inner index, it must not be below zero
 */
Stack.prototype.hasElements = function ()
{
	return this._topIndex >= 0;
};

/* *
 * getSize method
 * returns size of stack
 * based on inner index, as we know index is starting with 0, so we must add 1 and return
 */
Stack.prototype.getSize = function ()
{
	return this._topIndex + 1;
};