const herbereken = () => {
    const prijzen = document.getElementsByClassName("prijs");
    const aantallen = document.getElementsByClassName("aantal");
    const btwTarieven = document.getElementsByClassName("btw");
    const subtotals = document.getElementsByClassName("subtotaal");
    let totaal = 0;

    for (let i = 0; i < prijzen.length; i++) {
        let prijs = parseFloat(prijzen[i].textContent.replace(" Eur", ""));
        let aantal = parseFloat(aantallen[i].value);
        let btw = parseFloat(btwTarieven[i].textContent.replace("%", "")) / 100;

        let subtotaal = aantal * prijs * (1 + btw);
        subtotals[i].textContent = subtotaal.toFixed(2) + " Eur";
        totaal += subtotaal;
    }

    document.getElementById("totaal").textContent = totaal.toFixed(2) + " Eur";
};

document.getElementById("herbereken").addEventListener("click", herbereken);
