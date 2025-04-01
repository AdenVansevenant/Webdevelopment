let personen = [];
let index = -1;

const bewaarBewerktePersoon = () => {
    valideer();
    let fouten = document.querySelectorAll(".errorMessage:not(:empty)");
    if (fouten.length > 0) return;
    let persoon = {
        voornaam: document.getElementById("txtVoornaam").value.trim(),
        familienaam: document.getElementById("txtFamilienaam").value.trim(),
        geboortedatum: document.getElementById("txtGeboorteDatum").value.trim(),
        email: document.getElementById("txtEmail").value.trim(),
        aantalKinderen: document.getElementById("txtAantalKinderen").value.trim()
    };

    if (index === -1) { // als er nog niets instaat zet hij het in de box
        personen.push(persoon); // ==> toevoegen aan box
    } else {

        personen[index] = persoon;
    }

    updatePersonenLijst();
    bewerkNieuwePersoon();  // Reset formulier na bewaren
};

const updatePersonenLijst = () => {
    let lijstPersoonen = document.getElementById("lstPersonen");
    lijstPersoonen.innerHTML = "";  // Leeg de lijst
    personen.forEach((persoon, index) => {
        let option = document.createElement("option");
        option.textContent = `${persoon.voornaam} ${persoon.familienaam}`;
        option.value = index;
        lijstPersoonen.appendChild(option);
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
    index = event.target.value;
    let persoon = personen[index];
    document.getElementById("txtVoornaam").value = persoon.voornaam;
    document.getElementById("txtFamilienaam").value = persoon.familienaam;
    document.getElementById("txtGeboorteDatum").value = persoon.geboortedatum;
    document.getElementById("txtEmail").value = persoon.email;
    document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
};

const setup = () => {
    document.getElementById("btnBewaar").addEventListener("click", bewaarBewerktePersoon);
    document.getElementById("btnNieuw").addEventListener("click", bewerkNieuwePersoon);
    document.getElementById("lstPersonen").addEventListener("change", selecteerPersoon);
};

window.addEventListener("load", setup);
