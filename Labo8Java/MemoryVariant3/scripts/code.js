const AANTAL_HORIZONTAAL = 4;
const AANTAL_VERTICAAL = 3;
const AANTAL_KAARTEN = 6;

const geluiden = ['0.wav', '1.wav', '2.wav', '3.wav', '4.wav', '5.wav'];

const gameContainer = document.querySelector('.game-container');

let kaarten = [];
let omgekeerdeKaarten = [];
let omgedraaid = false;

const setup = () => {
    // Maak een array van objecten die alleen het geluid koppelen
    for (let i = 0; i < AANTAL_KAARTEN; i++) {
        kaarten.push({ geluid: geluiden[i] });
        kaarten.push({ geluid: geluiden[i] }); // Voeg het object 2 keer toe
    }

    // Schud de kaarten
    kaarten = kaarten.sort(() => Math.random() - 0.5);

    createGameBoard();
};

const createGameBoard = () => {
    kaarten.forEach((kaart, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.geluid = kaart.geluid;    // Koppel het geluid aan de kaart
        cardElement.dataset.index = index;

        cardElement.addEventListener('click', omdraaien);

        gameContainer.appendChild(cardElement);
    });
};

const omdraaien = (event) => {
    if (omgedraaid || event.target.classList.contains('flipped')) return;

    const card = event.target;
    card.classList.add('flipped');

    // Speel het geluid af dat gekoppeld is aan de kaart
    const audio = new Audio(`sounds/${card.dataset.geluid}`);
    audio.play();

    omgekeerdeKaarten.push(card);

    if (omgekeerdeKaarten.length === 2) {
        zelfde();
    }
};

const zelfde = () => {
    omgedraaid = true;

    const [card1, card2] = omgekeerdeKaarten;
    if (card1.dataset.geluid === card2.dataset.geluid) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        omgekeerdeKaarten = [];
        omgedraaid = false;
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            omgekeerdeKaarten = [];
            omgedraaid = false;
        }, 1000);
    }
};

window.addEventListener("load", setup);
