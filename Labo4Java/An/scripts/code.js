const setup = () => {
    zoekmetindex();
    zoekmetlastindex();
}
const zoekmetindex = () => {
    let tekst = "De man van An geeft geen hand aan ambetante verwanten";
    let zoeken = "an";
    let teller = 0;
    let positie = 0;

    while ((positie = tekst.indexOf(zoeken, positie)) !== -1) {
        teller++;
        positie += zoeken.length;
    }

    console.log("Aantal keer 'an' met indexOf:", teller);
};

const zoekmetlastindex = () => {
    let tekst2 = "De man van An geeft geen hand aan ambetante verwanten";
    let zoeken2 = "an";
    let teller2 = 0;
    let positie2 = tekst2.length;

    while ((positie2 = tekst2.lastIndexOf(zoeken2, positie2 - 1)) !== -1) {
        teller2++;
    }

    console.log("Aantal keer 'an' met lastIndexOf:", teller2);
}
window.addEventListener("load", setup);