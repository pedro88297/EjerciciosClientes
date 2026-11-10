
let localidad = document.getElementById("localidad");

let nombreLocalidad = document.getElementById("nombreLocalidad");
let descripcion = document.getElementById("descripcion");
let icono = document.getElementById("icono");

let temperatura = document.getElementById("temperatura");
let unidadTemperatura = document.getElementById("unidadTemperatura");

let humedad = document.getElementById("humedad");
let unidadHumedad = document.getElementById("unidadHumedad");

let viento = document.getElementById("viento");
let unidadViento = document.getElementById("unidadViento");

let hora = document.getElementById("hora");
let estado = document.getElementById("estado");

let localidades = {
    merida: {
        nombre: "Mérida",
        latitud: 38.91611,
        longitud: -6.34366
    },

    madrid: {
        nombre: "Madrid",
        latitud: 40.4168,
        longitud: -3.7038
    },

    barcelona: {
        nombre: "Barcelona",
        latitud: 41.3874,
        longitud: 2.1686
    }
};

function consultarTiempo() {

    let ciudad = localidades[localidad.value];

    nombreLocalidad.textContent = ciudad.nombre;
    estado.textContent = "Consultando...";

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitud}&longitude=${ciudad.longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al consultar el tiempo");
            }

            return response.json();
        })
        .then(data => {

            let datos = data.current;
            let unidades = data.current_units;

            temperatura.textContent = datos.temperature_2m;
            unidadTemperatura.textContent = unidades.temperature_2m;

            humedad.textContent = datos.relative_humidity_2m;
            unidadHumedad.textContent = unidades.relative_humidity_2m;

            viento.textContent = datos.wind_speed_10m;
            unidadViento.textContent = unidades.wind_speed_10m;

            hora.textContent = datos.time.replace("T", " ");

            let codigo = datos.weather_code;

            switch (codigo) {

                case 0:
                    descripcion.textContent = "Cielo despejado";
                    icono.textContent = "☀️";
                    break;

                case 1:
                    descripcion.textContent = "Principalmente despejado";
                    icono.textContent = "🌤️";
                    break;

                case 2:
                    descripcion.textContent = "Parcialmente nublado";
                    icono.textContent = "⛅";
                    break;

                case 3:
                    descripcion.textContent = "Cielo cubierto";
                    icono.textContent = "☁️";
                    break;

                case 45:
                case 48:
                    descripcion.textContent = "Niebla";
                    icono.textContent = "🌫️";
                    break;

                case 51:
                case 53:
                case 55:
                    descripcion.textContent = "Llovizna";
                    icono.textContent = "🌦️";
                    break;

                case 56:
                case 57:
                case 66:
                case 67:
                    descripcion.textContent = "Lluvia engelante";
                    icono.textContent = "🌧️";
                    break;

                case 61:
                case 63:
                case 65:
                    descripcion.textContent = "Lluvia";
                    icono.textContent = "🌧️";
                    break;

                case 71:
                case 73:
                case 75:
                    descripcion.textContent = "Nieve";
                    icono.textContent = "❄️";
                    break;

                case 77:
                    descripcion.textContent = "Granizo pequeño";
                    icono.textContent = "🌨️";
                    break;

                case 80:
                case 81:
                case 82:
                    descripcion.textContent = "Chubascos";
                    icono.textContent = "🌧️";
                    break;

                case 85:
                case 86:
                    descripcion.textContent = "Chubascos de nieve";
                    icono.textContent = "🌨️";
                    break;

                case 95:
                case 96:
                case 99:
                    descripcion.textContent = "Tormenta";
                    icono.textContent = "⛈️";
                    break;

                default:
                    descripcion.textContent = "Tiempo no disponible";
                    icono.textContent = "🌤️";
            }

            estado.textContent = "Datos actualizados correctamente";

        })
        .catch(error => {
            console.error("Error:", error);

            descripcion.textContent = "No se ha podido consultar el tiempo";
            icono.textContent = "⚠️";

            temperatura.textContent = "--";
            humedad.textContent = "--";
            viento.textContent = "--";
            hora.textContent = "--";

            estado.textContent = "Error al cargar los datos";
        });
}

localidad.addEventListener("change", consultarTiempo);

consultarTiempo();
