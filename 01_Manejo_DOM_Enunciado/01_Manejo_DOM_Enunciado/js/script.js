let titulo = document.getElementById('titulo');
let inventario = document.getElementById('inventario');


titulo.textContent = "Inventario de Link";

let linea = document.createElement("li");
linea.textContent = "Espada de madera";

linea.setAttribute("class", "objeto")
document.body.appendChild(linea)