// Tecnica para consumir una url de API
//https://digimon-api.vercel.app/api/digimon

//Refactoring
let contenido;

// Función para alternar entre las vistas (tabla, grilla, selector)
function mostrarVista(vista) {
  // Ocultar todas las vistas
  document.getElementById('vistaTabla').classList.add('d-none');
  document.getElementById('vistaGrilla').classList.add('d-none');
  document.getElementById('vistaSelector').classList.add('d-none');

  // Mostrar la vista seleccionada
  document.getElementById(vista).classList.remove('d-none');
  document.getElementById(vista).classList.add('vista-activa');
}

// Función para mostrar la tabla
function tabla() {
  mostrarVista('vistaTabla'); // Mostrar la vista de tabla

  // Llamar a API utilizando fetch
  fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => { 
      crearTabla(resp); // Llamar a la función para crear la tabla
    });

  //Accedemos al div digiData para pintar data, y pintar spinner
  contenido = document.getElementById("vistaTabla");
  contenido.innerHTML = `
    <div class="text-center">
      <div class="spinner-grow loading" role="status">
        <span class="visually-hidden">Loading</span>
      </div>
    </div>
  `;

  // Eliminar el spinner y crear la tabla con los datos de la API
  function crearTabla(resp) {
    let contenidoTabla = `
      <table class="mx-auto text-center tableW bg-white border border-2">
        <thead class="table-light">
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nivel</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
    `;

    //Ahora se van a agregar los valores
    resp.forEach(digimon => {
      contenidoTabla += `
        <tr>
          <td><img src="${digimon.img}" alt="${digimon.name}" width="50"></td>
          <td>${digimon.name}</td>
          <td>${digimon.level}</td>
        </tr>
      `;
    });

    contenidoTabla += `</tbody></table>`;

    //Pintamos los datos de la tabla en el HTML
    contenido.innerHTML = contenidoTabla;
  }
}

// Función para mostrar la grilla
function grilla() {
  mostrarVista('vistaGrilla'); // Mostrar la vista de grilla

  // Llamar a la API utilizando fetch
  fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => { 
      crearGrilla(resp); // Llamar a la función para crear la grilla
    });

  //Eliminar el spinner y crear la grilla con los datos de la API
  function crearGrilla(resp) {
    let contenidoGrilla = '<div class="row">';
    
    // Ahora se van a agregar los valores
    resp.forEach(digimon => {
      contenidoGrilla += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
          <div class="card">
            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
            <div class="card-body">
              <h5 class="card-title">${digimon.name}</h5>
              <p class="card-text">${digimon.level}</p>
            </div>
          </div>
        </div>
      `;
    });

    contenidoGrilla += '</div>';

    // Pintamos los datos de la grilla en el HTML
    document.getElementById('vistaGrilla').innerHTML = contenidoGrilla;
  }
}

// Función para mostrar el selector
function selector() {
  mostrarVista('vistaSelector'); // Mostrar la vista de selector

  // Llamar a la API utilizando fetch
  fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => { 
      crearSelector(resp); // Llamar a la función para crear el selector
    });

  // Eliminar el spinner y crear el selector con los datos de la API
  function crearSelector(resp) {
    let contenidoSelector = '<select class="form-select" onchange="mostrarDigimonSeleccionado(this.value)">';

    //Ahora se van a agregar los valores
    resp.forEach(digimon => {
      contenidoSelector += `
        <option value="${digimon.name}">${digimon.name}</option>
      `;
    });

    contenidoSelector += '</select>';
    document.getElementById('vistaSelector').innerHTML = contenidoSelector;
  }
}

// Función para mostrar el Digimon seleccionado en el selector
function mostrarDigimonSeleccionado(nombre) {
  alert('Has seleccionado: ' + nombre);
}