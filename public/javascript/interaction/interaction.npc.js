import { npcDetected } from "../function/index.js"
import { printDialogDefault } from "../dialog/index.js"
import { LOCALHOST } from "../utils/index.js"
const interactionNpc = () => {
    const { id } = npcDetected
    fetch(`${LOCALHOST}api/npc/code/${id}`)
        .then((response) => response.json())
        .then((data) => {
            printDialogDefault(data)
        })

}

export { interactionNpc }