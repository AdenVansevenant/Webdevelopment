const setup = () => {
    const keuzelijst = document.getElementById("keuzelijst");
    keuzelijst.addEventListener('change', update);

    const letterInput = document.getElementById("letter");
    letterInput.addEventListener('input', update);
};

const update = () => {
    let img = document.getElementById("img");
    let note = document.getElementById("note");
    let letterInput = document.getElementById("letter");
    let staat = document.getElementById("keuzelijst").value;
    let teller = 0;

    // Beeld aanpassen op basis van keuze
    if (staat === "MetEi") {
        img.classList.add("WithEgg");
        img.classList.remove("Without-Egg", "hidden");
        note.textContent = "Hierboven, een kip met een ei.";
    } else if (staat === "ZonderEi") {
        img.classList.add("Without-Egg");
        img.classList.remove("WithEgg", "hidden");
        note.textContent = "Hierboven, een kip zonder ei.";
    } else {
        img.classList.add("hidden");
        note.textContent = "";
    }

    // Letter zoeken
    let letter = letterInput.value.toLowerCase();
    let noteText = note.textContent.toLowerCase();

    for (let i = 0; i < noteText.length; i++) {
        if (noteText[i] === letter) {
            teller++;
        }
    }

    if (letter) {
        note.textContent += ` Letter "${letter}" komt ${teller} keer voor in de zin.`;
    }
};

window.addEventListener("load", setup);
