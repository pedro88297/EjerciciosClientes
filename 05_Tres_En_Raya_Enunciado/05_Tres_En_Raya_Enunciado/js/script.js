let celdas = document.querySelectorAll(".celda")
let textoTurno = document.createElement("h1")

document.body.append(textoTurno)
textoTurno.style.color = "white"


let turno = "X";


celdas.forEach(function (celda) {
    celda.addEventListener("click", function () {
        celda.textContent = turno;


        if (turno === "X") {
            turno = "O"
        } else {
            turno = "X"
        }

        textoTurno.textContent = "Turno de: " + turno;
    })
})


