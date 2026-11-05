// Completa el comportamiento descrito en README.md.
// El HTML y el CSS están preparados. Programa también el cambio del candado.


//1
let mensaje = document.getElementById("mensaje").value;

mensaje = mensaje.trim().toUpperCase();

if (mensaje === "") {
    alert("El mensaje esta vacío")
}


//2
let claveTexto = document.getElementById("clave").value;
let clave = Number(claveTexto);

if (
    claveTexto.trim() === "" ||
    !Number.isInteger(clave) ||
    clave < 1 ||
    clave > 99
) {
    alert("La clave debe ser un entero del 1 al 99")
}

//3
let palabras = mensaje.split(" ");

palabras = palabras.filter(palabra => palabra !== "");

//4

function transformarPalabra(palabra) {
    palabra = palabra.replaceAll("A", "4");
    palabra = palabra.replaceAll("E", "3");
    palabra = palabra.replaceAll("I", "1");
    palabra = palabra.replaceAll("O", "0");
    palabra = palabra.replaceAll("U", "9");

    return palabra;
}

let palabrasCodificadas = [];

for (let i = 0; i < palabras.length; i++) {
    palabrasCodificadas.push(transformarPalabra(palabras[i]));

}

//5

palabrasCodificadas.reverse();

let resultado = palabrasCodificadas.join("-");


//6

let cogido = clave * palabras.length;

let codigoTexto = String(codigo).padStart(3, "0");


resultado = resultado + "#" + codigoTexto;