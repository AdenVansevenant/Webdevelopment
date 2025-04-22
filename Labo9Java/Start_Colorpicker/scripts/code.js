const initialize = () => {
    document.getElementById("btnSave").addEventListener("click", saveSwatch);
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }

    restoreSliderValues();
    restoreSwatches();

    update();
};

const saveSwatch = () => {
    let red = document.getElementById("sldRed").value;
    let green = document.getElementById("sldGreen").value;
    let blue = document.getElementById("sldBlue").value;

    //swatch toevoegen zodat het kan opgelaan worden
    addSwatchComponent(red, green, blue);

    //kleuren opslaan
    storeSwatches();
};

const setColorPickerFromSwatch = (event) => {
    if (event.target.className == "swatch") {
        let swatch = event.target;
        let red = swatch.getAttribute("data-red");
        let green = swatch.getAttribute("data-green");
        let blue = swatch.getAttribute("data-blue");

        document.getElementById("sldRed").value = red;
        document.getElementById("sldGreen").value = green;
        document.getElementById("sldBlue").value = blue;

        update();
    }
};


const deleteSwatch = (event) => {
    let swatchComponents = document.getElementById("swatchComponents");
    let button = event.target;
    let swatch = button.parentNode;
    swatchComponents.removeChild(swatch);

    // bewaar kleurinfo van alle swatches in local storage
    storeSwatches();
};

const update = () => {
    let red = document.getElementById("sldRed").value;
    document.getElementById("lblRed").innerHTML = red;

    let green = document.getElementById("sldGreen").value;
    document.getElementById("lblGreen").innerHTML = green;

    let blue = document.getElementById("sldBlue").value;
    document.getElementById("lblBlue").innerHTML = blue;

    let swatch = document.getElementById("swatch");
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";

    storeSliderValues();
};


window.addEventListener("load", initialize);