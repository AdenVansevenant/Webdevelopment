// Constantes
const AANTAL_HORIZONTAAL = 4;
const AANTAL_VERTICAAL = 3;
const AANTAL_KAARTEN = 6;

//array me foto
const afbeeldingen = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png'];

//spel
const container = document.querySelector('.game-container');

//dubbel maken want 2 keer nodig
let kaarten = [...afbeeldingen, ...afbeeldingen];

//array voor kaarten door elkaar te zetten
let flippedCards = [];
let isBusy = false;  //de kaart is omgedraaid

const setup = () => {
    kaarten = kaarten.sort(() => Math.random() - 0.5);
    createGameBoard(); //bord maken
};

// Maak de kaarten dynamisch aan en voeg ze toe aan het scherm
const createGameBoard = () => {
    kaarten.forEach((kaart, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.kaart = kaart;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', DraaiKaart); //kaart draaien

        container.appendChild(cardElement);
    });
};

// Draai een kaart om bij een klik
const DraaiKaart = (event) => {
    if (isBusy || event.target.classList.contains('flipped')) return;

    const card = event.target;
        card.style.backgroundImage = `url(images/${card.dataset.kaart})`;
    card.classList.add('flipped');
    flippedCards.push(card);

    // Als er twee kaarten omgedraaid zijn, controleer of ze een match zijn
    if (flippedCards.length === 2) {
        zelfde();
    }
};

// Controleer of de omgedraaide kaarten een match zijn
const zelfde = () => {
    isBusy = true;

    const [card1, card2] = flippedCards;
    if (card1.dataset.kaart === card2.dataset.kaart) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        isBusy = false;
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            // Verwijder de afbeeldingen en toon de achterkant (neutrale kleur)
            card1.style.backgroundImage = '';
            card2.style.backgroundImage = '';
            flippedCards = [];
            isBusy = false;
        }, 1000);
    }
};
window.addEventListener("load", setup);
