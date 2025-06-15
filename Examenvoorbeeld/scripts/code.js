const quizData = [
    {
        question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
        answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
        correct: "Cloud Strife",
        selected: ""
    },
    {
        question: "Welke wereld wordt verkend in Final Fantasy XV?",
        answers: ["Gaia", "Eos", "Spira", "Cocoon"],
        correct: "Eos",
        selected: ""
    },
    {
        question: "Wie is de antagonist in Final Fantasy VIII?",
        answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
        correct: "Ultimecia",
        selected: ""
    },
    {
        question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
        answers: ["Ja", "Nee"],
        correct: "Ja",
        selected: ""
    },
    {
        question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
        answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
        correct: "Midgar",
        selected: ""
    },
    {
        question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
        answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
        correct: "Ifrit",
        selected: ""
    },
    {
        question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
        answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
        correct: "Ragnarok",
        selected: ""
    },
    {
        question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
        answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
        correct: "Luchtschipkapitein",
        selected: ""
    },
    {
        question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
        answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
        correct: "Ze gebruiken de aanval 1000 Needles",
        selected: ""
    },
    {
        question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
        answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
        correct: "Malboro",
        selected: ""
    }
];


let currentQuestionIndex = 0; // Houdt bij welke vraag momenteel actief is
let juisteAntwoorden = 0; // Aantal correcte antwoorden tot nu toe

const setup = () => { // Functie die uitgevoerd wordt als de pagina geladen is
    document.getElementById("start").addEventListener("click", Startspel); // Startknop activeert Startspel
    document.getElementById("submit").addEventListener("click", () => { // Submitknop om score op te slaan
        const scoreText = `Je score: ${juisteAntwoorden} van ${quizData.length}`; // Tekst met eindscore
        const footer = document.getElementById("highscores"); // Footer waar score getoond wordt
        const scoreElement = document.createElement("p"); // Nieuw paragraafelement maken
        scoreElement.innerText = scoreText; // Score erin zetten
        footer.appendChild(scoreElement); // Toevoegen aan DOM

        let scores = JSON.parse(localStorage.getItem("quizScores")) || []; // Scores ophalen uit localStorage of nieuwe lijst maken
        scores.push(scoreText); // Nieuwe score toevoegen
        localStorage.setItem("quizScores", JSON.stringify(scores)); // Scores terug opslaan
    });

    // Knop om antwoord te controleren
    document.querySelector("#quiz > div.col-10 > div > div.card-footer > button")
        .addEventListener("click", checkAntwoord); // Koppelt de checkknop aan functie

    // Resetknop opnieuw spel starten
    document.getElementById("reset").addEventListener("click", reset); // Resetknop activeert reset()

    // Reeds opgeslagen scores tonen bij opstart
    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || []; // Scores ophalen
    const footer = document.getElementById("highscores"); // Element voor highscores
    savedScores.forEach(scoreText => { // Elke score tonen in de footer
        const scoreElement = document.createElement("p"); // Nieuw paragraaf element
        scoreElement.innerText = scoreText; // Tekst erin
        footer.appendChild(scoreElement); // Toevoegen aan pagina
    });
};

const Startspel = () => { // Start het spel
    document.getElementById("started").innerText = new Date().toLocaleTimeString(); // Toon starttijd
    document.getElementById("start").parentElement.classList.add("d-none"); // Verberg startknop
    document.getElementById("quiz").classList.remove("d-none"); // Toon quizdeel

    const questionList = document.getElementById("questions"); // Element waar vraagnummers komen
    questionList.innerText = ""; // Leegmaken voor nieuwe opbouw

    quizData.forEach((vraag, index) => { // Voor elke vraag:
        const li = document.createElement("li"); // Nieuw lijstitem maken
        li.className = "list-group-item list-group-item-action"; // Bootstrap klassen
        li.innerText = `Vraag ${index + 1}`; // Vraagnummer tonen
        li.style.cursor = "pointer"; // Maak klikbaar
        li.addEventListener("click", () => toonvraag(index)); // Klik toont die vraag
        questionList.appendChild(li); // Toevoegen aan lijst
    });

    toonvraag(0); // Start met de eerste vraag

    const listItems = document.querySelectorAll("#questions .list-group-item"); // Alle vraagnummers
    const currentLi = listItems[currentQuestionIndex]; // Huidige vraagnummer
    currentLi.style.background = "#0d6efd"; // Blauwe achtergrond
    currentLi.style.color = "#ffffff"; // Witte tekst
};

