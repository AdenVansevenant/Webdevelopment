let global = {
	AANTAL_AFBEELDINGEN:12,
	 AANTAL_KAARTEN_PER_AFBEELDING:2,
	AANTAL_KAARTEN_HORIZONTAAL:6,
	 PREFIX_KAART_PATH:"image/kaart",
	 SUFFIX_KAART_PATH:".png",
	 ACHTERKANT_PATH:"image/achterkant.png",
}



const shuffle = (array) => {

	// deze functie zal de elementen in array door elkaar shufflen
	{
		array.sort((a, b) => {
			return Math.random() - 0.5;
		});
	}

}

const toonGoed = () => {

    let kaarten = document.getElementsByClassName("voorkant");
    let i;
    // speel het geluid af voor een match
    document.getElementById("goed").play();
    // toon dat het een match is
    for (i = 0; i < kaarten.length; i++) {
        kaarten[i].className += " goed";
    }
}

const toonFout = () => {

    let kaarten=document.getElementsByClassName("voorkant");
    // speel het geluid af voor een match
    document.getElementById("fout").play();
    // toon dat het geen match is
    for (i = 0; i < kaarten.length; i++) {
        kaarten[i].className += " fout";
    }
}


const draaiKaartenMetVoorkantNaarAchterkant = () => {


	let kaartenMetVoorkant=document.getElementsByClassName("voorkant");
	// je zou misschien iets verwachten als
	//   for (i=0;i<kaartenMetVoorkant.length;i++) {
	//	   kaartenMetVoorkant[i].className="kaart achterkant";
	//   }
	// maar bedenk dat kaartenMetVoorkant een LIVE collection is!
	// Dus na elke iteratie van de for loop zou .length eentje kleiner
	// worden terwijl je i eentje verhoogt, je zou er dus overslaan
	while (kaartenMetVoorkant.length>0) {
        kaartenMetVoorkant[0].setAttribute("src", global.ACHTERKANT_PATH);
        kaartenMetVoorkant[0].className="kaart achterkant";
    }

    // zorg dat het speelveld weer op kliks zal reageren door
    // de class 'geblokkeerd' weg te nemen
    document.getElementById("playField").className="";
}

const verwijderKaartenMetVoorkant = () => {

    let kaart;
	let kaartenMetVoorkant=document.getElementsByClassName("voorkant");
	// je zou misschien iets verwachten als
	//   for (i=0;i<kaartenMetVoorkant.length;i++) {
	//	   // code om kaartenMetVoorkant[0] te verwijderen
	//   }
	// maar bedenk dat kaartenMetVoorkant een LIVE collection is!
	// Dus na elke iteratie van de for loop zou .length eentje kleiner
	// worden terwijl je i eentje verhoogt, je zou er dus overslaan
	while (kaartenMetVoorkant.length>0) {
        kaart=kaartenMetVoorkant[0];
        // verwijder de listener van deze kaart
        kaart.removeEventListener("click", klikOpKaart);
        // verwijder de kaart uit de DOM-tree
        kaart.parentNode.removeChild(kaart);
	}

    // zorg dat het speelveld weer op kliks zal reageren door
    // de class 'geblokkeerd' weg te nemen
    document.getElementById("playField").className="";

	// zijn er nog kaarten over?
	controleerSpelGedaan();
}

const controleerSpelGedaan = () => {

	let playField;
	let kaarten=document.getElementsByClassName("kaart");
	if (kaarten.length == 0) {
		// er zijn geen kaarten meer over, spel is gedaan
		// verwijder alle vakken (zodat speelveld leeg is)
		// maar onthou eerst z'n hoogte
		playField=document.getElementById("playField");
		let savedHeight=playField.clientHeight;
		playField.innerHTML="";
		// nu het speelveld leeg is, zal de hoogte 0px zijn,
		// dus we gaan nu handmatig de hoogte instellen op dezelfde
		// waarde van daarnet
		playField.style.height=savedHeight+"px";
		// markeer het speelveld als klaar, zodat onze afbeelding getoond wordt.
		playField.className="klaar";
	}
}

