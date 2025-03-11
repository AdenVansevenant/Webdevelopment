const setup = () => {
    const word = "onoorbaar";
    let trigrams = [];

    for (let i = 0; i < word.length - 2; i++) {
        trigrams.push(word.substring(i, i + 3));
    }

    trigrams.forEach(trigram => console.log(trigram));
}

window.addEventListener("load", setup);
