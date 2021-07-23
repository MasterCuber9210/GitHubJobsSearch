// Selectores
const formulario   = document.querySelector('#formulario');
const resultadoDiv = document.querySelector('#resultado');


// Eventos
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
})


// Funciones
function validarBusqueda (e) {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if (busqueda === '') {
        mostrarMensaje('Favor introducir un termino para la busqueda');
        return;
    }

    consultarAPI(busqueda);
}

function mostrarMensaje(mensaje) {
    // validar que no haya un mensaje previo
    const alertaPrevia = document.querySelector('.alerta');

    if (!alertaPrevia) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        alerta.textContent = mensaje;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
        
    }
}

function consultarAPI(busqueda) {

    const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url       = `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`;
    
    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)))
}

function mostrarVacantes(vacantes) {
    // Limpiar HTML
    while (resultadoDiv.firstChild) {
        resultadoDiv.removeChild(resultadoDiv.firstChild);
    }

    if (vacantes.length > 0 ) {

        vacantes.forEach(vacante => {
            const { company, title, type, url } = vacante;

            resultadoDiv.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;
        });
        
    } else {
        mostrarMensaje('No hay resultados para esta busqueda');
    }
    
}