fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

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