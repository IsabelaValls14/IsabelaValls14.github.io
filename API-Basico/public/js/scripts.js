fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

  function testDeleteUserById(id) {
  fetch(`/users/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => console.log(`DELETE /users/${id} response:`, data))
    .catch(error => console.error(`Error al hacer DELETE /users/${id}`, error));
}

testDeleteUserById(1);