/**
 * 2C = Two Clubs (Treboles)
 * 2D = Two of Diamond (Diamantes)
 * 2H = Two Hearts (Corazones)
 * 2S = Two Spades (Espadas)
 */

(() => {
    "use strict"

    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "J", "Q", "K"];

    let puntosJugador = 0;
    let puntosComputadora = 0;
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");
    const puntosHtml = document.querySelectorAll("small");
    const divCartasJugador = document.querySelector("#jugador-cartas");
    const divCartasComputadora = document.querySelector("#computadora-cartas");

    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        deck = _.shuffle(deck);
        return deck;
    }
    crearDeck();

    //Tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        const carta = deck.pop();
        return carta;
    }

    //Pedir carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))
            ? (valor === "A") ? 11 : 10
            : valor * 1;
    }

    //Computadora
    const turnoComputadora = (puntosminimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            //Crear carta
            const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta");
            divCartasComputadora.append(imgCarta);

            if (puntosminimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosminimos) && (puntosminimos <= 21));

        setTimeout(() => {
            if ((puntosminimos > 21)) {
                alert("Computadora gana!");
            } else if (puntosComputadora > 21) {
                alert("Jugador gana!");
            } else if (puntosComputadora === 21) {
                alert("Computadora gana!");
            } else if (((puntosminimos <= 21) && (puntosComputadora <= 21)) && (puntosminimos < puntosComputadora)) {
                alert("Computadora gana!");
            } else if (((puntosminimos <= 21) && (puntosComputadora <= 21)) && (puntosminimos > puntosComputadora)) {
                alert("Jugador gana!");
            } else if (puntosComputadora === puntosminimos) {
                alert("Nadie gana!");
            }
        }, 100);
    }

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

        if (puntosJugador > 21) {
            console.log("Lo siento mucho, perdiste!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.log("21, genial!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    //Evento detener
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    //Nuevo juego
    btnNuevo.addEventListener("click", () => {
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
        divCartasComputadora.innerHTML = "";
        divCartasJugador.innerHTML = "";
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})();