const toonvraag = (index) => { // Toont een bepaalde vraag
    currentQuestionIndex = index; // Zet huidige vraag op deze index
    const vraag = quizData[index]; // Haal vraagobject op

    document.querySelector(".card-header").innerText = `Vraag ${index + 1}`; // Zet koptekst van kaart
    document.querySelector(".card-body").innerText = vraag.question; // Zet vraagtekst

    const antwoorden = document.getElementById("answers"); // Element voor antwoorden
    antwoorden.innerText = ""; // Leegmaken

    vraag.answers.forEach((answer) => { // Voor elk antwoord:
        const li = document.createElement("li"); // Nieuw antwoord item
        li.className = "list-group-item"; // Bootstrap klasse
        li.innerText = answer; // Antwoordtekst tonen
        li.style.cursor = "pointer"; // Klikbaar maken

        li.addEventListener("click", () => { // Wanneer erop geklikt wordt:
            vraag.selected = answer; // Gekozen antwoord opslaan

            const alleAntwoorden = document.querySelectorAll("#answers .list-group-item"); // Alle opties
            alleAntwoorden.forEach(a => {
                a.style.backgroundColor = ""; // Reset achtergrond
                a.style.color = ""; // Reset kleur
            });

            li.style.backgroundColor = "#0d6efd"; // Blauwe achtergrond
            li.style.color = "white"; // Witte tekst
        });

        antwoorden.appendChild(li); // Antwoord toevoegen aan lijst
    });

    const listItems = document.querySelectorAll("#questions .list-group-item"); // Alle vraagnummers
    const currentLi = listItems[currentQuestionIndex]; // Huidige vraagnummer
    currentLi.style.background = "#0d6efd"; // Markeren in blauw
    currentLi.style.color = "#ffffff"; // Witte tekst
};

const checkAntwoord = () => { // Controleer gekozen antwoord
    const listItems = document.querySelectorAll("#questions .list-group-item"); // Vraagnummers
    const vraag = quizData[currentQuestionIndex]; // Huidige vraag
    const currentLi = listItems[currentQuestionIndex]; // Huidige lijstitem

    if (vraag.selected === vraag.correct) { // Als juist beantwoord
        currentLi.style.backgroundColor = "#198754"; // Groen
        currentLi.style.color = "white"; // Witte tekst
        juisteAntwoorden++; // Tel op bij juiste antwoorden
    } else {
        currentLi.style.backgroundColor = "#dc3545"; // Rood
        currentLi.style.color = "white"; // Witte tekst
    }

    currentLi.style.pointerEvents = "none"; // Niet meer klikbaar
    currentLi.classList.add("disabled"); // Bootstrap: grijs maken

    let nextIndex = currentQuestionIndex + 1; // Volgende index zoeken
    while (nextIndex < quizData.length && quizData[nextIndex].selected) {
        nextIndex++; // Sla al beantwoorde vragen over
    }
    if (nextIndex < quizData.length) {
        toonvraag(nextIndex); // Toon volgende onbeantwoorde vraag
    }
};

const reset = () => { // Reset het spel
    currentQuestionIndex = 0; // Terug naar begin
    juisteAntwoorden = 0; // Score op 0

    quizData.forEach(vraag => vraag.selected = ""); // Alle keuzes wissen

    document.getElementById("answers").innerHTML = ""; // Antwoorden leegmaken
    document.querySelector(".card-header").innerText = ""; // Header leeg
    document.querySelector(".card-body").innerText = ""; // Body leeg

    const questionList = document.getElementById("questions"); // Lijst met vraagnummers
    questionList.innerHTML = ""; // Leegmaken
    quizData.forEach((vraag, index) => { // Vraaglijst opnieuw opbouwen
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action";
        li.innerText = `Vraag ${index + 1}`;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => toonvraag(index));
        questionList.appendChild(li);
    });

    toonvraag(0); // Eerste vraag opnieuw tonen

    document.getElementById("quiz").classList.add("d-none"); // Quiz verbergen
    document.getElementById("start").parentElement.classList.remove("d-none"); // Startknop terug tonen

    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || []; // Scores ophalen
    const footer = document.getElementById("highscores"); // Footer element
    footer.innerHTML = ""; // Leegmaken
    savedScores.forEach(score => { // Elke score toevoegen aan footer
        const p = document.createElement("p");
        p.innerText = score;
        footer.appendChild(p);
    });
};

window.addEventListener("load", setup); // Start setup als pagina geladen is
