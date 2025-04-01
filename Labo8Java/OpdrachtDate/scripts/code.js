const setup = () => {
    const geboorteDatum = new Date(2006, 6, 9); // Maanden beginnen bij 0 (juli = 6)

    const DatumVandaag = new Date();

    const verschil = DatumVandaag - geboorteDatum;

    const verschildagen = Math.floor(verschil / (1000 * 60 * 60 * 24));

    console.log(`Aantal dagen sinds mijn geboortedag (9 juli 2006): ${verschildagen}`);
}
window.addEventListener("load", setup);