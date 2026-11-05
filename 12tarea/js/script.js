const botonIniciar = document.getElementById("iniciar");
const botonDetener = document.getElementById("detener");
const botonReiniciar = document.getElementById("reiniciar");

const mensaje = document.getElementById("mensaje");
const inicio = document.getElementById("inicio");
const fin = document.getElementById("fin");
const tiempo = document.getElementById("tiempo");
const diferencia = document.getElementById("diferencia");
const resultadoFinal = document.getElementById("resultadoFinal");

let fechaInicio = null;
let fechaFin = null;


// Convierte una fecha al formato horas:minutos:segundos
function formatearHora(fecha) {
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    return `${horas}:${minutos}:${segundos}`;
}


// Borra los resultados anteriores
function limpiarResultados() {
    inicio.textContent = "";
    fin.textContent = "";
    tiempo.textContent = "";
    diferencia.textContent = "";
    resultadoFinal.textContent = "";
}


// Inicia una ronda
function iniciarRonda() {
    fechaInicio = new Date();

    mensaje.textContent = "Ronda en marcha";

    limpiarResultados();

    botonIniciar.disabled = true;
    botonDetener.disabled = false;
}


// Detiene una ronda
function detenerRonda() {
    fechaFin = new Date();

    const tiempoTranscurrido =
        (fechaFin.getTime() - fechaInicio.getTime()) / 1000;

    const diferenciaObjetivo =
        Math.abs(tiempoTranscurrido - 10);

    inicio.textContent = `Inicio: ${formatearHora(fechaInicio)}`;
    fin.textContent = `Fin: ${formatearHora(fechaFin)}`;

    tiempo.textContent =
        `Tiempo: ${tiempoTranscurrido.toFixed(2)} segundos`;

    diferencia.textContent =
        `Diferencia: ${diferenciaObjetivo.toFixed(2)} segundos`;


    if (tiempoTranscurrido < 10) {
        resultadoFinal.textContent =
            "Te has adelantado al objetivo.";
    } else if (tiempoTranscurrido > 10) {
        resultadoFinal.textContent =
            "Te has pasado del objetivo.";
    } else {
        resultadoFinal.textContent =
            "¡Has acertado exactamente!";
    }

    mensaje.textContent = "Ronda terminada";

    botonIniciar.disabled = false;
    botonDetener.disabled = true;
}


// Reinicia todo
function reiniciar() {
    fechaInicio = null;
    fechaFin = null;

    mensaje.textContent =
        "Pulsa Iniciar e intenta detener la ronda a los 10 segundos";

    limpiarResultados();

    botonIniciar.disabled = false;
    botonDetener.disabled = true;
}


// Eventos
botonIniciar.addEventListener("click", iniciarRonda);
botonDetener.addEventListener("click", detenerRonda);
botonReiniciar.addEventListener("click", reiniciar);