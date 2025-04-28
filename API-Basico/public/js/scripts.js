fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

  function testGetUsers() {
  fetch('/users')
    .then(response => response.json())
    .then(data => console.log('GET /users response:', data))
    .catch(error => console.error('Error al hacer GET /users', error));
}

testGetUsers();