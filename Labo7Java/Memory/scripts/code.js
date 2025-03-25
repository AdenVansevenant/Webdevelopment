// Constanten
const AANTAL_HORIZONTAAL = 4;
const AANTAL_VERTICAAL = 3;
const AANTAL_KAARTEN = 6;

// Afbeeldingen voor de kaarten: 6 afbeeldingen (0.png t/m 5.png)
const afbeeldingen = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png'];

// Het game board
const gameContainer = document.querySelector('.game-container');

// We maken een array van kaarten, met elke afbeelding 2 keer (om te matchen)
let kaarten = [...afbeeldingen, ...afbeeldingen];

// Array om de omgedraaide kaarten bij te houden
let flippedCards = [];
let isBusy = false;  // Om te controleren of er een kaart wordt omgedraaid

// Setup functie die uitgevoerd wordt wanneer de pagina geladen is
const setup = () => {
    // Shuffle de kaarten
    kaarten = kaarten.sort(() => Math.random() - 0.5);

    // Maak het spelbord aan
    createGameBoard();
};

// Maak de kaarten dynamisch aan en voeg ze toe aan het scherm
const createGameBoard = () => {
    kaarten.forEach((kaart, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.kaart = kaart;
        cardElement.dataset.index = index;

        // Voeg een event listener toe om de kaart om te draaien bij een klik
        cardElement.addEventListener('click', flipCard);

        gameContainer.appendChild(cardElement);
    });
};

// Draai een kaart om bij een klik
const flipCard = (event) => {
    if (isBusy || event.target.classList.contains('flipped')) return;

    const card = event.target;
    // Stel het pad in naar de afbeeldingen in de 'images' map
    card.style.backgroundImage = `url(images/${card.dataset.kaart})`;
    card.classList.add('flipped');
    flippedCards.push(card);

    // Als er twee kaarten omgedraaid zijn, controleer of ze een match zijn
    if (flippedCards.length === 2) {
        checkForMatch();
    }
};

// Controleer of de omgedraaide kaarten een match zijn
const checkForMatch = () => {
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

// Wanneer de pagina is geladen, wordt de setup functie uitgevoerd
window.addEventListener("load", setup);
