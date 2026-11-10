
let descripcion = document.getElementById("descripcion");
let icono = document.getElementsByClassName("icono")[0];

let url = "https://api.open-meteo.com/v1/forecast?latitude=38.91611&longitude=-6.34366&current=weather_code&timezone=Europe%2FMadrid&forecast_days=1";

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al consultar el tiempo");
        }

        return response.json();
    })
    .then(data => {

        const codigo = data.current.weather_code;

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

            case 61:
            case 63:
            case 65:
                descripcion.textContent = "Lluvia";
                icono.textContent = "🌧️";
                break;

            case 80:
            case 81:
            case 82:
                descripcion.textContent = "Chubascos";
                icono.textContent = "🌧️";
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

    })
    .catch(error => {
        console.error("Error:", error);
        descripcion.textContent = "No se ha podido consultar el tiempo";
        icono.textContent = "⚠️";
    });
