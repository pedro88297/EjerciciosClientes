// Los meses de estos datos están escritos como en un calendario: 1 a 12.
const torneos = [
  { nombre: "Mario Kart", anio: 2026, mes: 9, dia: 26 },
  { nombre: "Valorant", anio: 2026, mes: 9, dia: 27 },
  { nombre: "Tekken", anio: 2026, mes: 10, dia: 5 }
];

const diasDeRetraso = 3;

// Usamos siempre esta referencia para poder comprobar el mismo resultado.
// En el constructor de Date, septiembre es el mes 8.
const fechaReferencia = new Date(2026, 8, 30);



// 1. Crea formatearFecha(fecha): devuelve día/mes/año, sin ceros iniciales.

function formatearFecha(fecha) {
  let dia = fecha.getDate();
  let mes = fecha.getMonth();
  let año = fecha.getFullYear();

  return dia + "/" + mes + "/" + año;
}


// 2. Crea obtenerEstado(fecha, referencia): devuelve
// "Finalizado", "Se celebra hoy" o "Pendiente".
function obtenerEstado(fecha, referencia) {
  if (fecha.getTime() < referencia.getTime()) {
    return "Finalizado";
  }

  if (fecha.getTime() === referencia.getTime()) {
    return "Se celebra hoy";
  }

  return "Pendiente";
}



// 3. Usa formatearFecha para mostrar la fecha de referencia. <p id="referencia">

let parrafoReferencia = document.getElementById("referencia");
parrafoReferencia.textContent = `Fecha de referencia: ${formatearFecha(fechaReferencia)}`;




const lista = document.getElementById("torneos");

for (const torneo of torneos) {
  // 4. Crea una fecha con los datos del torneo y aplázala "diasDeRetraso" días.
  // Recuerda que el mes de los datos va de 1 a 12 y el de Date de 0 a 11.
  // const nuevaFecha =  ...
  let nuevaFecha = new Date(torneo.anio, torneo.mes - 1, torneo.dia);
  nuevaFecha.setDate(nuevaFecha.getDate() + diasDeRetraso);




  // 5. Sustituye los textos provisionales por llamadas a tus funciones.
  const fechaFormateada = formatearFecha(nuevaFecha); // formatearFecha(nuevaFecha);
  const estadoTorneo = obtenerEstado(nuevaFecha, fechaReferencia); // obtenerEstado(nuevaFecha, fechaReferencia);



  // DOM preparado: muestra los resultados que has calculado.
  const fila = document.createElement("li");
  const titulo = document.createElement("h2");
  titulo.textContent = torneo.nombre;
  const fecha = document.createElement("p");
  fecha.textContent = `Nueva fecha: ${fechaFormateada}`;
  const estado = document.createElement("p");
  estado.className = "estado";
  estado.textContent = `Estado: ${estadoTorneo}`;

  fila.appendChild(titulo);
  fila.appendChild(fecha);
  fila.appendChild(estado);
  lista.appendChild(fila);
}
