// In 'oplossing contact manager' wordt heel erg gesteund op het feit dat
// de volgorde van de <option>s in het <select> element netjes overeenkomt
// met de volgorde van de persoon objecten in het globale array.
//
// Dit zal echter in de praktijk niet zo vaak voorkomen (denk aan filteren
// en sorteren in de UI).
//
// Deze oplossing toont een algemenere manier om <option>s en persoon
// objecten aan elkaar te relateren : met eenzelfde waarde van een
// id property in het persoon object en custom attribuut data-persoonId in
// het corresponderende <option> element. De binding gebeurt hier dus
// op basis van een id.
//
// De functies findPersoonById() en findOptionById() doen het opzoekwerk
// op basis van een id.
//
// We maken er ook gebruik van dat we ten allen tijde kunnen weten wie
// we aan het bewerken zijn door de te kijken naar de selectedIndex van
// het <select> element (*). Als we een nieuwe persoon bewerken, zetten we de
// selectedIndex property op -1 wat overeenkomt met 'geen selectie'
// (en zo kunnen we dus ook checken of we met een nieuwe dan wel een
// bestaande persoon bezig zijn!).
//
// (*) als we een bestaande persoon bewerken en dan bewaren, weten we
// dus adhv de selectedIndex welke <option> we moeten aanpassen. Toch gaan
// we die in de oplossing hieronder opzoeken adhv de persoon id, gewoon om
// eens te tonen hoe findOptionById() daarvoor zou gebruikt worden. Immers,
// als je een UI-lijst maakt zonder <select> heb je geen selectedIndex en dan
// is het goed om weten wat je dan zou kunnen doen.
//
// We hebben voor deze oefening eigenlijk natuurlijk nog steed een globale
// variabele nodig voor de lijst van alle personen. Daarnaast voorzien we
// ook een 'lastUsedId' (gewoon een teller) om een nieuwe unieke id te
// bekomen telkens we een nieuw persoon object maken.


let personen = [];
let lastUsedId = 0;

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
    option.setAttribute("data-persoonId", persoon.id);
    lstPersonen.selectedIndex = personen.length - 1;
};

// update de voorstelling van de persoon in de user interface
const updatePersoonInLijstInUserInterface = (persoon) => {
    let option = findOptionById(persoon.id);

    // Eigenlijk kon bovenstaande makkelijker met :
    //
    // let lstPersonen = document.getElementById("lstPersonen");
    // let option=lstPersonen.options[lstPersonen.selectedIndex];
    //
    // maar zoals opgemerkt in de (*) helemaal bovenaan, tonen we
    // de algemenere aanpak.

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
            lastUsedId++;
            persoon.id = lastUsedId;
            vulPersoonOpBasisVanUserInterface(persoon);
            personen.push(persoon); // toevoegen aan interne lijst
            voegPersoonToeAanLijstInUserInterface(persoon);
        } else {
            // bestaande persoon wijzigen
            let option = lstPersonen.options[lstPersonen.selectedIndex];
            let id = parseInt(option.getAttribute("data-persoonId"), 10);
            persoon = findPersoonById(id);
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
    let option = e.target.options[index];
    let id = parseInt(option.getAttribute("data-persoonId"), 10);
    let persoon = findPersoonById(id);
    vulUserInterfaceOpBasisVanPersoon(persoon);
	clearAllErrors();
};

const findPersoonById = (id) => {
    for (let i = 0; i < personen.length; i++) {
        if (personen[i].id == id) {
            return personen[i];
        }
    }
    return null;
};

const findOptionById = (id) => {
    return document.querySelector("#lstPersonen>option[data-persoonId='" + id + "']");

    // of omslachtiger, als je niet weet dat er attribute selectoren bestaan :
    //
    // let i;
    // let lstPersonen=document.getElementById("lstPersonen");
    // for (let i=0;i<lstPersonen.options.length;i++) {
    // 	if (id==lstPersonen.options[i].getAttribute("data-persoonId")) {
    // 		return lstPersonen.options[i];
    // 	}
    // }
    // return null;
};

// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("change", bewerkGeselecteerdePersoon);
};

window.addEventListener("load", setup);