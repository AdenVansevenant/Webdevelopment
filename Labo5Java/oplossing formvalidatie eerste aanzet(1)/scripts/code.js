const setup = () => {
	let btnValideer = document.getElementById("btnValideer");
	btnValideer.addEventListener("click", valideer);
};

const valideer = () => {
	valideerVoornaam();
	valideerFamilienaam();
	valideerGeboortedatum();
	valideerEmail();
	valideerAantalKinderen();
};

const valideerVoornaam = () => {
	let txtVoornaam = document.getElementById("txtVoornaam");
	let errVoornaam = document.getElementById("errVoornaam");
	let voornaam = txtVoornaam.value.trim();
	if (voornaam.length > 30) {
		txtVoornaam.className = "invalid";
		errVoornaam.innerHTML = "max. 30 karakters";
	} else {
		txtVoornaam.className = "";
		errVoornaam.innerHTML = "";
	}
};

const valideerFamilienaam = () => {
	let txtFamilienaam = document.getElementById("txtFamilienaam");
	let errFamilienaam = document.getElementById("errFamilienaam");
	let familienaam = txtFamilienaam.value.trim();
	if (familienaam === "") {
		txtFamilienaam.className = "invalid";
		errFamilienaam.innerHTML = "verplicht veld";
	} else if (familienaam.length > 50) {
		txtFamilienaam.className = "invalid";
		errFamilienaam.innerHTML = "max. 50 karakters";
	} else {
		txtFamilienaam.className = "";
		errFamilienaam.innerHTML = "";
	}
};

const valideerGeboortedatum = () => {
	let txtGeboortedatum = document.getElementById("txtGeboortedatum");
	let errGeboortedatum = document.getElementById("errGeboortedatum");
	let geboortedatum = txtGeboortedatum.value.trim();
	const geboortedatumvalidatie = /^\d{4}-\d{2}-\d{2}$/;  //jjjj-mm-dd
	if (geboortedatum === "") {
		txtGeboortedatum.className = "invalid";
		errGeboortedatum.innerHTML = "verplicht veld";
	} else if (!geboortedatumvalidatie.test(geboortedatum)) {
		txtGeboortedatum.className = "invalid";
		errGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
	} else {
		txtGeboortedatum.className = "";
		errGeboortedatum.innerHTML = "";
	}
};

const valideerEmail = () => {
	let txtEmail = document.getElementById("txtEmail");
	let errEmail = document.getElementById("errEmail");
	let email = txtEmail.value.trim();
	const emailvalidatie = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/; // E-mail validatie
	if (email === "") {
		txtEmail.className = "invalid";
		errEmail.innerHTML = "verplicht veld";
	} else if (!emailvalidatie.test(email)) {
		txtEmail.className = "invalid";
		errEmail.innerHTML = "geen geldig email adres";
	} else {
		txtEmail.className = "";
		errEmail.innerHTML = "";
	}
};

const valideerAantalKinderen = () => {
	let txtAantalKinderen = document.getElementById("txtAantalKinderen");
	let errAantalKinderen = document.getElementById("errAantalKinderen");
	let aantalKinderen = txtAantalKinderen.value.trim();
	if (!isGetal(aantalKinderen) || aantalKinderen < 0 || aantalKinderen >= 99) {
		txtAantalKinderen.className = "invalid";
		errAantalKinderen.innerHTML = "is geen positief getal";
	} else {
		txtAantalKinderen.className = "";
		errAantalKinderen.innerHTML = "";
	}
};

const isGetal = (tekst) => {
	return !isNaN(tekst);
};

window.addEventListener("load", setup);
