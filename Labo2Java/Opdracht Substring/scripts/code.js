const setup = () => {
    let btnSubstring = document.getElementById("btn");
    btnSubstring.addEventListener("click", Substring);
}

const Substring = () => {
    let txtInput = document.getElementById("txtInput").value;
    let start = parseInt(document.getElementById("start").value);
    let end = parseInt(document.getElementById("end").value);
    let txtOutput = document.getElementById("txtOutput");

    txtOutput.innerHTML = txtInput.substring(start, end);

}

window.addEventListener("load", setup);
