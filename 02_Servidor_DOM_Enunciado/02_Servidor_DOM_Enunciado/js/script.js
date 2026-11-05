let titulo = document.getElementById('titulo');

titulo.textContent = "Minecraft. Servidor de la comunidad";

let estado = document.getElementById("estado");

estado.textContent = "Inscripciones abiertas"

let ficha = document.getElementById('ficha');



let subtitulo = document.createElement("h2");

subtitulo.classList.add("destacado")

let subtitulo2 = document.createElement("h2");

subtitulo2.classList.add("destacado")

subtitulo.textContent = "Datos del Servidor"

subtitulo2.textContent = "Horario"

let parrafo1 = document.createElement("p")
let parrafo2 = document.createElement("p")
let parrafo3 = document.createElement("p")

let parrafo4 = document.createElement("p")

parrafo1.textContent = "Modalidad: supervivencia"
parrafo2.textContent = "Dificultad: normal"
parrafo3.textContent = "Capacidad: 20 personas"
parrafo4.textContent = "Viernes, de 18:00 a 21:00"

ficha.append(subtitulo);

ficha.append(parrafo1);
ficha.append(parrafo2);
ficha.append(parrafo3);

ficha.append(subtitulo2)

ficha.append(parrafo4)


let aviso = document.getElementById('aviso')

aviso.textContent = "Solicita acceso a la persona administradora antes de conectarte.";
