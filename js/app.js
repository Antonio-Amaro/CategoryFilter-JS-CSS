// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor Resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 5;

// Generar objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar

    llenarSelect(); // Llena las opciones de años
})

// Event Listeners
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt( e.target.value );

    filtrarAuto();
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt( e.target.value );

    filtrarAuto();
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})

// Funciones
function mostrarAutos(autos) {

    limpiarHTML();

    autos.forEach( auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('div');

        autoHTML.innerHTML = `
            <p>${marca} ${modelo}</p>
            <div class="auto-contenedor"> 
                <p><span>Año:</span> ${year}</p> 
                <p><span>Puertas:</span> ${puertas}</p> 
                <p><span>Transmisión:</span> ${transmision}</p> 
                <p><span>Precio:</span> $ ${precio}</p> 
                <p><span>Color:</span> ${color}</p>
            </div>
        `;

        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {

    for( let i = max; i >= min; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion);
    }
}

// Filtrar en base a las categorias seleccionadas
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision).filter( filtrarColor );

    if( resultado.length ) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay autos que cumplan esos filtros';

    resultado.appendChild(noResultado);
}


// Funciones de filtrado de cada categoría
function filtrarMarca(auto) {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto) {
    if(datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    if(datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if(datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    if(datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}