/**
 * 2C = Two Clubs (Treboles)
 * 2D = Two of Diamond (Diamantes)
 * 2H = Two Hearts (Corazones)
 * 2S = Two Spades (Espadas)
 */

const miModulo = (() => {
    "use strict"

    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "J", "Q", "K"];

    let puntosJugadores = [];
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");
    const puntosHtml = document.querySelectorAll("small");
    const divCartasJugadores = document.querySelectorAll(".div-cartas");

    const inicializarJuego = (numJugadores = 2) => {
        console.clear();
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = "");

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    }

    //Tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        return deck.pop();
    }

    //Pedir carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))
            ? (valor === "A") ? 11 : 10
            : valor * 1;
    }

    //Turno: 0 = primer jugador, el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const[puntosminimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ((puntosminimos > 21)) {
                alert("Computadora gana!");
            } else if (puntosComputadora > 21) {
                alert("Jugador gana!");
            } else if (puntosComputadora === puntosminimos) {
                alert("Nadie gana!");
            } else if (puntosComputadora === 21) {
                alert("Computadora gana!");
            } else if (((puntosminimos <= 21) && (puntosComputadora <= 21)) && (puntosminimos < puntosComputadora)) {
                alert("Computadora gana!");
            } else if (((puntosminimos <= 21) && (puntosComputadora <= 21)) && (puntosminimos > puntosComputadora)) {
                alert("Jugador gana!");
            }
        }, 500);
    }

    //Computadora
    const turnoComputadora = (puntosminimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosminimos) && (puntosminimos <= 21));

        determinarGanador();
    }

    //Evento pedir carta
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);
    });

    //Nuevo juego
    // btnNuevo.addEventListener("click", () => {
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    };
})();