const setup = () => {
    const button = document.getElementById('processButton');
    button.addEventListener('click', splitText);
};

const splitText = () => {
    let input = document.getElementById('inputField').value;
    let geenSpaties = input.replace(/\s+/g, '');
    console.log(geenSpaties);
};

window.addEventListener("load", setup);