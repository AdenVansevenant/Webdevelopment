const setup = () => {
}
window.addEventListener("load", setup);

alert("Dit is een alert popup!");

let confirmResult = confirm("Wil je doorgaan?");
console.log("Return value van confirm:", confirmResult);

let promptResult = prompt("Typ in:");
console.log("Return value van prompt:", promptResult);
