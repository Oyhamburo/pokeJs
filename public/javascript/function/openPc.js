import { removeInteraction } from "../interaction/removeInteraction.js"
import { teamPokemons, actTeamAndPc } from "../invertory/playerInventory.js"
import { displayFLEX, displayNONE, LOCALHOST, MAXTEAM, MINTEAM, pcBackBtn, pcHtml, slotPc, slotPcTeam } from "../utils/index.js"
import { getPc } from "./getPc.js"

let stateOpenPc = false
const changeOpenPc = state => stateOpenPc = state
let btnArray = []

const openPc = () => {
    changeOpenPc(true)
    removeInteraction()
    pcInit()
    pcHtml.style.display = displayFLEX
    pcBackBtn.addEventListener('click', closePc, true)
}

const closePc = () => {
    pcBackBtn.removeEventListener('click', closePc, true)
    changeOpenPc(false)
    pcHtml.style.display = displayNONE
}

const pcInit = async () => {
    slotPcTeam.innerHTML = ''
    slotPc.innerHTML = ''
    let pc = await getPc()
    let act = await actTeamAndPc(pc.pokemons)
    if (pc.pokemons) {

        pc.pokemons.forEach((pokemon, index) => {
            let { name, image, _id } = pokemon
            if (pokemon.team) {
                // imprimo html de mi equipo
                let htmlSlot = `<div class="pc__container__slots__left__ind" id="${_id}">
                    <div class="pc__container__slots__left__ind__left" id="slot-left-${_id}">
                    <div class="pc__container__slots__left__ind__left__img" id="slot-divimg-${_id}">
                    <img src="${image.thumnail}" alt="thumnail" id="slot-img-${_id}">
                    </div>
                    <span id="slot-name-${_id}">${name}</span>
                    </div>
                    </div>`
                slotPcTeam.innerHTML += htmlSlot

            } else {

                let htmlSlot = `<div class="pc__container__slots__left__ind" id="${_id}">
                    <div class="pc__container__slots__left__ind__left" id="slot-left-${_id}">
                    <div class="pc__container__slots__left__ind__left__img" id="slot-divimg-${_id}">
                    <img src="${image.thumnail}" alt="thumnail" id="slot-img-${_id}">
                    </div>
                    <span id="slot-name-${_id}">${name}</span>
                    </div>
                    </div>`

                slotPc.innerHTML += htmlSlot
            }

        })
        btnArray = pc.pokemons
        createButtons(movePokemon, pc.pokemons, false)

    }
}

const createButtons = (typeFunction, array, remove) => {
    array.forEach(element => {
        const { _id } = element
        if (!remove) {
            document.getElementById(_id).addEventListener('click', typeFunction, true)
        } else {
            document.getElementById(_id).removeEventListener('click', typeFunction, true)
        }
    })
}

const movePokemon = async (event) => {
    createButtons(movePokemon, btnArray, true)
    let positionArray = event.target.id.split('-')
    let id = positionArray[positionArray.length - 1]
    let pc = await getPc()
    let error

    pc.pokemons.forEach(pokemon => {
        if (pokemon._id == id) {
            if (pokemon.team === true) {
                if (teamPokemons.length === MINTEAM) {
                    console.error('Minimo del equipo 1 pokemon')
                    error = true
                    createButtons(movePokemon, btnArray, false)
                } else {
                    pokemon.team = false
                }
            } else {
                if (teamPokemons.length === MAXTEAM) {
                    console.error('Maximo del equipo 6 pokemones')
                    error = true
                    createButtons(movePokemon, btnArray, false)
                } else {
                    pokemon.team = true
                }
            }
        }
    })

    if (!error) {
        const url = `${LOCALHOST}api/pc/${pc._id}`
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(pc),
        })
        response.ok ? pcInit() : console.error(response)
    }

}


export { openPc }