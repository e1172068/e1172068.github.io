// Détails de la carte tirée.

export default class Deck {
    constructor() {
        this.deck = [];
        this.suits = ["♠", "♥", "♦", "♣"];
        this.numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        this.init(); 
    }

    init() {
        this.buildDeck();
    }

    buildDeck() {
        this.suits.forEach(function(suit) {
            this.numbers.forEach(function(number) {
                const card = {suit: suit, number: number};
                this.deck.push(card);
            }.bind(this));
        }.bind(this));
    }

    drawCard() {
        const random = Math.floor(Math.random() * this.deck.length);
        const cardDrawn = this.deck[random];
        this.deck.splice(random, 1);
        return cardDrawn;
    }
}
