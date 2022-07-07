// Mécanique de chaque joueur individuellement.
// Hérite de la classe Game.
// Gestion du cas ‘Jouer‘, plus précisément :
// - tirage d’une carte (classe Card) ;
// - affichage de la carte ;
// - gestion du pointage et l’état du joueur.
// Gestion du cas ‘Stop‘.

import Game from "./Game.js";

export default class Player extends Game {
    constructor(el, deck) {
        super();
        this.boardDeck = deck;
        this.el = el;
        this.elBtns = this.el.querySelectorAll("[data-js-btn]");
        this.elParent = this.el.closest("[data-js-board]");
        this.elTotal = this.el.querySelector("[data-js-total]");
        this.elCards = this.el.querySelector("[data-js-cards]");

        this.total = parseInt(this.elTotal.innerText);

        this.init()
    }

    init() {
        for (const elBtn of this.elBtns) {
            elBtn.addEventListener("click", function(e) {
                if(e.target.dataset.jsBtn == "draw") {
                    this.drawNewCard();
                    this.nextPlayer(this.el);
                }
                if(e.target.dataset.jsBtn == "stop") {
                    this.el.classList.add("stopped");
                    this.stoppedPlayers += 1;
                    this.nextPlayer(this.el);
                }
            }.bind(this));
        }
    }

    drawNewCard() {        
        let newCard = this.boardDeck.drawCard();

        let newCardColor;

        if (newCard.suit == "♥" || newCard.suit == "♦") {
            newCardColor = "red"
        } else {
            newCardColor = "black";
        }

        let cardDom = `
                    <div class="card" style="color:${newCardColor};"> 
                        <span class="card__number card__number--top-left">${newCard.number}</span>
                        <span class="card__suit">${newCard.suit}</span>
                        <span class="card__number card__number--bottom-right">${newCard.number}</span>
                    </div>
                    `
        this.elCards.insertAdjacentHTML("beforeend", cardDom);

        

        switch (newCard.number) {
            case "A":
                this.total = 11 + this.total;
                this.elTotal.innerText = this.total;
                break;
            case "J":
            case "Q":
            case "K":
                this.total = 10 + this.total;
                this.elTotal.innerText = this.total;
                break;
            default:
                this.total = parseInt(newCard.number) + this.total;
                this.elTotal.innerText = this.total;
                break;
        }

        new Audio("./assets/sounds/flip-card.mp3").play();

    }
}


