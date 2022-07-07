// Créer le DOM de chaque joueur selon le nombre reçu.
// Chaque joueur instancie la classe Player.

import Player from "./Player.js";
import Deck from "./Deck.js";
import { imgActivePlayer, imgInactivePlayer, imgWinner, imgLoser } from "./avatars.js";


export default class Board {
    constructor(playerCount) {
        this.elBoard = document.querySelector("[data-js-board]")
        this.playerCount = playerCount;
        this.deck = new Deck;
        this.init();
    }

    init() {
        for (let i = 1; i <= this.playerCount; i++) {
            this.addPlayer(i);            
        }
    }

    //<img class="player__img" src="./assets/img/joueur-inactif"></img>

    addPlayer(player) {
        let playerDOM = `
                    <div class="player ${player != 1 ? "inactive": "active"}" data-js-player>
                        <div class="player__wrapper">
                            <h2>Joueur ${player}</h2>

                                <span data-js-img = "active" style="display: none;">${imgActivePlayer}</span>
                                <span data-js-img = "inactive" style="display: none;">${imgInactivePlayer}</span>
                                <span data-js-img = "winner" style="display: none;">${imgWinner}</span>
                                <span data-js-img = "loser" style="display: none;">${imgLoser}</span>

                            <p>Total: <span data-js-total>0</span></p>
                            <div>
                                <button class="btn" data-js-btn="draw">Jouer</button>
                                <button class="btn" data-js-btn="stop">Arrêter</button>
                            </div>
                            </div>
                            <p class="player__board" data-js-cards></p>
                        </div>
                        `
        this.elBoard.insertAdjacentHTML("beforeend", playerDOM);

        let newPlayer = this.elBoard.lastElementChild;
        
        if (player == 1) {
            newPlayer.querySelector("[data-js-img='active']").style.display = "block";
        } else {
            newPlayer.querySelector("[data-js-img='inactive']").style.display = "block";
        }

        let newPlayerImgs = newPlayer.querySelectorAll("path");
        let newPlayerColor = this.randomColor();
        newPlayerImgs.forEach(function(newPlayerImg) {
            newPlayerImg.style.fill = newPlayerColor;
        }.bind(this));
        
        new Player(newPlayer, this.deck);

    }

    /**
     * Génère et retourne une couleur aléatoire.
     */
    randomColor() {
        let randomHexColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomHexColor;
    }
}
                