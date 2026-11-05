
const pendientes = document.getElementById("pendientes");
const proceso = document.getElementById("proceso");
const completadas = document.getElementById("completadas");

const contadorPendientes = document.getElementById("contador-pendientes");
const contadorProceso = document.getElementById("contador-proceso");
const contadorCompletadas = document.getElementById("contador-completadas");

const porcentaje = document.getElementById("porcentaje");
const barraProgreso = document.getElementById("barra-progreso");
const mensaje = document.getElementById("mensaje");

function actualizarTablero() {

    const numPendientes = pendientes.children.length;
    const numProceso = proceso.children.length;
    const numCompletadas = completadas.children.length;

    contadorPendientes.textContent = numPendientes;
    contadorProceso.textContent = numProceso;
    contadorCompletadas.textContent = numCompletadas;

    const total = numPendientes + numProceso + numCompletadas;

    const progreso = total === 0 ? 0 : Math.round((numCompletadas / total) * 100);

    porcentaje.textContent = progreso + "%";
    barraProgreso.style.width = progreso + "%";
}

function activarSortable(lista) {

    new Sortable(lista, {

        group: "tareas",

        animation: 150,

        onEnd: function (evento) {

            const tarea = evento.item;

            const nombreTarea = tarea.textContent;

            const nuevaColumna = evento.to.dataset.estado;

            mensaje.textContent = "La tarea '" + nombreTarea +
                "' se ha movido a " + nuevaColumna + ".";

            actualizarTablero();
        }
    });
}

activarSortable(pendientes);
activarSortable(proceso);
activarSortable(completadas);

actualizarTablero();