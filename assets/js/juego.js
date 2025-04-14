/**
 * 2C = Two Clubs (Treboles)
 * 2D = Two of Diamond (Diamantes)
 * 2H = Two Hearts (Corazones)
 * 2S = Two Spades (Espadas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;
const btnPedir = document.querySelector("#btnPedir");
const puntosHtml = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");

const crearDeck = () => {
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();

//Tomar una carta
const pedirCarta = () => {
    if(deck.length === 0){
        throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
}

//Pedir carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor))
           ? (valor === "A") ? 11 : 10
           : valor * 1;
}

const valor = valorCarta(pedirCarta());

//Evento pedir carta
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    //Crear carta
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.log("Lo siento mucho, perdiste!");
        btnPedir.disabled = true;
    } else if (puntosJugador === 21){
        console.log("21, genial!");
        btnPedir.disabled = true;
    }
});