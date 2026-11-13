let API = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/";

let comunidad = document.getElementById("comunidad");

let provincia = document.getElementById("provincia");

let municipio = document.getElementById("municipio");


async function cargarComunidades() {

    try {
        let respuesta = await fetch(API + "Listados/ComunidadesAutonomas/");

        if (!respuesta.ok) {
            throw new Error("Error al cargar las comunidades");
        }


        let datos = await respuesta.json();

        datos.forEach(function (comunidadActual) {
            let opcion = document.createElement("option");

            opcion.value = comunidadActual.IDCCAA;
            opcion.textContent = comunidadActual.CCAA;


            comunidad.appendChild(opcion)
        });
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al cargar las comunidades. Inténtalo de nuevo."

        console.log();
    }

}
cargarComunidades();

async function cargarProvincias() {
    provincia.innerHTML = '<option value = "">Selecciona una provincia</option>';


    municipio.innerHTML = '<option value = "">Selecciona una provincia</option>';
    municipio.disabled = true;

    provincia.disabled = true;


    if (comunidad.value == "") {
        return;
    }

    try {
        let respuesta = await fetch(API + "Listados/ProvinciasPorComunidad/" + comunidad.value);

        let datos = await respuesta.json();

        datos.forEach(function (provinciaActual) {
            let opcion = document.createElement("option");

            opcion.value = provinciaActual.IDPovincia;
            opcion.textContent = provinciaActual.Provincia;


            provincia.appendChild(opcion);
        });

        provincia.disabled = false;

    } catch (error) {
        document.getElementById("mensaje").textContent("No ha sido posible cargar las provincias");

        console.log(error);
    }
}



