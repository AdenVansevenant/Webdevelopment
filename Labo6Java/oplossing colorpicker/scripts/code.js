	const initialize = () => {
	let sliders = document.getElementsByClassName("slider");
	for (let slider of sliders) {
	slider.addEventListener("input", update);
	slider.addEventListener("change", update);
}
	document.getElementById("btnSave").addEventListener("click", saveSwatch);
	update();
};

	const update = () => {
	let red = document.getElementById("sldRed").value;
	let green = document.getElementById("sldGreen").value;
	let blue = document.getElementById("sldBlue").value;
	document.getElementById("lblRed").innerText = red;
	document.getElementById("lblGreen").innerText = green;
	document.getElementById("lblBlue").innerText = blue;
	document.getElementById("swatch").style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};

	const saveSwatch = () => {
	let red = document.getElementById("sldRed").value;
	let green = document.getElementById("sldGreen").value;
	let blue = document.getElementById("sldBlue").value;
	let color = `rgb(${red}, ${green}, ${blue})`;

	let swatchDiv = document.createElement("div");
	swatchDiv.className = "savedSwatch";
	swatchDiv.style.backgroundColor = color;
	swatchDiv.addEventListener("click", () => {
	document.getElementById("sldRed").value = red;
	document.getElementById("sldGreen").value = green;
	document.getElementById("sldBlue").value = blue;
	update();
});

	let deleteBtn = document.createElement("button");
	deleteBtn.innerText = "X";
	deleteBtn.className = "deleteSwatch";
	deleteBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	swatchDiv.remove();
});

	swatchDiv.appendChild(deleteBtn);
	document.getElementById("savedSwatches").appendChild(swatchDiv);
};

	window.addEventListener("load", initialize);