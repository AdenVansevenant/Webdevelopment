const setup = () => {
}
window.addEventListener("load", setup);

let familieleden = ["Jan", "Emma", "Lucas", "Sophie", "Noah"];

console.log(familieleden.length);
console.log(familieleden[0]);
console.log(familieleden[2]);
console.log(familieleden[4]);

function VoegNaamToe(naam) {
    let nieuweNaam = prompt("Voer een extra familielid naam in:")
        naam.push(nieuweNaam);
}

VoegNaamToe(familieleden);

console.log(familieleden);

let familieString = familieleden.join(", ");
console.log(familieString);