const controleerOpOvereenkomst = (kaarten) => {

	// Deze functie gaat na of de kaarten allen overeenkomen of niet.
	// Al naargelang zullen de nodige functieoproepen gepland worden
	// om kaarten om te draaien of te verwijderen en het juiste geluidje
	// af te spelen
    let kaart=kaarten[0];
    let allenGelijk=true;
    let i;
    for (i=1;i<kaarten.length;i++) {
        if (kaart.getAttribute("src") != kaarten[i].getAttribute("src")) {
            allenGelijk=false;
            break;
        }
    }
	if (allenGelijk) {
		// zelfde afbeeldingen, dus match
		window.setTimeout(verwijderKaartenMetVoorkant, 1000);
		window.setTimeout(toonGoed, 500);
	} else {
		// andere afbeeldingen, dus mismatch
		window.setTimeout(draaiKaartenMetVoorkantNaarAchterkant, 1000);
		window.setTimeout(toonFout, 500);
	}
}

const klikOpKaart = (e) => {

	// Deze functie zal enkel reageren op clicks indien het speelveld
	// niet geblokkeerd is. Dit is nodig omdat we igv 2 omgedraaide kaarten
	// deze eventjes willen laten staan zodat de gebruiker ze kan bekijken
	// maar tegelijk willen we niet dat er verder geklikt kan worden in die
	// periode.
	if (document.getElementById("playField").className!="geblokkeerd") {
		let kaart= e.target;
		let kaartenMetVoorkant=document.getElementsByClassName("voorkant");
		document.getElementById("draai").play();
		kaart.className="kaart voorkant";
        // stel src attribuut in op de juiste afbeelding
        kaart.setAttribute("src", kaart.getAttribute("data-imageSource"));
		// PAS OP : kaartenMetVoorkant is een LIVE collection, dus onze 'nieuw omgedraaide'
		// zal nu ook al in die lijst zitten, vandaar dat we testen op ==2 ipv ==1 !
		if (kaartenMetVoorkant.length==global.AANTAL_KAARTEN_PER_AFBEELDING) {
			controleerOpOvereenkomst(kaartenMetVoorkant);
			document.getElementById("playField").className="geblokkeerd";
		}
	}
}

const addVak = (parent, kaartNummer) => {

	// Deze functie voegt een vak (een span element) toe aan het speelveld
	// met daarin een kaart (een img element) voor het opgegeven kaartnummer

    let vak=document.createElement("span");
    let kaart=document.createElement("img");

	kaart.className="kaart achterkant";
	kaart.setAttribute("src", global.ACHTERKANT_PATH);
    kaart.setAttribute("data-imageSource", global.PREFIX_KAART_PATH+kaartNummer+global.SUFFIX_KAART_PATH);
    kaart.addEventListener("click", klikOpKaart);

    vak.className="vak";
    vak.appendChild(kaart);

    parent.appendChild(vak);
}

const initialize = () => {


	let playField=document.getElementById("playField");
	let i;
	let kaartNummers=[];
	let lineBreakElement;
	let aantalKaarten = global.AANTAL_AFBEELDINGEN * global.AANTAL_KAARTEN_PER_AFBEELDING;
	
	// bouw een lijst waarin de nodige kaartnummers meermaals voorkomen
	for (i=0;i<aantalKaarten;i++) {
		kaartNummers.push(i%global.AANTAL_AFBEELDINGEN);
	}
	
	// schud de kaartnummers dooreen
	shuffle(kaartNummers);
	
	// voeg de nodige vakken toe (in onze leesrichting, dus van links naar rechts en van boven naar onder)
	// Aan elk vak wordt een kaart toegevoegd op basis van de volgorde in ons array van kaartnummers.
	for (i=0;i<aantalKaarten;i++) {
        // voeg aan het begin van een rij een linebreak toe (behalve op eerste rij)
        if (i%global.AANTAL_KAARTEN_HORIZONTAAL==0 && i!=0) {
            lineBreakElement=document.createElement("br");
            playField.appendChild(lineBreakElement);
        }
		// voeg een vak + kaart toe aan het speelveld
		addVak(playField, kaartNummers[i]);
	}
}


window.addEventListener("load", initialize);