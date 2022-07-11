/**
 * Fonction qui fait la gestion des propriétés css pour l'affichage en grille/liste.
 */
(function toggleView() {
    let elGridView = document.querySelector("button.grid-view"),
        elListView = document.querySelector("button.list-view");

    elListView.addEventListener("click", function() {
        if (!elListView.classList.contains("active")) {
            elListView.classList.add("active");
            elGridView.classList.remove("active");

            let elAuctions = document.querySelector(".auctions");
            elAuctions.style.setProperty("display", "flex");
            elAuctions.style.setProperty("flex-direction", "column");

            let elAuctionTiles = document.querySelectorAll(".auction-tile");
            elAuctionTiles.forEach(function(elAuctionTile) {
                let elDetails = elAuctionTile.querySelector(".auction-tile__details");
                elAuctionTile.style.setProperty("flex-direction", "row");
                elDetails.style.setProperty("flex-basis", "50ch");
            });

            let elAuctionWrapper = document.querySelectorAll(".auction-tile__img-wrapper");
            elAuctionWrapper.forEach(function(wrapper) {
                wrapper.style.setProperty("width", "20vw");
                wrapper.style.setProperty("flex-shrink", "0");
            });
        }
    })

    elGridView.addEventListener("click", function() {
        if (!elGridView.classList.contains("active")) {
            elGridView.classList.add("active");
            elListView.classList.remove("active");

            let elAuctions = document.querySelector(".auctions");
            elAuctions.style.setProperty("display", "grid");
            elAuctions.style.removeProperty("flex-direction");
            
            let elAuctionTiles = document.querySelectorAll(".auction-tile");
            elAuctionTiles.forEach(function(elAuctionTile) {
                let elDetails = elAuctionTile.querySelector(".auction-tile__details");
                elAuctionTile.style.setProperty("flex-direction", "column");
                elDetails.style.removeProperty("flex-basis");
            });

            let elAuctionWrapper = document.querySelectorAll(".auction-tile__img-wrapper");
            elAuctionWrapper.forEach(function(wrapper) {
                wrapper.style.removeProperty("width", "20vw");
                wrapper.style.removeProperty("flex-shrink", "0");
            });
        }
    });
})()
