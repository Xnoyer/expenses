function findLongestWord (wordArr)
{
	var word, pos, subWord, lastSubWord,
		longest, indeex;
	
	for (var i = 0; i < wordArr.length; i++)
	{
		word = wordArr[i];
		pos = 0;
		lastSubWord = undefined;
		while (true)
		{
			for (var s = pos; s < word.length; s++)
			{
				subWord = word.substring(pos, s + 1);
				index = wordArr.indexOf(subWord);
				if (index > -1 && index !== i)
				{
					if (!lastSubWord || lastSubWord.length < subWord.length)
						lastSubWord = subWord;
				}
			}
			if (lastSubWord)
			{
				pos += lastSubWord.length;
				lastSubWord = undefined;
				if (pos === word.length)
				{
					if (!longest || longest.length < word.length)
						longest = word;
					break;
				}
			}
			else
				break;
		}
	}
	return longest;
}