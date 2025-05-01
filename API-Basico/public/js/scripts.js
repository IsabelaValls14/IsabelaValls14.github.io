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

