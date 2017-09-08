//Enum
CardSuit = ["Spades", "Clubs", "Hearts", "Diamonds"];

CardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

Card = function (suit, face)
{
	this.suit = suit;
	this.face = face;
	this.value = null;
};

Card.prototype.toString = function ()
{
	return CardFace[this.face] + " of " + CardSuit[this.suit];
};

CardDeck = function (numOfFullDecks, shortDeck)
{
	this.cards = [];
	this.isShort = !!shortDeck;
	this.init(numOfFullDecks);
};

CardDeck.prototype.init = function (fullDecks)
{
	var card;
	fullDecks = fullDecks || 1;
	for (var i = 0; i < fullDecks; i++)
	{
		for (var suit = 0; suit < CardSuit.length; suit++)
		{
			for (var face = this.isShort ? 4 : 0; face < CardFace.length; face++)
			{
				card = new Card(suit, face);
				this.cards.push(card);
			}
		}
	}
};

CardDeck.prototype.getTopCard = function (remove)
{
	return remove ? this.cards.splice(this.cards.length - 1, 1) : this.cards[this.cards.length - 1];
};

CardDeck.prototype.getRandomCard = function (remove)
{
	var index = Math.floor(Math.random() * this.cards.length);
	return remove ? this.cards.splice(index, 1) : this.cards[index];
};

CardDeck.prototype.shuffle = function ()
{
	this.cards.sort(function ()
	{
		return Math.random() - Math.random();
	});
};

CardDeck.prototype.toString = function ()
{
	var ret = "";
	for (var i = 0; i < this.cards.length; i++)
	{
		ret += this.cards[i].toString();
		if (i < this.cards.length - 1)
			ret += ", ";
	}
	return ret;
};

/*
* For blackjack we need randomly sorted card deck of x normal decks
* We need a Hand class to handle player's hand
*
* Also card already has a value vield for calculating needs
* Deck has methods to get top or random card from it with or without removing selected card
*
* BlackJack as a game class should handle single card deck, all player hands and dealer hand, shuffle cards, deal cards to players and calculate hands and game situation
* */

