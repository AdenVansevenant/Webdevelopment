const setup = () => {
        document.querySelectorAll("li").forEach(li => li.classList.add("listitem"));
}
window.addEventListener("load", setup);