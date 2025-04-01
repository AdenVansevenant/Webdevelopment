let personen = [];
let index = -1;

const bewaarBewerktePersoon = () => {
    valideer();
    let fouten = document.querySelectorAll(".errorMessage:not(:empty)");
    if (fouten.length > 0) return;
    let persoon = {
        id: index === -1 ? Date.now() : personen[index].id,
        voornaam: document.getElementById("txtVoornaam").value.trim(),
        familienaam: document.getElementById("txtFamilienaam").value.trim(),
        geboortedatum: document.getElementById("txtGeboorteDatum").value.trim(),
        email: document.getElementById("txtEmail").value.trim(),
        aantalKinderen: document.getElementById("txtAantalKinderen").value.trim()
    };

    if (index === -1) {
        personen.push(persoon);
    } else {
        personen[index] = persoon;
    }

    personen.sort((a,b) => a.voornaam.localeCompare(b.voornaam, 'nl', {sensitivity: "base"}));
    updatePersonenLijst();
    bewerkNieuwePersoon();
};


const updatePersonenLijst = () => {
    let lijstPersonen = document.getElementById("lstPersonen");
    lijstPersonen.innerHTML = "";
    personen.forEach((persoon) => {
        let option = document.createElement("option");
        option.textContent = `${persoon.voornaam} ${persoon.familienaam}`;
        option.value = persoon.id;
        lijstPersonen.appendChild(option);
    });
};

const bewerkNieuwePersoon = () => {
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";
    index = -1;
};

const selecteerPersoon = (event) => {
    let geselecteerdeId = parseInt(event.target.value);
    index = personen.findIndex(p => p.id === geselecteerdeId);
    let persoon = personen[index];
    document.getElementById("txtVoornaam").value = persoon.voornaam;
    document.getElementById("txtFamilienaam").value = persoon.familienaam;
    document.getElementById("txtGeboorteDatum").value = persoon.geboortedatum;
    document.getElementById("txtEmail").value = persoon.email;
    document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
};

const verwijderPersoon = () => {
    if (index !== -1) {
        let geselecteerdeId = personen[index].id;
        personen = personen.filter(p => p.id !== geselecteerdeId);
        updatePersonenLijst();
        bewerkNieuwePersoon();
    }
};


const setup = () => {
    document.getElementById("btnBewaar").addEventListener("click", bewaarBewerktePersoon);
    document.getElementById("btnNieuw").addEventListener("click", bewerkNieuwePersoon);
    document.getElementById("btnVerwijder").addEventListener("click", verwijderPersoon);
    document.getElementById("lstPersonen").addEventListener("change", selecteerPersoon);
};

window.addEventListener("load", setup);
