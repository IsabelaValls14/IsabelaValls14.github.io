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
