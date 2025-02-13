const setup = () => {
    let btnKopieer = document.getElementById("btnKopieer");
    btnKopieer.addEventListener("click", kopieer);
}
window.addEventListener("load", setup);
const kopieer = () => {
    let txtInput = document.getElementById("txtInput");
    let tekst = txtInput.value;
    txtOutput.innerHTML = txtInput.value;
    console.log(tekst);
}