fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

  function testGetUserById(id) {
  fetch(`/users/${id}`)
    .then(response => response.json())
    .then(data => console.log(`GET /users/${id} response:`, data))
    .catch(error => console.error(`Error al hacer GET /users/${id}`, error));
}

testGetUserById(1);