
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

    const progreso = total === 0 ? 0 :
        Math.round((numCompletadas / total) * 100);

    porcentaje.textContent = progreso + "%";
    barraProgreso.style.width = progreso + "%";
}

function guardarTablero() {

    const tablero = document.querySelector(".tablero");

    const datos = [];

    const columnas = tablero.querySelectorAll(".columna");

    columnas.forEach(function (columna) {

        const lista = columna.querySelector(".lista-tareas");

        const tareas = [];

        lista.querySelectorAll(".tarea").forEach(function (tarea) {
            tareas.push(tarea.dataset.id);
        });

        datos.push({
            id: lista.id,
            tareas: tareas
        });
    });

    localStorage.setItem("tablero", JSON.stringify(datos));
}

function cargarTablero() {

    const datosGuardados = localStorage.getItem("tablero");

    if (datosGuardados === null) {
        actualizarTablero();
        return;
    }

    const datos = JSON.parse(datosGuardados);

    const tablero = document.querySelector(".tablero");

    datos.forEach(function (columnaGuardada) {

        const lista = document.getElementById(columnaGuardada.id);

        if (lista) {

            const columna = lista.closest(".columna");

            tablero.appendChild(columna);

            columnaGuardada.tareas.forEach(function (idTarea) {

                const tarea = document.querySelector(
                    '[data-id="' + idTarea + '"]'
                );

                if (tarea) {
                    lista.appendChild(tarea);
                }
            });
        }
    });

    actualizarTablero();
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
            guardarTablero();
        }
    });
}

activarSortable(pendientes);
activarSortable(proceso);
activarSortable(completadas);

const tablero = document.querySelector(".tablero");

new Sortable(tablero, {

    animation: 150,
    handle: "h2",

    onEnd: function () {

        mensaje.textContent = "Se ha cambiado el orden de las columnas";

        guardarTablero();
    }
});

cargarTablero();