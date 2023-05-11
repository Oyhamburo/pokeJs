import { healthBarAnimationNone, healthBar } from '../battle/animation/lifeBar.js'
import { teamPokemons, changePositionArray, pokemonInicial, bagObject } from './index.js'
import { changeSprite } from '../battle/index.js'
import { inventoryMasterball, inventoryPokeball, lifeBarPokemonPlayer } from '../utils/index.js'


const SLOTS = document.getElementById('slots-inventory')
const initIMG = document.getElementById('init-inventory-img')
const initLIFEBAR = document.getElementById('init-inventory-lifebar')
const initNAME = document.getElementById('init-inventory-name')
const backBtn = document.querySelector('.inventory__back')
const invetory = document.getElementById('inventory')

let stateFigthPokemon = false
let stateOpenInventory = false

const changeStateFigthPokemon = state => {
    stateFigthPokemon = state
}
const changeOpenInventory = state => {
    stateOpenInventory = state
}
/**
 * Open Inventory
 */
const openInventory = () => {
    changeOpenInventory(true)
    inventory(false)
    invetory.style.display = 'flex'
    backBtn.addEventListener('click', closeInventory, true)
}
/**
 * Close Inventory
 */
const closeInventory = () => {
    backBtn.removeEventListener('click', closeInventory, true)
    changeOpenInventory(false)
    invetory.style.display = 'none'
}


/**
 * Update Inventory
 * @param {Boolean} combat True if it's a battle  
 * @returns 
 */
const inventory = combat => {
    if (teamPokemons.length) {
        inventoryMasterball.textContent = 'x' + bagObject.cantMasterball()
        inventoryPokeball.textContent= 'x' + bagObject.cantPokeball()
        const FIRST = 0
        SLOTS.innerHTML = ''
        teamPokemons.forEach((pokemon, index) => {
            let life = pokemon.getHealth()
            let name = pokemon.getName()
            if (index === FIRST) {
                let image = pokemon.getImage('front')
                initIMG.src = image
                initNAME.textContent = name
                healthBarAnimationNone(initLIFEBAR, life)
            } else {
                let slotBar = 'slot-lifebar-' + index
                let url = pokemon.getImage('thumnail')
                let htmlSlot = `<div class="inventory__container__slots__ind" id="slot-slot-${index}">
                    <div class="inventory__container__slots__ind__left" id="slot-left-${index}">
                      <div class="inventory__container__slots__ind__left__img" id="slot-divimg-${index}">
                        <img
                          src="${url}"
                          alt="thumnail" id="slot-img-${index}">
                      </div>
                    </div>
                    <div class="inventory__active__container__rigth" id="slot-rigth-${index}">
                      <span id="slot-name-${index}" >${name}</span>
                      <div class="inventory__active__container__health" id="slot-health-${index}">
                        <div id="slot-hp-${index}" >HP:</div>
                        <div class="inventory__active__container__health__bar" id="slot-lifebar-${index}" ></div>
                      </div>
                    </div>
                </div>`

                SLOTS.innerHTML += htmlSlot


                const slotLifeBar = document.getElementById(slotBar)
                healthBarAnimationNone(slotLifeBar, life)

            }
        })
        if (combat) {
            buttonsInventory(changePositionInventoryBattle, false)
        } else {
            buttonsInventory(changePositionInventory, false)
        }
    } else {
        return false
    }
}

const buttonsInventory = (typeFunction, remove) => {
    for (let index = 1; index < teamPokemons.length; index++) {
        if (!remove) {
            document.getElementById(`slot-slot-${index}`).addEventListener('click', typeFunction, true)
        } else {
            document.getElementById(`slot-slot-${index}`).removeEventListener('click', typeFunction, true)
        }
    }
}

const changePositionInventoryBattle = event => {
    let id = parseInt(event.explicitOriginalTarget.id.slice(-1))
    buttonsInventory(changePositionInventoryBattle, true)
    changePositionArray(id)
    invetory.style.display = 'none'
    const position = { x: 220, y: 210 }
    const size = { x: 450, y: 450 }
    const newSprite = pokemonInicial.createSprite(position, size, false)
    changeSprite(newSprite)
    let life = pokemonInicial.getHealth()
    healthBar(lifeBarPokemonPlayer, life)
}

const changePositionInventory = event => {
    // console.log('aca: ',event.explicitOriginalTarget.id)
    let id = parseInt(event.target.id.slice(-1))
    // let id = parseInt(event.explicitOriginalTarget.id)
    // console.log(id)
    buttonsInventory(changePositionInventory, true)
    changePositionArray(id)
    inventory()
}


export { inventory, changeStateFigthPokemon, stateFigthPokemon, openInventory, closeInventory, stateOpenInventory, changeOpenInventory }