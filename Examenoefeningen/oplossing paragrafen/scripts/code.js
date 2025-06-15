const setup = () => {
    let pBelangrijk = document.getElementsByClassName("belangrijk");
    for (let i=0;i<pBelangrijk.length;i++) {
        pBelangrijk[i].className+=" opvallend";
    }

    // let paragrafen=document.getElementsByTagName("p");
    // paragrafen[1].className="belangrijk opvallend";
    // paragrafen[3].className="belangrijk opvallend";
}


window.addEventListener("load", setup);