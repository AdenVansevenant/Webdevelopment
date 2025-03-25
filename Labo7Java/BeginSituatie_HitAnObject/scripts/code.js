const global = {
    IMAGE_COUNT: 5, // Aantal afbeeldingen
    IMAGE_SIZE: 48, // Grootte van de afbeelding
    IMAGE_PATH_PREFIX: "images/", // Map van de afbeeldingen
    IMAGE_PATH_SUFFIX: ".png", // Extensie van de afbeelding
    MOVE_DELAY: 1000, // Tijd om te veranderen (1 seconde)
    score: 0, // Score van de speler
    timeoutId: null // Timer ID om te annuleren
};

let playField;
let image;

const setup = () => {
    playField = document.getElementById("playField"); // Plaats van het spel in de webpagina
    playField.style.width = "800px";
    playField.style.height = "600px";
    playField.style.position = "relative";
    playField.style.border = "1px solid black";

    image = document.createElement("img"); // Maak de afbeelding aan
    image.style.position = "absolute";
    image.style.width = `${global.IMAGE_SIZE}px`;
    image.style.height = `${global.IMAGE_SIZE}px`;
    image.style.display = "none"; // als spal nog ni begonnen is word de afbeelding verborgen
    playField.appendChild(image);

    image.addEventListener("click", klikOpFoto); // Event listener voor klikken op de afbeelding

    const startButton = document.getElementById("startButton"); // Zoek de startknop
    startButton.addEventListener("click", startGame); // Koppel de startknop aan de startGame functie
};

// Start spel
const startGame = () => {
    global.score = 0;
    console.log("Spel gestart");
    verplaatsImage();
    if (global.timeoutId) {
        clearInterval(global.timeoutId); // Stopt het vorige interval als er een was
    }
    global.timeoutId = setInterval(verplaatsImage, global.MOVE_DELAY); // Zet nieuwe interval van 1 seconde
};

// Verplaats de afbeelding naar een willekeurige positie
const verplaatsImage = () => {
    let randomX = Math.floor(Math.random() * (playField.clientWidth - global.IMAGE_SIZE));
    let randomY = Math.floor(Math.random() * (playField.clientHeight - global.IMAGE_SIZE));
    image.style.left = `${randomX}px`;
    image.style.top = `${randomY}px`;

    let randomImageNumber = Math.floor(Math.random() * global.IMAGE_COUNT); // Willekeurig getal tussen 0 en 4
    image.src = `${global.IMAGE_PATH_PREFIX}${randomImageNumber}${global.IMAGE_PATH_SUFFIX}`; // Set de bron van de afbeelding

    image.dataset.isBom = (randomImageNumber === 0).toString();
    image.style.display = "block"; // Zet de afbeelding zichtbaar
};

// Wat gebeurt er als je op de afbeelding klikt
const klikOpFoto = () => {
    if (image.dataset.isBom === "true") {
        alert(`Game Over! Je eindscore is: ${global.score}`);
        clearInterval(global.timeoutId); // stop de counter
        image.style.display = "none";
    } else {
        global.score++;
        console.log("Score:", global.score); // puntje krijgen
    }
};

window.addEventListener("load", setup);
