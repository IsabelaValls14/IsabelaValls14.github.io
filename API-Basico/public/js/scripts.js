fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });
 
  function testGetItems() {
  fetch('/items')
    .then(response => response.json())
    .then(data => console.log('GET /items response:', data))
    .catch(error => console.error('Error al hacer GET /items', error));
}

testGetItems();

function testPostItems() {
  fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      { id: 1, nombre: 'Espada', tipo: 'Ataque', efecto: 'Daño alto' },
      { id: 2, nombre: 'Escudo', tipo: 'Defensa', efecto: 'Bloquea ataques' }
    ])
  })
  .then(response => response.json())
  .then(data => console.log('POST /items response:', data))
  .catch(error => console.error('Error al hacer POST /items', error));
}

testPostItems();


  function testGetItemById(id) {
  fetch(`/items/${id}`)
    .then(response => response.json())
    .then(data => console.log(`GET /items/${id} response:`, data))
    .catch(error => console.error(`Error al hacer GET /items/${id}`, error));
}

// Llama la función para probar, por ejemplo buscando el ID 1:
testGetItemById(1);


  function testDeleteItemById(id) {
  fetch(`/items/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => console.log(`DELETE /items/${id} response:`, data))
    .catch(error => console.error(`Error al hacer DELETE /items/${id}`, error));
}

// Llama la función para probar eliminando el ID 1:
testDeleteItemById(1);

  function testPatchItemById(id) {
  fetch(`/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: 'Espada legendaria',
      efecto: 'Daño masivo'
    })
  })
    .then(response => response.json())
    .then(data => console.log(`PATCH /items/${id} response:`, data))
    .catch(error => console.error(`Error al hacer PATCH /items/${id}`, error));
}

// Llama la función para probar actualizando el ID 1:
testPatchItemById(1);


function testPostUsers() {
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      {
        id: 1,
        nombre: 'Isabela',
        correo: 'isabela@example.com',
        items: [1, 2] // IDs de items existentes
      },
      {
        id: 2,
        nombre: 'Fernando',
        correo: 'fernando@example.com',
        items: [2] // Otro usuario
      }
    ])
  })
  .then(response => response.json())
  .then(data => console.log('POST /users response:', data))
  .catch(error => console.error('Error al hacer POST /users', error));
}

// Llama automáticamente la función
testPostUsers();

  function testGetUsers() {
  fetch('/users')
    .then(response => response.json())
    .then(data => console.log('GET /users response:', data))
    .catch(error => console.error('Error al hacer GET /users', error));
}

testGetUsers();

  function testGetUserById(id) {
  fetch(`/users/${id}`)
    .then(response => response.json())
    .then(data => console.log(`GET /users/${id} response:`, data))
    .catch(error => console.error(`Error al hacer GET /users/${id}`, error));
}

testGetUserById(1);
