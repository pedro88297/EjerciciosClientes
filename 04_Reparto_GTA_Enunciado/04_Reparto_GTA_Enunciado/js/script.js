// 1. Guarda los datos de la misión.

let nombreMision = document.getElementById('titulo');

nombreMision.textContent = "GTA · Entrega en Los Santos"

let ingresos = 12000;
let gastos = 2000;
let jugadores = 4;

// 2. Define calcularReparto con un jugador por defecto.

function calcularReparto(ingresos, gastos, jugadores = 1) {
    return (ingresos - gastos) / 4;
}

// 3. Llama a calcularReparto y guarda el resultado.
let reparto = calcularReparto();


// 4. Actualiza el título y el estado.

let estado = document.getElementById("estado")
estado.textContent("Mision completada");


// 5. Define mostrarDato y úsala para añadir los tres datos al resumen.
function mostrarDato(etiqueta, valor) {
    let resumen = document.getElementById('resumen')

    let li = document.createElement("li")

    li.textContent = ` ${etiqueta}:${valor}`;

    resumen.appendChild(li)
}

mostrarDato("Ingresos", `${ingresos}`)
mostrarDato("Gastos", `${gastos}`)
mostrarDato("Jugadores", `${jugadores}`)
// 6. Muestra el reparto por jugador y aplica la clase destacado.

let parrafoReparto = document.getElementById("reparto")

if (parrafoReparto) {
    parrafoReparto.textContent = ` Cada jugador recibe: ${reparto}`
    parrafoReparto.classList.add("destacado")
}


