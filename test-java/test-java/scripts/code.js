const setup = () => {
    const keuzelijst = document.getElementById("Keuzelijst");
    keuzelijst.addEventListener('input', update);
}

const update = () => {
    let img = document.getElementById("img");
    let note = document.getElementById("note");
    let letterInput = document.getElementById("Letter");
    let staat = document.getElementById("Keuzelijst").value;
    let teller = 0;

    if (staat === "MetEi") {
        img.classList.add("WithEgg");
        img.classList.remove("Hidden");
        note.textContent = "Hierboven, een kip met een ei.";
    } else if (staat === "ZonderEi") {
        img.classList.remove("WithEgg");
        img.classList.remove("Hidden");
        note.textContent = "Hierboven, een kip zonder ei.";
    } else {
        img.classList.add("Hidden");
        note.textContent = "";
    }

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
}

window.addEventListener("load", setup);
