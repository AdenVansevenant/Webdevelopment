const storeSliderValues = () => {
    let red = document.getElementById("sldRed").value;
    let green = document.getElementById("sldGreen").value;
    let blue = document.getElementById("sldBlue").value;
    localStorage.setItem("sliderValues", JSON.stringify({ red, green, blue }));
};

const restoreSliderValues = () => {
    let saved = localStorage.getItem("sliderValues");
    if (saved) {
        let { red, green, blue } = JSON.parse(saved);
        document.getElementById("sldRed").value = red;
        document.getElementById("sldGreen").value = green;
        document.getElementById("sldBlue").value = blue;
    }
};

const storeSwatches = () => {
    let swatches = [];
    let components = document.getElementById("swatchComponents").children;
    for (let swatch of components) {
        let red = swatch.getAttribute("data-red");
        let green = swatch.getAttribute("data-green");
        let blue = swatch.getAttribute("data-blue");
        swatches.push({ red, green, blue });
    }
    localStorage.setItem("swatches", JSON.stringify(swatches));
};

const restoreSwatches = () => {
    let saved = localStorage.getItem("swatches");
    if (saved) {
        let swatches = JSON.parse(saved);
        for (let swatch of swatches) {
            addSwatchComponent(swatch.red, swatch.green, swatch.blue);
        }
    }
};
