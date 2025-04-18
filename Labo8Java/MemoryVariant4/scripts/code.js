const AANTAL_HORIZONTAAL = 4;
const AANTAL_VERTICAAL = 3;
const AANTAL_KAARTEN = 6;

// Haal de waarde van de slider op
let AANTAL_HERHALINGEN = document.getElementById('herhalingen').value;

const afbeeldingen = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png'];
const geluiden = ['0.wav', '1.wav', '2.wav', '3.wav', '4.wav', '5.wav'];

const gameContainer = document.querySelector('.game-container');

let kaarten = [];
let omgekeerdeKaarten = [];
let omgedraaid = false;

const setup = () => {
    // Verkrijg het aantal herhalingen van de slider
    AANTAL_HERHALINGEN = document.getElementById('herhalingen').value;
    document.getElementById('herhalingen-waarde').textContent = AANTAL_HERHALINGEN; // Toon de waarde van de slider

    // Maak een array van objecten die de afbeelding en het geluid koppelen
    kaarten = [];
    for (let i = 0; i < AANTAL_KAARTEN; i++) {
        for (let j = 0; j < AANTAL_HERHALINGEN; j++) { // Voeg de kaart meerdere keren toe op basis van AANTAL_HERHALINGEN
            kaarten.push({ afbeelding: afbeeldingen[i], geluid: geluiden[i] });
        }
    }

    // Schud de kaarten
    kaarten = kaarten.sort(() => Math.random() - 0.5);

    createGameBoard();
};

const createGameBoard = () => {
    gameContainer.innerHTML = ''; // Leeg het spelbord
    kaarten.forEach((kaart, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.kaart = kaart.afbeelding;  // Koppel de afbeelding aan de kaart
        cardElement.dataset.geluid = kaart.geluid;    // Koppel het geluid aan de kaart
        cardElement.dataset.index = index;

        cardElement.addEventListener('click', omdraaien);

        gameContainer.appendChild(cardElement);
    });
};

const omdraaien = (event) => {
    if (omgedraaid || event.target.classList.contains('flipped')) return;

    const card = event.target;
    card.style.backgroundImage = `url(images/${card.dataset.kaart})`;
    card.classList.add('flipped');

    // Speel het geluid af dat gekoppeld is aan de kaart
    const audio = new Audio(`sounds/${card.dataset.geluid}`);
    audio.play();

    omgekeerdeKaarten.push(card);

    // Als we het aantal kaarten hebben bereikt dat we moeten omdraaien
    if (omgekeerdeKaarten.length === parseInt(AANTAL_HERHALINGEN)) {
        zelfde();
    }
};

const zelfde = () => {
    omgedraaid = true;

    const kaartenOmgedraaid = omgekeerdeKaarten;

    // Controleer of alle omgedraaide kaarten hetzelfde zijn
    const eersteKaart = kaartenOmgedraaid[0].dataset.kaart;
    const alleZelfde = kaartenOmgedraaid.every(card => card.dataset.kaart === eersteKaart);

    if (alleZelfde) {
        // Als ze allemaal dezelfde afbeelding hebben, markeer ze als "matched"
        kaartenOmgedraaid.forEach(card => {
            card.classList.add('matched');
        });
        omgekeerdeKaarten = [];
        omgedraaid = false;
    } else {
        // Als ze niet hetzelfde zijn, draai ze om na een korte tijd
        setTimeout(() => {
            kaartenOmgedraaid.forEach(card => {
                card.classList.remove('flipped');
                card.style.backgroundImage = '';
            });
            omgekeerdeKaarten = [];
            omgedraaid = false;
        }, 1000);
    }
};

// Luister naar de slider om het aantal herhalingen aan te passen
document.getElementById('herhalingen').addEventListener('input', () => {
    setup();  // Zet het spel opnieuw in gang met de nieuwe waarde
});

window.addEventListener("load", setup);
