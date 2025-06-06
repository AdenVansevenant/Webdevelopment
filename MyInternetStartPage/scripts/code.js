let input;

const setup = () => {
    input = document.getElementById('tekstvak');
    document.getElementById('zoekknop').addEventListener('click', maakcommando);
    document.getElementById('sorteerSelect').addEventListener('change', () => {
        const sortOrder = document.getElementById('sorteerSelect').value;
        toonHistory(JSON.parse(localStorage.history || "[]"), sortOrder);
    });

    const sortOrder = document.getElementById('sorteerSelect').value;
    if (localStorage.history) {
        toonHistory(JSON.parse(localStorage.history), sortOrder);
    }
};

const maakcommando = () => {
    const waarde = input.value.trim();
    const delen = waarde.split(' ');

    if (delen.length < 2) {
        alert('Typ een commando met een zoekterm.');
        return;
    }

    const commando = delen[0];
    const zoekterm = delen.slice(1).join('+');
    const zoektekst = zoekterm.replace(/\+/g, ' ');

    let titel, url, kleur;

    if (commando === '/g') {
        titel = 'Google';
        url = 'https://www.google.com/search?q=' + zoekterm;
        kleur = '#4285F4';
    } else if (commando === '/y') {
        titel = 'YouTube';
        url = 'https://www.youtube.com/results?search_query=' + zoekterm;
        kleur = '#FF0000';
    } else if (commando === '/x') {
        titel = 'Twitter';
        url = 'https://x.com/hashtag/' + zoekterm;
        kleur = '#000000';
    } else if (commando === '/i') {
        titel = 'Instagram';
        url = 'https://www.instagram.com/explore/tags/' + zoekterm + '/';
        kleur = '#C13584';
    } else {
        alert('Ongeldig commando!');
        return;
    }

    const item = { title: titel, text: zoektekst, url: url, color: kleur };

    let geschiedenis = [];
    if (localStorage.history) {
        geschiedenis = JSON.parse(localStorage.history);
    }
    geschiedenis.push(item);
    localStorage.history = JSON.stringify(geschiedenis);

    window.open(url, '_blank');
    input.value = '';

    const sortOrder = document.getElementById('sorteerSelect').value;
    toonHistory(geschiedenis, sortOrder);
};

const sorteerGeschiedenis = (geschiedenis, sortOrder = 'asc') => {
    const volgorde = ['Google', 'YouTube', 'Twitter', 'Instagram'];

    return geschiedenis.sort((a, b) => {
        const volgordeA = volgorde.indexOf(a.title);
        const volgordeB = volgorde.indexOf(b.title);

        if (volgordeA !== volgordeB) {
            return volgordeA - volgordeB;
        }

        const vergelijking = a.text.toLowerCase().localeCompare(b.text.toLowerCase());
        return sortOrder === 'asc' ? vergelijking : -vergelijking;
    });
};

const removeHistoryItem = (index) => {
    let geschiedenis = JSON.parse(localStorage.history);
    geschiedenis.splice(index, 1);
    localStorage.history = JSON.stringify(geschiedenis);

    const sortOrder = document.getElementById('sorteerSelect').value;
    toonHistory(geschiedenis, sortOrder);
};

const toonHistory = (geschiedenis, sortOrder = 'asc') => {
    const container = document.getElementById('rij');
    container.innerHTML = '';

    geschiedenis = sorteerGeschiedenis(geschiedenis, sortOrder);

    geschiedenis.forEach((item, index) => {
        container.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100" style="background-color: ${item.color};">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title text-white">${item.title}</h5>
                            <p class="card-text text-white">${item.text}</p>
                        </div>
                        <a href="${item.url}" target="_blank" class="btn btn-light mt-3">Go!</a>
                        <button class="btn btn-danger mt-3" onclick="removeHistoryItem(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
};

window.addEventListener('load', setup);
