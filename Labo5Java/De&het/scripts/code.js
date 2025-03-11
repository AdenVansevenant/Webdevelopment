const setup = () => {
    let tekst = "Gisteren zat de jongen op de stoep en at de helft van de appel";
    let resultaat = "";
    let woord = "";

    for (let i = 0; i < tekst.length; i++) {
        if (tekst[i] === " ") {
            if (woord.toLowerCase() === "de") {
                resultaat += "het ";
            } else {
                resultaat += woord + " ";
            }
            woord = "";
        } else {
            woord += tekst[i];
        }
    }

    if (woord.toLowerCase() === "de") {
        resultaat += "het";
    } else {
        resultaat += woord;
    }

    console.log(resultaat);
}

window.addEventListener("load", setup);
