const setup = () => {
    let tekst = document.createElement("p");
    tekst.textContent = "Nieuwe tekst!";
    document.getElementById("myDIV").appendChild(tekst);
}
window.addEventListener("load", setup);