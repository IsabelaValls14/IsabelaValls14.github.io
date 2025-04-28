fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

  function testGetItemById(id) {
  fetch(`/items/${id}`)
    .then(response => response.json())
    .then(data => console.log(`GET /items/${id} response:`, data))
    .catch(error => console.error(`Error al hacer GET /items/${id}`, error));
}

// Llama la función para probar, por ejemplo buscando el ID 1:
testGetItemById(1);
