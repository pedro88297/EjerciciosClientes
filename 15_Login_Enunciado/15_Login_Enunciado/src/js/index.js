'use strict';

// Datos ficticios para comprobar el acceso. No cambies sus valores.
const cuentaPrueba = {
  usuario: "player_one",
  email: "player@example.com",
  password: "Juego2026!",
};

// Elementos del HTML
const formulario = document.querySelector('#login-form');
const identidad = document.querySelector('#identity');
const password = document.querySelector('#password');
const botonOjo = document.querySelector('#toggle-password');

const errorIdentidad = document.querySelector('#identity-error');
const errorPassword = document.querySelector('#password-error');
const mensaje = document.querySelector('#login-message');

// Expresiones regulares
const regexEmail = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
const regexUsuario = /^[A-Za-z0-9_]{3,20}$/;

let identidadValidada = false;
let passwordValidada = false;


// Validar usuario o email
function validarIdentidad() {
  const valor = identidad.value.trim();

  if (valor === '') {
    errorIdentidad.textContent = 'Este campo es obligatorio.';
  } else if (valor.includes('@') && !regexEmail.test(valor)) {
    errorIdentidad.textContent = 'Introduce un email válido.';
  } else if (!valor.includes('@') && !regexUsuario.test(valor)) {
    errorIdentidad.textContent =
      'El usuario debe tener entre 3 y 20 caracteres: letras, números o guion bajo.';
  } else {
    errorIdentidad.textContent = '';
  }

  const valido = errorIdentidad.textContent === '';

  identidad.setAttribute('aria-invalid', String(!valido));

  return valido;
}


// Validar contraseña
function validarPassword() {
  const valor = password.value;

  if (valor === '') {
    errorPassword.textContent = 'La contraseña es obligatoria.';
  } else if (valor.length < 8 || valor.length > 64) {
    errorPassword.textContent =
      'La contraseña debe tener entre 8 y 64 caracteres.';
  } else if (/\s/.test(valor)) {
    errorPassword.textContent =
      'La contraseña no puede contener espacios en blanco.';
  } else {
    errorPassword.textContent = '';
  }

  const valido = errorPassword.textContent === '';

  password.setAttribute('aria-invalid', String(!valido));

  return valido;
}


// Validar al salir de cada campo
identidad.addEventListener('blur', function () {
  identidadValidada = true;
  validarIdentidad();
});

password.addEventListener('blur', function () {
  passwordValidada = true;
  validarPassword();
});


// Actualizar errores mientras se escribe
identidad.addEventListener('input', function () {
  mensaje.textContent = '';
  mensaje.removeAttribute('data-state');

  if (identidadValidada) {
    validarIdentidad();
  }
});

password.addEventListener('input', function () {
  mensaje.textContent = '';
  mensaje.removeAttribute('data-state');

  if (passwordValidada) {
    validarPassword();
  }
});


// Mostrar u ocultar contraseña
botonOjo.addEventListener('click', function () {
  if (password.type === 'password') {
    password.type = 'text';
    botonOjo.setAttribute('aria-label', 'Ocultar contraseña');
    botonOjo.setAttribute('aria-pressed', 'true');
  } else {
    password.type = 'password';
    botonOjo.setAttribute('aria-label', 'Mostrar contraseña');
    botonOjo.setAttribute('aria-pressed', 'false');
  }
});


// Comprobar el formulario al enviarlo
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  identidadValidada = true;
  passwordValidada = true;

  const identidadCorrecta = validarIdentidad();
  const passwordCorrecta = validarPassword();

  mensaje.textContent = '';
  mensaje.removeAttribute('data-state');

  // Enfocar el primer campo incorrecto
  if (!identidadCorrecta) {
    identidad.focus();
    return;
  }

  if (!passwordCorrecta) {
    password.focus();
    return;
  }

  // Comprobar las credenciales
  const valorIdentidad = identidad.value.trim().toLowerCase();
  const valorPassword = password.value;

  const usuarioCorrecto =
    valorIdentidad === cuentaPrueba.usuario.toLowerCase();

  const emailCorrecto =
    valorIdentidad === cuentaPrueba.email.toLowerCase();

  const passwordCorrectaAcceso =
    valorPassword === cuentaPrueba.password;

  if ((usuarioCorrecto || emailCorrecto) && passwordCorrectaAcceso) {
    mensaje.textContent = 'Acceso correcto';
    mensaje.dataset.state = 'success';
  } else {
    mensaje.textContent = 'Usuario/email o contraseña incorrectos';
    mensaje.dataset.state = 'error';
  }
});