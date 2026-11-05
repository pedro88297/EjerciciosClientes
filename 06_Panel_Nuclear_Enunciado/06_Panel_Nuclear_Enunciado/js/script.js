// Completa los cinco comportamientos descritos en README.md.
// El HTML y las clases CSS ya están preparados.

let pantalla = document.querySelector("#pantalla-mensaje")
let marcoPantalla = document.querySelector(".pantalla-marco")
let selectorAlerta = document.querySelector("#selector-alerta");
let tituloEstado = document.querySelector("#titulo-estado");
let checks = document.querySelectorAll(".check-icono");
let fotoCamara = document.querySelector("#foto-camara");
let botonFision = document.querySelector("#boton-fision");



//1
let mensaje = "";

document.addEventListener("keydown", function (evento) {


    if (evento.key === "Backspace") {
        mensaje = mensaje.slice(0, -1);
    }

    else if (evento.key.length === 1) {
        mensaje = mensaje + evento.key;
    }

    pantalla.textContent = obtenerSimbolos() + mensaje;
});


function obtenerSimbolos() {
    let simbolos = "";

    checks.forEach(function (check) {
        if (check.checked) {
            simbolos = simbolos + check.value + " ";
        }
    });

    return simbolos;
}

//2
selectorAlerta.addEventListener("change", function () {

    tituloEstado.textContent = "ESTADO: " + selectorAlerta.value;

});


//3
checks.forEach(function (check) {

    check.addEventListener("change", function () {
        pantalla.textContent = obtenerSimbolos() + mensaje;
    });

});

//4
fotoCamara.addEventListener("mouseenter", function () {
    fotoCamara.classList.add("borroso");
});

fotoCamara.addEventListener("mouseleave", function () {
    fotoCamara.classList.remove("borroso");
});

//5
let estadoBoton = 0;

botonFision.addEventListener("click", function () {

    estadoBoton++;

    if (estadoBoton === 1) {
        botonFision.classList.remove("color-verde");
        botonFision.classList.add("color-amarillo");
    }

    else if (estadoBoton === 2) {
        botonFision.classList.remove("color-amarillo");
        botonFision.classList.add("color-rojo");
    }

    else {
        botonFision.classList.remove("color-rojo");
        botonFision.classList.add("color-verde");
        estadoBoton = 0;
    }

});