const tablero = document.querySelector('#tablero');
const objetivo = document.querySelector('#objetivo');
const botonIniciar = document.querySelector('#iniciar');
const textoPuntos = document.querySelector('#puntos');
const textoTiempo = document.querySelector('#tiempo');
const textoModo = document.querySelector('#modo');
const textoEstado = document.querySelector('#estado');
const textoVentana = document.querySelector('#ventana');

const DURACION = 20000;

const modos = {
  facil: { nombre: 'Fácil', intervalo: 1200 },
  dificil: { nombre: 'Difícil', intervalo: 700 }
};

// Configurar la dificultad desde la URL
const parametros = new URLSearchParams(window.location.search);
let modo = parametros.get('modo');

if (modo !== 'dificil') {
  modo = 'facil';
}

textoModo.textContent = modos[modo].nombre;

// Variables de la partida
let puntos = 0;
let jugando = false;
let preparando = false;
let pausado = false;

let tiempoRestante = DURACION;
let inicioTiempo = 0;

let temporizador = null;
let preparacion = null;
let temporizadorObjetivo = null;

// Mostrar el tamaño de la ventana
function actualizarVentana() {
  textoVentana.textContent =
    `Ventana: ${window.innerWidth} × ${window.innerHeight}`;
}

// Mover el objetivo dentro del tablero
function moverObjetivo() {
  const ancho = Math.max(
    0,
    tablero.clientWidth - objetivo.offsetWidth
  );

  const alto = Math.max(
    0,
    tablero.clientHeight - objetivo.offsetHeight
  );

  objetivo.style.left =
    `${Math.floor(Math.random() * (ancho + 1))}px`;

  objetivo.style.top =
    `${Math.floor(Math.random() * (alto + 1))}px`;
}

// Detener todos los temporizadores
function detenerTemporizadores() {
  clearInterval(temporizador);
  clearInterval(preparacion);
  clearTimeout(temporizadorObjetivo);

  temporizador = null;
  preparacion = null;
  temporizadorObjetivo = null;
}

// Mostrar el tiempo restante
function actualizarTiempo() {
  textoTiempo.textContent = (tiempoRestante / 1000).toFixed(1);
}

// Ocultar y desactivar el objetivo
function ocultarObjetivo() {
  objetivo.hidden = true;
  objetivo.disabled = true;
}

// Mostrar y activar el objetivo
function mostrarObjetivo() {
  objetivo.hidden = false;
  objetivo.disabled = false;
}

// Terminar la partida
function terminarPartida() {
  detenerTemporizadores();

  jugando = false;
  preparando = false;
  pausado = false;

  tiempoRestante = 0;
  actualizarTiempo();

  ocultarObjetivo();

  botonIniciar.disabled = false;
  textoEstado.textContent = `¡Tiempo terminado! Puntos: ${puntos}`;
}

// Programar el movimiento automático del objetivo
function programarMovimiento() {
  clearTimeout(temporizadorObjetivo);

  if (!jugando || pausado) {
    return;
  }

  temporizadorObjetivo = setTimeout(() => {
    moverObjetivo();
    programarMovimiento();
  }, modos[modo].intervalo);
}

// Actualizar el tiempo de juego
function actualizarPartida() {
  if (!jugando || pausado) {
    return;
  }

  tiempoRestante = Math.max(
    0,
    DURACION - (Date.now() - inicioTiempo)
  );

  actualizarTiempo();

  if (tiempoRestante <= 0) {
    terminarPartida();
  }
}

// Iniciar los 20 segundos de juego
function iniciarPartida() {
  preparando = false;
  jugando = true;
  pausado = false;

  tiempoRestante = DURACION;
  inicioTiempo = Date.now();

  textoEstado.textContent = '¡A jugar!';

  mostrarObjetivo();
  moverObjetivo();
  programarMovimiento();

  temporizador = setInterval(actualizarPartida, 50);
}

// Cuenta atrás: 3, 2, 1
function comenzar() {
  if (jugando || preparando) {
    return;
  }

  if (pausado) {
    continuarPartida();
    return;
  }

  detenerTemporizadores();

  puntos = 0;
  tiempoRestante = DURACION;

  jugando = false;
  preparando = true;

  textoPuntos.textContent = puntos;
  actualizarTiempo();

  ocultarObjetivo();
  botonIniciar.disabled = true;

  let numero = 3;
  textoEstado.textContent = numero;

  preparacion = setInterval(() => {
    if (document.hidden) {
      detenerTemporizadores();

      preparando = false;
      botonIniciar.disabled = false;

      textoEstado.textContent = 'Preparación cancelada';
      return;
    }

    numero--;

    if (numero > 0) {
      textoEstado.textContent = numero;
    } else {
      clearInterval(preparacion);
      preparacion = null;

      iniciarPartida();
    }
  }, 1000);
}

// Sumar puntos al pulsar el objetivo
objetivo.addEventListener('click', () => {
  if (!jugando || pausado || objetivo.disabled) {
    return;
  }

  puntos++;
  textoPuntos.textContent = puntos;

  // Cada acierto mueve el objetivo y reinicia su plazo
  moverObjetivo();
  programarMovimiento();
});

// Botón de inicio y continuación
botonIniciar.addEventListener('click', comenzar);

// Pausar al cambiar de pestaña
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (preparando) {
      detenerTemporizadores();

      preparando = false;
      botonIniciar.disabled = false;

      textoEstado.textContent = 'Preparación cancelada';
    } else if (jugando) {
      tiempoRestante = Math.max(
        0,
        DURACION - (Date.now() - inicioTiempo)
      );

      detenerTemporizadores();

      jugando = false;
      pausado = true;

      actualizarTiempo();
      ocultarObjetivo();

      botonIniciar.disabled = false;
      textoEstado.textContent = 'Partida pausada';
    }
  } else if (pausado) {
    textoEstado.textContent =
      `Partida pausada. Pulsa Comenzar para continuar (${puntos} puntos)`;
  }
});

// Continuar sin perder los puntos ni el tiempo
function continuarPartida() {
  if (!pausado || document.hidden) {
    return;
  }

  pausado = false;
  jugando = true;

  inicioTiempo = Date.now() - (DURACION - tiempoRestante);

  mostrarObjetivo();
  moverObjetivo();

  botonIniciar.disabled = true;
  textoEstado.textContent = '¡Continuamos!';

  programarMovimiento();
  temporizador = setInterval(actualizarPartida, 50);
}

// Mantener el objetivo dentro del tablero al redimensionar
window.addEventListener('resize', () => {
  actualizarVentana();

  if (jugando && !pausado) {
    moverObjetivo();
  }
});

// Estado inicial
actualizarVentana();

textoPuntos.textContent = '0';
textoTiempo.textContent = '20.0';
textoEstado.textContent = 'Pulsa Comenzar para jugar';

ocultarObjetivo();














