window.addEventListener("load", () => {
    const button = document.getElementById('addTextButton');
    button.addEventListener('click', () => {
        let tekst = document.createElement("p");
        tekst.textContent = "blablabla";
        document.getElementById("myDIV").appendChild(tekst);
    });
});