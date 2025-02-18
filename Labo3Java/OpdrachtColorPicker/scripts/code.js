const setup = () => {
    let sliders = document.getElementsByClassName('slider');

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener('input', update);
    }
}

const update = () => {
    let rood = document.getElementsByClassName("rood")[0].value;
    let groen = document.getElementsByClassName("groen")[0].value;
    let blauw = document.getElementsByClassName("blauw")[0].value;

    let veranderkleur = document.getElementsByClassName("veranderkleur")[0];

    veranderkleur.style.backgroundColor = `rgb(${rood}, ${groen}, ${blauw})`;
}

window.addEventListener("load", setup);
