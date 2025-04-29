const searchButton = document.getElementById('search-button');
const hiddenResults = document.getElementById('hidden-results');
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const weightEl = document.getElementById('weight');
const heightEl = document.getElementById('height');
const hpEl = document.getElementById('hp');
const attackEl = document.getElementById('attack');
const defenseEl = document.getElementById('defense');
const spAttackEl = document.getElementById('special-attack');
const spDefenseEl = document.getElementById('special-defense');
const speedEl = document.getElementById('speed');
const statsElArray = [hpEl, attackEl, defenseEl, spAttackEl, spDefenseEl, speedEl];
const imageContainerEl = document.getElementById('img-container');
const typesContainer = document.getElementById('types');

const fetchData = async (nameOrId) => {
    try {
        const pokemon = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
        const res = await fetch(pokemon);
        const data = await res.json();
        return data;
    }
    catch (err) {
        alert('Pokémon not found');
        clearContents();
        console.log(`An error occured while trying to load the data. Error: ${err}`)    
    }
};

const getPokemon = () => {

    clearContents();

    let input = document.getElementById("search-input").value;
    
    if (!input) {

        return;
    }
    if (typeof(input) === 'string') {
        input = input.toLowerCase();
    }

    const dat = fetchData(input);

    dat.then((data) => {
        const {
            id,
            name,
            height,
            weight,
        } = data
        
        const spriteUrl = data.sprites.front_default;
        const statsArr = [];
        const types = [];

        for (const element of data.stats) {
            statsArr.push(element.base_stat);
        }
        for (const type of data.types) {
            types.push(type.type.name)
        }
        // Populate the elements
        nameEl.textContent = name.toUpperCase();
        idEl.textContent = `#${id}`;
        weightEl.textContent = `Weight: ${weight}`;
        heightEl.textContent = `Height: ${height}`;
        // Populate stats elements
        for (let i = 0; i < statsArr.length; i++) {
            statsElArray[i].innerText = statsArr[i];
        }
        // Create the image element
        imageContainerEl.innerHTML = `
        <img width="200px" id="sprite" src="${spriteUrl}" height="200px" alt="${name} pokemon sprite">
        `;
        // Create the types
        for (const type of types) {
            typesContainer.innerHTML += `<span class="${type}">${type.toUpperCase()}</span>`
        }
    })
        
}

const clearContents = () => {
    nameEl.textContent = '';
    idEl.textContent = '';
    weightEl.textContent = '';
    heightEl.textContent = '';
    for (let i = 0; i < statsElArray.length; i++) {
        statsElArray[i].innerText = '-';
    }
    imageContainerEl.innerHTML = '';
    typesContainer.innerHTML = '';
}

searchButton.addEventListener("click", getPokemon);