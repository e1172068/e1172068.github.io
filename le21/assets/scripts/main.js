// Traite le formulaire initial.
// Lance le jeu (classe Board).


import Board from "./Board.js";

window.addEventListener("load", function() {
    let elForm = document.querySelector("[data-js-form]");
    let elInput = elForm.querySelector("input");
    let elStartBtn = elForm.querySelector("[data-js-start]");
    var music = new Audio("./assets/sounds/elevator-music.mp3");
    music.loop = true;

    // Si l'usager a entré une valeur plus grande que 0 pour le nombre de joueur, le bouton pour démarrer la partie est enabled.
    elInput.addEventListener("input", function() {
        if (elInput.value > 0) {
            if (elStartBtn.disabled == true) elStartBtn.disabled = false;
        }
    });

    // Au clic sur le bouton start, cacher le formulaire et instancier un Board.
    elStartBtn.addEventListener("click", function(e) {
        e.preventDefault();
        elForm.style.setProperty("display", "none");
        new Board(elInput.value);
        
        music.currentTime = 0;
        music.play();
    });
});