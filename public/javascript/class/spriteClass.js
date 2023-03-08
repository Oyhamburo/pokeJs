import { c } from "../canvas/canvas.js"
// Visualizacion del mapa y del personaje
class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height / this.frames.max
        }
        this.moving = false
        this.sprites= sprites
    }
    //funcion para imprimir una imagen en 
    draw() {
        c.drawImage(
            this.image,
            0,
            this.frames.val * this.width,
            this.image.width,
            this.image.height / this.frames.max,
            this.position.x,
            this.position.y,
            this.image.width,
            this.image.height / this.frames.max
        )
        if(!this.moving) return

        if ( this.frames.max > 1){
            this.frames.elapsed++
        }
        if ( this.frames.elapsed % 10 === 0){
            if (this.frames.val < this.frames.max - 1 ) this.frames.val++
            else this.frames.val = 0
        }
    }
    drawEnemy() {
        c.drawImage(
            this.image,
            900, // x 
            14, // y
            300, // Ancho
            300 //Altura
        )
    }
    drawPlayerPokemon() {
        c.drawImage(
            this.image,
            220, // x 
            210, // y
            450, // Ancho
            450 //Altura
        )
    }
    
}

export { Sprite }
