const setup = () => {
    document.querySelector("button").addEventListener("click", toonResultaat);
};

const toonResultaat = () => {
    const isRoker = document.getElementById("isRoker").checked ? "is een roker" : "is geen roker";

    const moedertaal = document.querySelector("input[name='moedertaal']:checked");
    const moedertaalValue = moedertaal ? moedertaal.value : "geen moedertaal gekozen";

    const buurland = document.getElementById("buurland").value;

    const bestellingSelect = document.getElementById("bestelling");
    const bestelling = Array.from(bestellingSelect.selectedOptions).map(option => option.value).join(", ");

    console.log(isRoker);
    console.log(`moedertaal is ${moedertaalValue}`);
    console.log(`favoriete buurland is ${buurland}`);
    console.log(`bestelling bestaat uit ${bestelling}`);
};

document.addEventListener("load", setup);
