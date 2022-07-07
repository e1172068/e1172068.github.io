// Mécaniques de jeu communes à tous les joueurs :
// - joueur suivant ;
// - comportements en fin de la partie.


import Deck from "./Deck.js";

export default class Game {
    constructor() {
        this.deck = new Deck; 
    }

    nextPlayer(currentPlayer) {
        if (this.total > 21) {
            this.el.classList.add("busted");
            this.displayLoserImg(this.el);
            new Audio("./assets/sounds/disappointed-crowd.mp3").play();
        }

        let playerCount = this.elParent.querySelectorAll("[data-js-player]").length;
        let bustedPlayers = this.elParent.querySelectorAll(".busted");
        let stoppedPlayers = this.elParent.querySelectorAll(".stopped");
        let nextPlayer = currentPlayer.nextElementSibling || this.elParent.firstElementChild;

        if (bustedPlayers.length + stoppedPlayers.length == playerCount) {
            this.endGame();
        } else {
            this.toggleActive(currentPlayer, false);
            while(this.canPlay(nextPlayer) == false) {
                nextPlayer = nextPlayer.nextElementSibling || this.elParent.firstElementChild;
            }
            this.toggleActive(nextPlayer, true);
        }
    }        

    canPlay(player) {
        return (!(player.classList.contains("busted") || player.classList.contains("stopped")));
    }

    toggleActive(player, bool) {
        if (bool) {
            player.classList.remove("inactive");
            player.classList.add("active");
            player.querySelector("[data-js-img='active']").style.display = "block";
            player.querySelector("[data-js-img='inactive']").style.display = "none";
        } else {
            player.classList.remove("active");
            player.classList.add("inactive");
            if (!player.classList.contains("busted")) {
                player.querySelector("[data-js-img='inactive']").style.display = "block";
                player.querySelector("[data-js-img='active']").style.display = "none";
            }
            
        }
    }

    endGame() {
        let stoppedPlayers = this.elParent.querySelectorAll(".stopped");
        let elEndGame = document.querySelector("[data-js-endgame]");

        
        let nbParties = parseInt(sessionStorage.getItem("nbParties"));

        if (isNaN(nbParties)) {
            nbParties = 1;
        } else {
            nbParties++;
        }
        sessionStorage.setItem("nbParties", nbParties);


        if (stoppedPlayers.length == 1) {
            stoppedPlayers[0].classList.add("winner");
            new Audio("./assets/sounds/cheering-crowd.mp3").play();
            this.displayWinnerImg(stoppedPlayers[0]);
        } else if (stoppedPlayers.length > 1) {
            this.maxScore = 0;
            for (let i = 0; i < stoppedPlayers.length; i++) {
                let score = parseInt(stoppedPlayers[i].querySelector("[data-js-total]").innerText);
                if (score > this.maxScore) this.maxScore = score;
            }
            for (let player of stoppedPlayers) {
                let score = player.querySelector("[data-js-total]").innerText;
                if (score == this.maxScore) {
                    player.classList.add("winner");
                    new Audio("./assets/sounds/cheering-crowd.mp3").play();
                    this.displayWinnerImg(player);
                } else {
                    this.displayLoserImg(player);
                }
            }
        } else {
            elEndGame.insertAdjacentHTML("beforeend", "<p>Aucun gagnant, meilleure chance la prochaine fois.</p>");
            new Audio("./assets/sounds/booing-crowd.mp3").play();
        }
        


        let elEndGameDom = `
                        <div class="end-game">
                        <p>Nombre de parties jouées: ${nbParties}</p>
                        <button data-js-replay>Rejouer</button>
                        </div>
                        `
        elEndGame.insertAdjacentHTML("beforeend", elEndGameDom);


        let elBtnReplay = document.querySelector("[data-js-replay]"),
            elForm = document.querySelector("[data-js-form]"),
            elBoard = document.querySelector("[data-js-board]");
        
        elBtnReplay.addEventListener("click", function(e) {
            elForm.style.setProperty("display", "flex");
            elBoard.innerHTML = "";
            elEndGame.innerHTML = "";
        });
    }

    displayWinnerImg(player) {
        player.querySelector("[data-js-img='winner']").style.display = "block";
        player.querySelector("[data-js-img='inactive']").style.display = "none";
        player.querySelector("[data-js-img='active']").style.display = "none";
    }

    displayLoserImg(player) {
        player.querySelector("[data-js-img='loser']").style.display = "block";
        player.querySelector("[data-js-img='inactive']").style.display = "none";
        player.querySelector("[data-js-img='active']").style.display = "none";
    }
}