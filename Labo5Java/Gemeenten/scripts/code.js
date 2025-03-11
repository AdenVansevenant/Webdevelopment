const setup = () => {
    let gemeenten = [];
    let invoer;

    while (true) {
        invoer = prompt("Voer een gemeente in (typ 'stop' om te stoppen):");
        if (invoer === null || invoer.toLowerCase() === "stop") {
            break;
        }
        gemeenten.push(invoer);
    }

    gemeenten.sort();

    let select = document.createElement("select");
    gemeenten.forEach(gemeente => {
        let option = document.createElement("option");
        option.textContent = gemeente;
        select.appendChild(option);
    });

    document.body.appendChild(select);
}
window.addEventListener("load", setup);