const inputName = document.querySelector('#inputName');
const listPokemon = document.querySelector('#listPokemon');
const imgPokemon = document.querySelector('.img-container');
const inputContainer = document.querySelector('.input-container')
const congratulation = document.querySelector('.congratulation')
const replay = document.querySelector('.replay')

let valueRadom = () => {
    var value = Math.floor(Math.random() * 41);
    if(value == 0) {
        value = 1;
    }
    return value;
}

const numberRadom = valueRadom();

const getPokemonUrl = pokemonNumber => `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

function createTagLi(pokemon) {
    var li = document.createElement("li");
    li.innerHTML = pokemon.data.name[0].toUpperCase() + pokemon.data.name.substring(1);
    li.setAttribute("class", "arrayLi");
    li.setAttribute("id", pokemon.data.name);
    listPokemon.appendChild(li);
}

function createTagImg(pokemon) {
    var img = document.createElement("img");
    img.setAttribute("class", "imgPokemon")
    img.setAttribute("src", pokemon.data.sprites.front_default)
    imgPokemon.appendChild(img);
}

function resetPage() {
    document.location.reload(true)
}

const getPokemon = async () => {
    const promisePokemon = axios.get(getPokemonUrl(numberRadom))

    const pokemon = await promisePokemon

    return pokemon.data.name
}

const getImage = async () => {
    const promisePokemon = axios.get(getPokemonUrl(numberRadom))

    const pokemon = await promisePokemon

    createTagImg(pokemon)
}

async function listName() {
    for(var i = 1; i <= 40; i++) {
        const promisePokemon = axios.get(getPokemonUrl(i))
        var pokemon = await promisePokemon
        createTagLi(pokemon)
    }
}

getImage()
listName()

async function result() {
    retorno = await getPokemon()

    let arrayLi = document.querySelectorAll('.arrayLi')

    for(li of arrayLi) {
        if(inputName.value.toLowerCase() == li.textContent.toLowerCase()) {
            document.getElementById(`${li.textContent.toLowerCase()}`).style.textDecoration = "line-through"
        }
    }

    if (inputName.value.toLowerCase() == retorno) {
        imgPokemon.style.display = "none"
        inputContainer.style.display = "none"
        congratulation.style.display = "block"
        setInterval(() => {
            congratulation.style.visibility = (congratulation.style.visibility == 'hidden' ? '' : 'hidden');
        }, 300);
        setTimeout(resetPage, 2000)
    } else {
        imgPokemon.style.display = "none"
        inputContainer.style.display = "none"
        replay.style.display = "block"
        setTimeout(() => {
            imgPokemon.style.display = "block"
            inputContainer.style.display = "flex"
            replay.style.display = "none"
        }, 1000)
    }
}