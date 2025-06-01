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

let currentQuestionIndex = 0;
let juisteAntwoorden = 0;

const setup = () => {
    document.getElementById("start").addEventListener("click", Startspel);
    document.getElementById("submit").addEventListener("click", () => {
        const scoreText = `Je score: ${juisteAntwoorden} van ${quizData.length}`;
        const footer = document.getElementById("highscores");
        const scoreElement = document.createElement("p");
        scoreElement.innerText = scoreText;
        footer.appendChild(scoreElement);

        let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
        scores.push(scoreText);
        localStorage.setItem("quizScores", JSON.stringify(scores));
    });
    document.querySelector("#quiz > div.col-10 > div > div.card-footer > button").addEventListener("click", checkAntwoord);
    document.getElementById("reset").addEventListener("click", reset);

    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const footer = document.getElementById("highscores");
    savedScores.forEach(scoreText => {
        const scoreElement = document.createElement("p");
        scoreElement.innerText = scoreText;
        footer.appendChild(scoreElement);
    });
};

const Startspel = () => {
    document.getElementById("started").innerText = new Date().toLocaleTimeString();
    document.getElementById("start").parentElement.classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");

    const questionList = document.getElementById("questions");
    questionList.innerText = "";

    quizData.forEach((vraag, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action";
        li.innerText = `Vraag ${index + 1}`;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => toonvraag(index));
        questionList.appendChild(li);
    });
    toonvraag(0);

    const listItems = document.querySelectorAll("#questions .list-group-item");
    const vraag = quizData[currentQuestionIndex];
    const currentLi = listItems[currentQuestionIndex];

    currentLi.style.background = "#0d6efd";
    currentLi.style.color = "#ffffff";
};

const toonvraag = (index) => {
    currentQuestionIndex = index;
    const vraag = quizData[index];
    document.querySelector(".card-header").innerText = `Vraag ${index + 1}`;
    document.querySelector(".card-body").innerText = vraag.question;

    const antwoorden = document.getElementById("answers");
    antwoorden.innerText = "";

    vraag.answers.forEach((answer, i) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = answer;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            vraag.selected = answer;
            const alleAntwoorden = document.querySelectorAll("#answers .list-group-item");
            alleAntwoorden.forEach(a => {
                a.style.backgroundColor = "";
                a.style.color = "";
            });
            li.style.backgroundColor = "#0d6efd";
            li.style.color = "white";
        });
        antwoorden.appendChild(li);
    });

    const listItems = document.querySelectorAll("#questions .list-group-item");
    const currentLi = listItems[currentQuestionIndex];
    currentLi.style.background = "#0d6efd";
    currentLi.style.color = "#ffffff";
};

const checkAntwoord = () =>{
    const listItems = document.querySelectorAll("#questions .list-group-item");
    const vraag = quizData[currentQuestionIndex];
    const currentLi = listItems[currentQuestionIndex];

    currentLi.style.background = "#0d6efd";
    currentLi.style.color = "#ffffff";

    if (vraag.selected === vraag.correct) {
        currentLi.style.backgroundColor = "#198754"; // Bootstrap success kleur
        currentLi.style.color = "white";
        juisteAntwoorden++;
    } else {
        currentLi.style.backgroundColor = "#dc3545"; // Bootstrap danger kleur
        currentLi.style.color = "white";
    }

    currentLi.style.pointerEvents = "none";
    currentLi.classList.add("disabled");

    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < quizData.length && quizData[nextIndex].selected) {
        nextIndex++;
    }
    if (nextIndex < quizData.length) {
        toonvraag(nextIndex);
    }
};

const reset = () => {
    currentQuestionIndex = 0;
    juisteAntwoorden = 0;

    for (let i = 0; i < quizData.length; i++) {
        quizData[i].selected = "";
    }

    document.getElementById("answers").innerHTML = "";
    document.querySelector(".card-header").innerText = "";
    document.querySelector(".card-body").innerText = "";

    const listItems = document.querySelectorAll("#questions .list-group-item");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("disabled");
        listItems[i].style.pointerEvents = "";
        listItems[i].style.backgroundColor = "";
        listItems[i].style.color = "";
    }

    const questionList = document.getElementById("questions");
    questionList.innerHTML = "";
    for (let index = 0; index < quizData.length; index++) {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action";
        li.innerText = `Vraag ${index + 1}`;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => toonvraag(index));
        questionList.appendChild(li);
    }

    toonvraag(0);

    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("start").parentElement.classList.remove("d-none");

    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const footer = document.getElementById("highscores");
    while (footer.querySelector("p")) {
        footer.removeChild(footer.querySelector("p"));
    }
    for (let i = 0; i < savedScores.length; i++) {
        const scoreElement = document.createElement("p");
        scoreElement.innerText = savedScores[i];
        footer.appendChild(scoreElement);
    }
};

window.addEventListener("load", setup);
