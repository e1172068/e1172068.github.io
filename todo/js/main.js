window.addEventListener("load", function() {
    
    /**
     * Gestionnaire de l'évènement click sur le bouton d'attribut name="ajouter" du formulaire d'attribut name="frm1".
     */
    frm1.ajouter.addEventListener("click", function(event) {
        if (frm1.tache.value.trim() != "") {
            ajouterTache(frm1.tache.value, frm1.importance.value);
        } else {
            msgErr.innerHTML = "Entrez un nom pour la tâche.";
        }
    });

    /**
     * Gestionnaire de l'évènement input sur le formulaire de tri d'attribut name="frm2".
     */
    frm2.addEventListener("input", function(event) {
        trier(event.target.value);
    });

    /**
     * Gestionnaire de l'évènement click sur la div d'attribut id="listeTaches" pour intercepter tous les clics sur cette div en exploitant event.target.
     */
    listeTaches.addEventListener("click", function(event) {
        
        if (event.target.classList.contains("detail")) {
            detail(event.target.parentElement.dataset.id);
        }
        else if (event.target.classList.contains("effacer")) {
            supprimer(event.target.parentElement.dataset.id);
        }
        else if (event.target.classList.contains("tache")) {
            statutTache(event.target);
        }
    });

    /**
     * Affiche le tableau tTaches dans la div id="listeTaches" en utilisant le template id="modeleListe".
     */
    function afficher() {
        let templateListe = document.getElementById("modeleListe");
        listeTaches.innerHTML = "";

        for (let i = 0; i < tTaches.length; i++) {
            let templateHTML = templateListe.innerHTML;
            templateHTML = templateHTML.replaceAll("{nom}", tTaches[i].nom);
            templateHTML = templateHTML.replaceAll("{id}", tTaches[i].id);    
            templateHTML = templateHTML.replaceAll("{fait}", tTaches[i].fait);    
            templateHTML = templateHTML.replaceAll("{importance}", tTaches[i].importance);    
            listeTaches.insertAdjacentHTML("beforeend", templateHTML);
        }
    }

    /**
     * Recharge le tableau tTaches stocké en LocalStorage s'il existe, sinon initialise le tableau tTaches vide.
     */
    function initialiser() {
        let tTaches = [];
        if (!(localStorage.getItem("tTaches") == null)) {
            let jsonTTaches = localStorage.getItem("tTaches");
            tTaches = JSON.parse(jsonTTaches);
        }
        return tTaches;
    }

    /**
     * Ajoute 0 devant un chiffre si il est inférieur à 9. Cette fonction sera utilisée afin de générer un affichage correct de la date et de l'heure.
     * @param {number} n
     */
    function ajouteZero(n) {
        return (n < 10) ? "0" + n : n;
    }

    /**
     * Ajoute objet litteral tache dans tableau tTaches, le stock dans localStorage et exécute la fonction afficher(). Format attendu: nouvelleTache = {"nom":"aaa","importance":"3","date":"21/04/2021, 15:41:05","id":1,"fait":false}
     * @param {string} nomTache
     * @param {number} importanceTache
     */
    function ajouterTache(nomTache, importanceTache) {
        let nouvelleTache = {};
        nouvelleTache.nom = nomTache;
        nouvelleTache.importance = importanceTache;
        let date = new Date();
        let dateFormattee = ajouteZero(date.getDate()) + "/" + ajouteZero(date.getMonth() + 1) + "/" + date.getFullYear() + ", " + ajouteZero(date.getHours()) + ":" + ajouteZero(date.getMinutes()) + ":" + ajouteZero(date.getSeconds());
        nouvelleTache.date = dateFormattee;

        let idNouvelleTache;
        if (!(localStorage.getItem("tTaches") == null)) {
            let idsTaches = []
            for (let i = 0; i < tTaches.length; i++) {
                idsTaches.push(tTaches[i].id); 
                idNouvelleTache = Math.max(...idsTaches) + 1;
            }
        } else {
            idNouvelleTache = 1; 
        }
        
        
        nouvelleTache.id = idNouvelleTache;
        nouvelleTache.fait = false;
        tTaches.push(nouvelleTache);
        let jsonTTaches = JSON.stringify(tTaches);
        localStorage.tTaches = jsonTTaches
        afficher();
    }

    /**
     * Supprime une tâche du tableau tTaches, prends en paramètre le id de la tâche à supprimer.
     * @param {number} idChoisi
     */

    function supprimer(idChoisi) {
        let jsonTTaches = localStorage.getItem("tTaches");
        tTaches = JSON.parse(jsonTTaches);
        let ligneChoisie = tTaches.find(element => element.id == idChoisi);
        let indexChoisi = tTaches.indexOf(ligneChoisie);
        tTaches.splice(indexChoisi, 1);
        jsonTTaches = JSON.stringify(tTaches);
        localStorage.tTaches = jsonTTaches;
        afficher();
    }

    /**
     * Affiche les détails concernant la tâche choisie
     * @param {number} idChoisi
     */

    function detail(idChoisi) {
        let fenetreDetail = document.getElementById('modale');
        fenetreDetail.innerHTML = "";
        

        let jsonTTaches = localStorage.getItem("tTaches");
        tTaches = JSON.parse(jsonTTaches);
        let ligneChoisie = tTaches.find(element => element.id == idChoisi);

        let templateDetail = document.getElementById("modeleDetail");
        let templateHTML = templateDetail.innerHTML;
        templateHTML = templateHTML.replaceAll("{nom}", ligneChoisie.nom);
        templateHTML = templateHTML.replaceAll("{id}", ligneChoisie.id);    
        templateHTML = templateHTML.replaceAll("{fait}", ligneChoisie.fait);    
        templateHTML = templateHTML.replaceAll("{importance}", ligneChoisie.importance);    
        templateHTML = templateHTML.replaceAll("{date}", ligneChoisie.date);    
        fenetreDetail.insertAdjacentHTML("beforeend", templateHTML);

        fenetreDetail.showModal();
    }



    /**
     * Effectue le tri du tableau tTaches en fonction de l'option envoyée en paramètre, puis affiche le tableau tTaches à nouveau.
     * @param {string} typeTri 
     */
    function trier(typeTri) {
        
        let jsonTTaches = localStorage.getItem("tTaches");
        tTaches = JSON.parse(jsonTTaches);
        
        switch (typeTri) {
            case "nom/importance":
                tTaches.sort(
                    function(a, b) {
                        if (a.nom == b.nom) {
                            return a.importance - b.importance;
                        } else {
                            return a.nom < b.nom ? -1 : 1;
                        }
                    }
                );
                break;
            case "importance/nom":
                tTaches.sort(
                    function(a, b) {
                        if (a.importance == b.importance) {
                            return a.nom < b.nom ? -1 : 1;
                        } else {
                            return a.importance - b.importance;
                        }
                    }
                );
                break;
        }

        jsonTTaches = JSON.stringify(tTaches);
        localStorage.tTaches = jsonTTaches;
        afficher();
    }


    function statutTache(tache) {
        let jsonTTaches = localStorage.getItem("tTaches");
        tTaches = JSON.parse(jsonTTaches);
        idChoisi = tache.dataset.id;
        let ligneChoisie = tTaches.find(element => element.id == idChoisi);
        let indexChoisi = tTaches.indexOf(ligneChoisie);

        if (tache.dataset.fait == "true") {
            tache.dataset.fait = "false";
            tTaches[indexChoisi].fait = false;
        } else {
            tache.dataset.fait = "true";
            tTaches[indexChoisi].fait = true;
        }

        jsonTTaches = JSON.stringify(tTaches);
        localStorage.tTaches = jsonTTaches;
        afficher();

    }

    tTaches = initialiser();
    afficher();
});
