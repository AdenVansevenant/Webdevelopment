const setup = () => {
    let student = {
        voornaam: "Jan",
        familienaam: "Janssens",
        geboorteDatum: new Date("1993-12-31"),
        adres: {
            straat: "Kerkstraat 13",
            postcode: "8500",
            gemeente: "Kortrijk"
        },
        isIngeschreven: true,
        namenVanExen: ["Sofie", "Berta", "Philip", "Albertoooo"],
        aantalAutos: 2
    };
    const jsonString = JSON.stringify(student);
    console.log(jsonString);


    let student2 = JSON.parse(jsonString);

    console.log(student2.voornaam);
    console.log(student2.geboorteDatum);

    student2.geboorteDatum = new Date(student2.geboorteDatum);
    console.log(student2.geboorteDatum.toDateString());



}
window.addEventListener("load", setup);