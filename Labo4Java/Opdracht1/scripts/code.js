const setup = () => {
    let leeftijd = 34;
    let intrest = 0.12;
    let gevaarlijk = true;
    let vandaag = new Date();

    document.getElementById("leeftijd").textContent = typeof leeftijd;
    document.getElementById("intrest").textContent = typeof intrest;
    document.getElementById("gevaarlijk").textContent = typeof gevaarlijk;
    document.getElementById("vandaag").textContent = typeof vandaag;
    document.getElementById("print").textContent = typeof print;
}
window.addEventListener("load", setup);