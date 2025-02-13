const setup = () => {
    let btn = document.getElementById("btn");
    let pElement = document.getElementById("txtOutput");

    btn.addEventListener("click", () => {
        pElement.innerHTML = "Welkom!";
    });
}

window.addEventListener("load", setup);
