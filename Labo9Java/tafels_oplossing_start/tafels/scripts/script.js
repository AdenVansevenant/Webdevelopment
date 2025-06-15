const setup = () => {
    const getalInput = document.getElementById("getal");
    const getalLabel = document.getElementById("getalLabel");
    const formulier = document.getElementById("tafelForm");
    const tafelsContainer = document.getElementById("tafels");

    let toegevoegdeTafels = JSON.parse(sessionStorage.getItem("tafels")) || [];

    getalLabel.addEventListener("click", () => getalInput.focus());

    formulier.addEventListener("submit", (e) => {
        e.preventDefault(); // belangrijk om de pagina niet te herladen bij submit

        const waarde = getalInput.value.trim();
        const getal = Number(waarde);

        if (!isNaN(getal) && getal > 0) {
            const tijdstip = new Date().toLocaleTimeString();
            toegevoegdeTafels.push({ getal, tijdstip });

            sessionStorage.setItem("tafels", JSON.stringify(toegevoegdeTafels));

            getalInput.value = "";
            toonTafels();
        }
    });

    const toonTafels = () => {
        // Leegmaken zonder innerHTML
        while (tafelsContainer.firstChild) {
            tafelsContainer.removeChild(tafelsContainer.firstChild);
        }

        for (let i = 0; i < toegevoegdeTafels.length; i++) {
            const tafelInfo = toegevoegdeTafels[i];
            const getal = tafelInfo.getal;
            const tijdstip = tafelInfo.tijdstip;

            const tafelBlok = document.createElement("div");
            tafelBlok.className = "tafel";

            const kop = document.createElement("div");
            kop.className = "tafel-header";
            const kopText = document.createTextNode("Tafel van " + getal + " aangemaakt op: " + tijdstip);
            kop.appendChild(kopText);
            tafelBlok.appendChild(kop);

            for (let j = 1; j <= 10; j++) {
                const rij = document.createElement("div");
                rij.className = "rij";
                if (j % 2 === 0) {
                    rij.classList.add("even");
                }

                const rijText = document.createTextNode(j + " x " + getal + " = " + (j * getal));
                rij.appendChild(rijText);
                tafelBlok.appendChild(rij);
            }

            tafelsContainer.appendChild(tafelBlok);
        }

        getalInput.focus();
    };

    toonTafels();
};

window.addEventListener("load", setup);
