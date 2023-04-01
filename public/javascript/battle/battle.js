import { enemyPokemon } from "./enemy/enemy.js"
import { pokemonInicial } from "../invertory/playerInventory.js"
import { healthBar, healthBarAnimationNone } from "../battle/animation/lifeBar.js"
import { addPokemon, writeChat } from "../function/index.js"
import { lifeBarEnemy, lifeBarPokemonPlayer, textChatBattle, menuBattle, displayBLOCK, displayNONE, displayFLEX, DEFEAT, VOIDTEXT } from "../utils/index.js"
import { stopButtons, initButtons } from "./index.js"
import { bagObject, inventory } from "../invertory/index.js"

let damage = 20
let combatStatePlayer = false
let combatStateEnemy = false
let combatState = false
let captureState = false
const timeAwait = 250
const timeLong = 1000
const arrayCapture = [{ transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(-90deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(-90deg)" }, { transform: "rotate(0deg)" },]
const invetory = document.getElementById('inventory')
const backBtn = document.querySelector('.inventory__back')

/**
 * @param {Bool} state 
 */
const changeCombatState = state => {
    combatState = state
}
/**
 * @param {Bool} state 
 */
const changeCombatStateEnemy = state => {
    combatStateEnemy = state
}
/**
 * @param {Bool} state 
 */
const changeCombatStatePlayer = state => {
    combatStatePlayer = state
}
const changeCaptureState = state => {
    captureState = state
}

const atack = () => {
    stopButtons()
    changeCombatStatePlayer(true)
    let life = enemyPokemon.damage(damage)
    healthBar(lifeBarEnemy, life)
    textMenuBattle()
}

const capture = async () => {

    let pokeball = await bagObject.pokeball()

    if (pokeball) {
        const containerBall = document.getElementById('pokeballBatlleContainer')
        const ball = document.getElementById('pokeballBatlle')
        containerBall.style.display = displayBLOCK
        stopButtons()
        addPokemon()

        containerBall.animate([
            { // from
                left: '18%',
                bottom: '23%'
            },
            { // to
                left: '78%',
                bottom: '71%'
            }
        ], {
            duration: 800,
            fill: "forwards"
        })

        ball.animate([
            { transform: "rotate(360deg)" },
        ], {
            duration: 240,
            iterations: Infinity,
            easing: "linear"
        })

        setTimeout(() => {
            containerBall.style.display = displayNONE
            containerBall.style.display = displayBLOCK

            changeCaptureState(true)


            containerBall.animate([
                { // from
                    left: '78%',
                    bottom: '71%'
                },
                { // to
                    left: '78%',
                    bottom: '62%'
                }
            ], {
                duration: 300,
                fill: "forwards"
            })

            ball.animate(
                arrayCapture,
                {
                    duration: 3500,
                    fill: "forwards"
                })

            setTimeout(() => {
                textChatBattle.style.zIndex = '9'
                let nameEnemy = enemyPokemon.getName().toUpperCase()
                let text = `${nameEnemy} ha sido capturado!!!,#
                Lo podras encontrar en tu pc.#                         
                Haz click para finalizar el combate...`
                writeChat(textChatBattle, text)
                textChatBattle.addEventListener('click', finishCapture, true)
            }, 3500);


        }, 900);

    } else {
        textChatBattle.style.zIndex = '9'
        let text = `No posees ninguna PokeBall`
        writeChat(textChatBattle, text)
        setTimeout(() => {
            removeTextMenuBattle()
        }, timeLong);
    }
}

const finishCapture = () => {
    textChatBattle.removeEventListener('click', finishCapture, true)
    const containerBall = document.getElementById('pokeballBatlleContainer')
    containerBall.style.display = displayNONE
    changeCaptureState(false)
    skipBattle()

}

const inventoryBattle = () => {
    inventory(true)
    invetory.style.display = displayFLEX
    invetory.style.backgroundColor = 'rgba(67, 69, 92, 0.8)'
    backBtn.addEventListener('click', back, true)
}

const back = () => {
    backBtn.removeEventListener('click', back, true)
    invetory.style.display = displayNONE
}

const skipBattle = () => {
    changeCombatState(false)
    menuBattle.style.display = displayNONE
    removeTextMenuBattle()
}

const moveEnemy = () => {
    textChatBattle.removeEventListener('click', moveEnemy, true)
    removeTextMenuBattle()
    changeCombatStateEnemy(true)
    setTimeout(() => {
        let life = pokemonInicial.damage(damage)
        healthBar(lifeBarPokemonPlayer, life)
        changeCombatStateEnemy(false)
        if (life > DEFEAT) {
            initButtons()
        } else {
            textChatBattle.style.zIndex = '9'
            let namePokemonPlayer = pokemonInicial.getName().toUpperCase()
            let text = `Tu ${namePokemonPlayer} fue debilitado!!!`
            writeChat(textChatBattle, text)
            textChatBattle.addEventListener('click', finishBattle, true)
        }
    }, timeAwait)

}

const finishBattle = () => {
    textChatBattle.removeEventListener('click', finishBattle, true)
    bagObject.winGold(600)

    skipBattle()
}

const removeTextMenuBattle = () => {
    textChatBattle.style.zIndex = '-9'
    textChatBattle.innerHTML = VOIDTEXT
}

const textMenuBattle = () => {
    textChatBattle.style.zIndex = '9'
    let nameEnemy = enemyPokemon.getName().toUpperCase()
    let namePokemonPlayer = pokemonInicial.getName().toUpperCase()
    let life = enemyPokemon.getHealth()
    if (life > DEFEAT) {
        let text = `Tu ${namePokemonPlayer} del pokemon ataco a ${nameEnemy}!!!,#                         
        Haz click para continuar...`
        writeChat(textChatBattle, text)
        setTimeout(() => {
            changeCombatStatePlayer(false)
            textChatBattle.addEventListener('click', moveEnemy, true)
        }, timeAwait);
    } else {
        let text = ` ${nameEnemy} ha sido derrotado!!!,#
        Haz click para finalizar el combate`
        writeChat(textChatBattle, text)
        setTimeout(() => {
            changeCombatStatePlayer(false)
            textChatBattle.addEventListener('click', finishBattle, true)
        }, timeAwait);
    }
}





export {
    combatStatePlayer,
    combatStateEnemy,
    captureState,
    combatState,
    changeCombatState,
    atack,
    capture,
    inventoryBattle,
    skipBattle,
    changeCaptureState
}
