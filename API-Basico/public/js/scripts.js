fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

  function testPatchUserById(id) {
  fetch(`/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: 'Isabela Actualizada',
      items: [2] // Solo actualizará los campos enviados
    })
  })
    .then(response => response.json())
    .then(data => console.log(`PATCH /users/${id} response:`, data))
    .catch(error => console.error(`Error al hacer PATCH /users/${id}`, error));
}

testPatchUserById(2);