
// URLs
const URLMAPS = '../img/maps/'
const urlFaceset = '../img/asset/faceset/'
const URLPLAYER = '../img/asset/player/'
// Api rest
// const LOCALHOST = 'http://localhost:3040/'
const LOCALHOST = `${window.location.origin}/`
const NPCURL = 'api/npc/'
const USERURL = 'user/'
const INVENTORYURL = 'api/inventory/'
const PCURL = 'api/pc/'
const OBJECTURL = 'api/object/'

export {
    URLPLAYER,
    URLMAPS,
    urlFaceset,
    LOCALHOST,
    NPCURL,
    USERURL,
    INVENTORYURL,
    PCURL,
    OBJECTURL
}

//get IDs

const menuBattle = document.getElementById('battle')
const playerName = document.getElementById('battle-name-player')
const enemyName = document.getElementById('battle-name-enemy')
const textChatBattle = document.getElementById('battleText')
const btnAtack = document.getElementById('btn-atackOne')
const btnCapture = document.getElementById('btn-capture')
const btnInventario = document.getElementById('btn-inventory')
const btnSkip = document.getElementById('btn-skip')
const pcHtml = document.getElementById('pc')
const pcBackBtn = document.getElementById('pc-btn-back')
const slotPc = document.getElementById('slots-pc')
const slotPcTeam = document.getElementById('slots-pc-team')
const itemContainer = document.getElementById('item-container')
const marketItemSell = document.getElementById('market-item-sell')
const marketBack = document.getElementById('btn-back-market')
const marketNext = document.getElementById('btn-next-market')
const marketNo = document.getElementById('market-no')
const marketYes = document.getElementById('market-yes')
const marketTotal = document.getElementById('total-market')
const inventoryPokeball = document.getElementById('inventory-pokeball')
const inventoryMasterball = document.getElementById('inventory-masterball')
const configYes = document.getElementById('config-yes')
const configNo = document.getElementById('config-no')

export {
    menuBattle,
    playerName,
    enemyName,
    textChatBattle,
    btnAtack,
    btnCapture,
    btnInventario,
    btnSkip,
    pcHtml,
    pcBackBtn,
    slotPc,
    slotPcTeam,
    itemContainer,
    marketItemSell,
    marketBack,
    marketNext,
    marketNo,
    marketYes,
    marketTotal,
    inventoryMasterball,
    inventoryPokeball,
    configYes,
    configNo
}

// get Clases

const lifeBarPokemonPlayer = document.querySelector('.battleContainer__player__health__bar')
const lifeBarEnemy = document.querySelector('.battleContainer__enemy__health__bar')
const backBtn = document.querySelector('.inventory__back')
const market = document.querySelector('.market')
const marketPriceItem = document.querySelector('.market__right__price')
const configBtn = document.querySelector('.config__img')
const configDialog = document.querySelector('.config__container')

export {
    backBtn,
    lifeBarEnemy,
    lifeBarPokemonPlayer,
    market,
    marketPriceItem,
    configBtn,
    configDialog
}

// Constantes

const displayNONE = 'none'
const displayFLEX = 'flex'
const displayBLOCK = 'block'
const DEFEAT = 0
const VOIDTEXT = ''
const BR = `<br>`
const MAXTEAM = 6
const MINTEAM = 1
let GET = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: ''
}
let POST = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: ''
}
let PUT = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: ''
}
let DELETE = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: ''
}

export {
    displayBLOCK,
    displayFLEX,
    displayNONE,
    DEFEAT,
    VOIDTEXT,
    BR,
    MAXTEAM,
    MINTEAM,
    GET,
    POST,
    PUT,
    DELETE
}

