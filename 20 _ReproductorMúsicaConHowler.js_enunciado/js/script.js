let canciones = [
    {
        titulo: "",
        archivo: ""
    }, {
        titulo: "",
        archivo: ""
    }, {
        titulo: "",
        archivo: ""
    }
]

let indiceActual = 0;
let sonido;

function cargarCacion() {
    sonido = new Howl({
        src: [canciones[indiceActual].archivo]
    });
}