fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

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