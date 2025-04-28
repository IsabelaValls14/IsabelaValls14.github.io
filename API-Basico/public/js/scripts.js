fetch('/')
  .then(response => {
    console.log('Respuesta de /:', response.status);
  })
  .catch(error => {
    console.error('Error al hacer fetch a /', error);
  });

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

// Llama automáticamente la función para que se pruebe al abrir la página
testPostItems();