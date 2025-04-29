const setup = () => {
    const getalInput = document.getElementById("getal");
    const getalLabel = document.getElementById("getalLabel");
    const formulier = document.getElementById("tafelForm");
    const tafelsContainer = document.getElementById("tafels");

    let toegevoegdeTafels = JSON.parse(sessionStorage.getItem("tafels")) || [];

    getalLabel.addEventListener("click", () => getalInput.focus());

    formulier.addEventListener("submit", (e) => {
        const waarde = getalInput.value.trim();

        const getal = Number(waarde);

        const tijdstip = new Date().toLocaleTimeString();
        toegevoegdeTafels.push({ getal, tijdstip });

        sessionStorage.setItem("tafels", JSON.stringify(toegevoegdeTafels));

        getalInput.value = "";
        toonTafels();
    });

    const toonTafels = () => {
        tafelsContainer.innerHTML = "";

        toegevoegdeTafels.forEach((tafelInfo) => {
            const getal = tafelInfo.getal;
            const tijdstip = tafelInfo.tijdstip;

            const tafelBlok = document.createElement("div");
            tafelBlok.className = "tafel";

            const kop = document.createElement("div");
            kop.className = "tafel-header";
            kop.textContent = "Tafel van " + getal + " aangemaakt op: " + tijdstip;
            tafelBlok.appendChild(kop);

            for (let i = 1; i <= 10; i++) {
                const rij = document.createElement("div");
                rij.className = "rij";
                if (i % 2 === 0) {
                    rij.classList.add("even");
                }
                rij.textContent = i + " x " + getal + " = " + (i * getal);
                tafelBlok.appendChild(rij);
            }

            tafelsContainer.appendChild(tafelBlok);
            getalInput.focus();
        });
    };

    toonTafels();
};

window.addEventListener("load", setup);
