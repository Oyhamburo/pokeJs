import { rectangularCollision, changeNpcDetected, transitionBlackOut } from "../function/index.js"
import { player } from "../player/index.js"
import { keys, lastKey } from "../keys/keys.js"
import { changeAnimation } from "./changeAnimation.js"
import { createBackground, createBoundaries, createMovables, createForeground } from "../map/index.js"
import { collisionsDockeTown } from "../coordinates/index.js"
import { stateInteraction } from "../interaction/stateInteraction.js"
import { removeInteraction } from "../interaction/removeInteraction.js"
import { randomBattle, initBattle, changeCombatState } from "../battle/index.js"
import { BATTLEZONE, DOOR, NPC, WALL } from "../map/index.js"
import { stateHealthPokemonInventory } from "../invertory/index.js"
import { statePrintDeathPokemon } from "../dialog/index.js"

// Ubicacion de Mapas
const dockeTown = 'dockeTown/dockeTown'
const dockeTownForeground = 'dockeTown/dockeTownForeground'
const boundaryX = 45
const boundaryY = 45

// codigos de bloques

let foregroundTown = createForeground(dockeTownForeground)
let backgroundTown = createBackground(dockeTown)
let boundariesTow = createBoundaries(collisionsDockeTown, boundaryX, boundaryY)
let movablesTown = createMovables(backgroundTown, boundariesTow, foregroundTown)

let animate = async () => {
    const animationId = window.requestAnimationFrame(animate)
    backgroundTown.draw()
    player.draw()
    foregroundTown.draw()
    //dibujar el perimetro

    // boundariesTow.forEach((boundary) => {
    //     boundary.draw()
    //     if (rectangularCollision({
    //         rectangle1: player,
    //         rectangle2: boundary
    //     })) {
    //         console.log("CollisionBoundary")
    //     }
    // })

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey == 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundariesTow.length; i++) {
            const boundary = boundariesTow[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })) {
                if (boundary.symbol === WALL)
                    moving = false
                if (boundary.symbol > DOOR.start && boundary.symbol <= DOOR.final) {
                    window.cancelAnimationFrame(animationId)
                    changeAnimation(boundary.symbol)
                }
                if (boundary.symbol > NPC.start && boundary.symbol <= NPC.final) {
                    moving = false
                    changeNpcDetected(true, boundary.symbol)
                }
                if (boundary.symbol == BATTLEZONE) {
                    if (randomBattle()) {
                        if (stateHealthPokemonInventory()) {
                            window.cancelAnimationFrame(animationId)
                            transitionBlackOut()
                            let init = await initBattle()
                            if (init) {
                                changeCombatState(true)
                                changeAnimation(boundary.symbol)
                            }
                        } else {
                            statePrintDeathPokemon()
                        }
                    }
                }
                break
            }
        }
        if (moving)
            movablesTown.forEach((movable) => {
                movable.position.y += 3
            })
        stateInteraction ? removeInteraction() : ''
    }
    else if (keys.a.pressed && lastKey == 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundariesTow.length; i++) {
            const boundary = boundariesTow[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })) {
                if (boundary.symbol === WALL)
                    moving = false
                if (boundary.symbol > DOOR.start && boundary.symbol <= DOOR.final) {
                    window.cancelAnimationFrame(animationId)
                    changeAnimation(boundary.symbol)
                }
                if (boundary.symbol > NPC.start && boundary.symbol <= NPC.final) {
                    moving = false
                    changeNpcDetected(true, boundary.symbol)
                }
                if (boundary.symbol == BATTLEZONE) {
                    if (randomBattle()) {
                        if (stateHealthPokemonInventory()) {
                            window.cancelAnimationFrame(animationId)
                            transitionBlackOut()
                            let init = await initBattle()
                            if (init) {
                                changeCombatState(true)
                                changeAnimation(boundary.symbol)
                            }
                        } else {
                            statePrintDeathPokemon()
                        }
                    }
                }
                break
            }
        }
        if (moving)
            movablesTown.forEach((movable) => {
                movable.position.x += 3
            })
        stateInteraction ? removeInteraction() : ''
    }
    else if (keys.s.pressed && lastKey == 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundariesTow.length; i++) {
            const boundary = boundariesTow[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {
                if (boundary.symbol === WALL)
                    moving = false
                if (boundary.symbol > DOOR.start && boundary.symbol <= DOOR.final) {
                    window.cancelAnimationFrame(animationId)
                    changeAnimation(boundary.symbol)
                }
                if (boundary.symbol > NPC.start && boundary.symbol <= NPC.final) {
                    moving = false
                    changeNpcDetected(true, boundary.symbol)
                }
                if (boundary.symbol == BATTLEZONE) {
                    if (randomBattle()) {
                        if (stateHealthPokemonInventory()) {
                            window.cancelAnimationFrame(animationId)
                            transitionBlackOut()
                            let init = await initBattle()
                            if (init) {
                                changeCombatState(true)
                                changeAnimation(boundary.symbol)
                            }
                        } else {
                            statePrintDeathPokemon()
                        }
                    }
                }
                break
            }
        }
        if (moving)
            movablesTown.forEach((movable) => {
                movable.position.y -= 3
            })
        stateInteraction ? removeInteraction() : ''
    }
    else if (keys.d.pressed && lastKey == 'd') {
        player.moving = true
        player.image = player.sprites.rigth
        for (let i = 0; i < boundariesTow.length; i++) {
            const boundary = boundariesTow[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })) {
                if (boundary.symbol === WALL)
                    moving = false
                if (boundary.symbol > DOOR.start && boundary.symbol <= DOOR.final) {
                    window.cancelAnimationFrame(animationId)
                    changeAnimation(boundary.symbol)
                }
                if (boundary.symbol > NPC.start && boundary.symbol <= NPC.final) {
                    moving = false
                    changeNpcDetected(true, boundary.symbol)
                }
                if (boundary.symbol == BATTLEZONE) {
                    if (randomBattle()) {
                        if (stateHealthPokemonInventory()) {
                            window.cancelAnimationFrame(animationId)
                            transitionBlackOut()
                            let init = await initBattle()
                            if (init) {
                                changeCombatState(true)
                                changeAnimation(boundary.symbol)
                            }
                        } else {
                            statePrintDeathPokemon()
                        }
                    }
                }
                break
            }
        }
        if (moving)
            movablesTown.forEach((movable) => {
                movable.position.x -= 3
            })
        stateInteraction ? removeInteraction() : ''
    }


}
export { animate as animateTown }
