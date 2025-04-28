fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

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
