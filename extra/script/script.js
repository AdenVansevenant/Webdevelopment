const setup = () => {
    const movielist = document.getElementById("movielist"); // Selecteert de div waar de films in komen
    const likeBar = document.getElementById("likebar"); // Selecteert de sidebar met gelikete films
    const likeBarMovies = document.getElementById("likebarmovies"); // Container voor individuele gelikete films
    const likeCounter = document.getElementById("like"); // Element dat het aantal likes toont
    const dislikeCounter = document.getElementById("dislike"); // Element dat het aantal dislikes toont

    let likeCount = 0; // Houdt bij hoeveel films geliket zijn
    let dislikeCount = 0; // Houdt bij hoeveel films gedisliket zijn
    const likedMovies = {}; // array om gelikete films op te slaan
    const dislikedMovies = {}; // array om gedislikete films op te slaan

    const UpdateTeller = () => {
        likeCounter.textContent = likeCount; // Update de like teller
        dislikeCounter.textContent = dislikeCount; // Update de dislike teller
        if (likeCount > 0) {
            likeBar.style.visibility = "visible"; // Sidebar tonen als er likes zijn
        } else {
            likeBar.style.visibility = "hidden"; // Sidebar verbergen als er geen likes zijn
        }
    };

    const removeFromLikeBar = (id) => { // Verwijdert een film uit de likeBar
        const el = document.getElementById("liked-" + id); // Zoekt het juiste element
        if (el) {
            el.remove(); // Verwijdert het element uit de DOM
        }
    };

    const addToLikeBar = (movie) => { // Voegt een film toe aan de likeBar
        const movieDiv = document.createElement("div"); // Container voor de gelikete film
        movieDiv.className = "liked-movie"; // CSS klasse voor styling
        movieDiv.id = "liked-" + movie.id; // Uniek ID gebaseerd op movie.id

        const title = document.createElement("span"); // Titel van de film
        title.textContent = movie.title;

        const trash = document.createElement("i"); // Vuilbakicoon voor verwijderen
        trash.className = "fas fa-trash";
        trash.addEventListener("click", () => { // Bij klikken op vuilbakje:

            delete likedMovies[movie.id]; // Verwijder uit gelikete lijst
            likeCount--; // Aantal likes verlagen
            document.getElementById("liked-" + movie.id).remove(); // Element verwijderen uit de sidebar

            const movieEls = movielist.getElementsByClassName("movie"); // Zoek de juiste film in de hoofdlijst
            for (let j = 0; j < movieEls.length; j++) {
                const el = movieEls[j];
                const h2 = el.querySelector("h2");
                if (h2 && h2.textContent === movie.title) {
                    const likeIcon = el.querySelector(".fa-thumbs-up"); // Vind de like-knop
                    if (likeIcon) likeIcon.style.color = "gray"; // Zet kleur terug naar grijs
                }
            }

            UpdateTeller(); // Tellers bijwerken
        });

        movieDiv.appendChild(title); // Voeg titel toe
        movieDiv.appendChild(trash); // Voeg vuilbakje toe
        likeBarMovies.appendChild(movieDiv); // Voeg alles toe aan de sidebar
    };

    const createMovieElement = (movie) => { // Maakt het HTML-element voor een film aan
        const container = document.createElement("div"); // Container voor de film
        container.className = "movie"; // CSS klasse voor layout

        const title = document.createElement("h2"); // Titel van de film
        title.textContent = movie.title;
        title.style.gridArea = "title"; // Layout in grid

        const buttonContainer = document.createElement("div"); // Container voor like/dislike knoppen
        buttonContainer.style.gridArea = "buttons";

        const likeButton = document.createElement("i"); // Like-knop (icoon)
        likeButton.className = "fas fa-thumbs-up";
        likeButton.style.cursor = "pointer";
        likeButton.style.color = "gray";

        const dislikeButton = document.createElement("i"); // Dislike-knop (icoon)
        dislikeButton.className = "fas fa-thumbs-down";
        dislikeButton.style.cursor = "pointer";
        dislikeButton.style.color = "gray";

        buttonContainer.appendChild(likeButton); // Voeg like-knop toe
        buttonContainer.appendChild(dislikeButton); // Voeg dislike-knop toe

        const image = document.createElement("img"); // Film afbeelding
        image.src = movie.imageUrl;
        image.alt = movie.title;
        image.style.gridArea = "image";
        image.style.width = "150px";

        const desc = document.createElement("p"); // Omschrijving van de film
        desc.textContent = movie.description;
        desc.style.gridArea = "description";

        likeButton.addEventListener("click", () => { // Als gebruiker op like klikt
            const isLiked = likedMovies[movie.id]; // Check of hij al geliket is

            if (isLiked) {
                delete likedMovies[movie.id]; // Verwijder uit lijst
                likeCount--;
                likeButton.style.color = "gray"; // Zet kleur terug
                removeFromLikeBar(movie.id); // Verwijder uit sidebar
            } else {
                likedMovies[movie.id] = movie; // Voeg toe aan gelikete films
                likeCount++;
                likeButton.style.color = "green"; // Kleur knop groen
                addToLikeBar(movie); // Voeg toe aan sidebar

                if (dislikedMovies[movie.id]) { // Als hij eerder gedisliket was
                    delete dislikedMovies[movie.id]; // Verwijder uit dislikes
                    dislikeCount--;
                    dislikeButton.style.color = "gray"; // Reset dislike knop
                }
            }

            UpdateTeller(); // Update tellers
        });

        dislikeButton.addEventListener("click", () => { // Als gebruiker op dislike klikt
            const isDisliked = dislikedMovies[movie.id];

            if (isDisliked) {
                delete dislikedMovies[movie.id]; // Verwijder uit dislikes
                dislikeCount--;
                dislikeButton.style.color = "gray";
            } else {
                dislikedMovies[movie.id] = true;
                dislikeCount++;
                dislikeButton.style.color = "red"; // Maak knop rood

                if (likedMovies[movie.id]) { // Als hij al geliket was
                    delete likedMovies[movie.id];
                    likeCount--;
                    likeButton.style.color = "gray"; // Reset like knop
                    removeFromLikeBar(movie.id); // Verwijder uit sidebar
                }
            }

            UpdateTeller(); // Update tellers
        });

        container.appendChild(title); // Voeg titel toe aan de filmkaart
        container.appendChild(buttonContainer); // Voeg knoppen toe
        container.appendChild(image); // Voeg afbeelding toe
        container.appendChild(desc); // Voeg beschrijving toe

        return container; // Geef het volledig film element terug
    };

    for (let i = 0; i < movies.length; i++) { // Voor elke film in de lijst
        const movieElement = createMovieElement(movies[i]); // Maak het filmbox-element aan
        movielist.appendChild(movieElement); // Voeg toe aan de hoofdlijst op de pagina
    }

    UpdateTeller(); // Zorg dat de juiste tellers & sidebarstatus bij start juist staan
};

window.addEventListener("load", setup); // Start alles wanneer de pagina geladen is
