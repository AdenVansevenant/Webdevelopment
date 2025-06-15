// Deze oplossing is identiek aan 'oplossing contact manager' met toevoeging
// van voorgedefinieerde personen. Dit maakt het programmeren makkelijker
// omdat je dan geen tijd verliest met het steeds opnieuw intypen van data
// bij het uitproberen van je oplossing.
// Dankzij de demo data kun je als student ook makkelijk een en ander nagaan
// in de debugger om deze oplossing te begrijpen, zonder tijd te verliezen met
// het intypen van data.
//
// De enige wijziging is de toevoeging van vulMetDemoData() functie en een
// oproep hiervan op het einde van de setup() functie.

let personen = [];

// Stel de properties van het persoon object in volgens de waarden in de UI
const vulPersoonOpBasisVanUserInterface = (persoon) => {
    let txtVoornaam = document.getElementById("txtVoornaam");
    persoon.voornaam = txtVoornaam.value.trim();

    let txtFamilienaam = document.getElementById("txtFamilienaam");
    persoon.familienaam = txtFamilienaam.value.trim();

    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    persoon.geboorteDatum = new Date(txtGeboorteDatum.value.trim()); // <- het bestuderen waard

    let txtEmail = document.getElementById("txtEmail");
    persoon.email = txtEmail.value.trim();

    let txtAantalKinderen = document.getElementById("txtAantalKinderen");
    persoon.aantalKinderen = parseInt(txtAantalKinderen.value.trim());
};

// Stel de inputvelden in op basis van de properties van het persoon object
const vulUserInterfaceOpBasisVanPersoon = (persoon) => {
    let txtVoornaam = document.getElementById("txtVoornaam");
    txtVoornaam.value = persoon.voornaam;

    let txtFamilienaam = document.getElementById("txtFamilienaam");
    txtFamilienaam.value = persoon.familienaam;

    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    txtGeboorteDatum.value = persoon.geboorteDatum.toISOString().substring(0, 10); // <- het bestuderen waard

    let txtEmail = document.getElementById("txtEmail");
    txtEmail.value = persoon.email;

    let txtAantalKinderen = document.getElementById("txtAantalKinderen");
    txtAantalKinderen.value = persoon.aantalKinderen;
};

// Voeg de persoon toe aan de lijst in de user interface 
// (en selecteer gelijk ook die persoon in de lijst)
const voegPersoonToeAanLijstInUserInterface = (persoon) => {
    let lstPersonen = document.getElementById("lstPersonen");
    let option = document.createElement("option");
    option.innerHTML = persoon.voornaam + " " + persoon.familienaam;
    lstPersonen.appendChild(option);
    lstPersonen.selectedIndex = personen.length - 1;
};

// update de voorstelling van de persoon in de user interface
const updatePersoonInLijstInUserInterface = (persoon) => {
    let lstPersonen = document.getElementById("lstPersonen");
    let option = lstPersonen.options[lstPersonen.selectedIndex];
    option.innerHTML = persoon.voornaam + " " + persoon.familienaam;
};

// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    valideer();
    // zijn er elementen als invalid gemarkeerd?
    let elements = document.getElementsByClassName("invalid");
    if (elements.length == 0) {
        // alles in orde, we mogen bewaren
        let persoon = {};
        if (lstPersonen.selectedIndex == -1) {
            // nieuwe persoon bewaren
            vulPersoonOpBasisVanUserInterface(persoon);
            personen.push(persoon); // toevoegen aan interne lijst
            voegPersoonToeAanLijstInUserInterface(persoon);
        } else {
            // bestaande persoon wijzigen
            persoon = personen[lstPersonen.selectedIndex];
            vulPersoonOpBasisVanUserInterface(persoon);
            updatePersoonInLijstInUserInterface(persoon);
        }
    }
};

// Event listener (btnNieuw click)
// Zet de user interface klaar om de gegevens van een nieuwe persoon in te voeren
const bewerkNieuwePersoon = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    let txtVoornaam = document.getElementById("txtVoornaam");
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    let txtEmail = document.getElementById("txtEmail");
    let txtAantalKinderen = document.getElementById("txtAantalKinderen");
    // maak alle velden leeg
    txtVoornaam.value = "";
    txtFamilienaam.value = "";
    txtGeboorteDatum.value = "";
    txtEmail.value = "";
    txtAantalKinderen.value = "";
    // zorg dat er in de lijst in de user interface geen selectie is
    lstPersonen.selectedIndex = -1;

    // Ben me niet zeker of bovenstaande -1 instellen wel ok is, maar heb niks
    // in de html5 spec gezien die dit verbiedt. Maar links en rechts vind je
    // wel eens een bewering dat <select> elementen die niet van type  multiple zijn,
    // altijd een selectie moeten hebben (denk aan dropdown box bv.), maar
    // ik vermoed dat dit pre-html5 advies is.
	
	clearAllErrors();
};

// Event listener (lstPersonen change)
// Vul de user interface met de gegevens van de geselecteerde persoon
const bewerkGeselecteerdePersoon = (e) => {
    let index = e.target.selectedIndex;
    let persoon = personen[index];
    vulUserInterfaceOpBasisVanPersoon(persoon);
	clearAllErrors();
};

// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("change", bewerkGeselecteerdePersoon);
	
    vulMetDemoData();
};

const vulMetDemoData = () => {
    let jan = {
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: 0
    };
    let mieke = {
        voornaam: 'Mieke',
        familienaam: 'Mickelsen',
        geboorteDatum: new Date('1980-01-01'),
        email: 'mieke@example.com',
        aantalKinderen: 1
    };
    let piet = {
        voornaam: 'Piet',
        familienaam: 'Pieters',
        geboorteDatum: new Date('1970-12-31'),
        email: 'piet@example.com',
        aantalKinderen: 2
    };

    personen.push(jan);
    voegPersoonToeAanLijstInUserInterface(jan);

    personen.push(mieke);
    voegPersoonToeAanLijstInUserInterface(mieke);

    personen.push(piet);
    voegPersoonToeAanLijstInUserInterface(piet);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.selectedIndex = -1; // geen selectie
};

window.addEventListener("load", setup);