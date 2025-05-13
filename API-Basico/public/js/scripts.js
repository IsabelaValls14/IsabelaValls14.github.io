document.getElementById('form-item').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    id: parseInt(formData.get('id')),
    nombre: formData.get('nombre'),
    tipo: formData.get('tipo'),
    efecto: formData.get('efecto')
  };

  try {
    const response = await fetch('/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Item registrado correctamente');
    } else {
      alert('ERROR al registrar: ' + result.mensaje);
    }

    console.log(result);
  } catch (error) {
    console.error('Error al hacer POST /items', error);
    alert('Error en la solicitud');
  }

  e.target.reset(); // Limpia el formulario
});

document.getElementById('form-item2').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();
  const lista = document.getElementById('lista-items');
  lista.innerHTML = '';

  // Si el input esta vacio
  const url = id ? `/items/${id}` : '/items';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      alert(data.mensaje || 'ERROR al obtener los datos');
      return;
    }

    if (Array.isArray(data)) {
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.id} - ${item.nombre} (${item.tipo}) → ${item.efecto}`;
        lista.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent =  `${data.id} - ${data.nombre} (${data.tipo}) → ${data.efecto}`;
      lista.appendChild(li);
    }
  } catch (err) {
    console.error('ERROR al hacer GET /items', err);
    alert('ERROR en la solicitud');
  }
   form.reset();
});

document.getElementById('form-item3').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();

  if (!id) {
    alert('Por favor ingresa un ID válido');
    return;
  }

  try {
    const response = await fetch(`/items/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Item con ID ${id} eliminado correctamente`);
    } else {
      alert('ERROR al eliminar: ' + result.mensaje);
    }

    console.log(result);
  } catch (error) {
    console.error('Error al hacer DELETE /items', error);
    alert('Error en la solicitud');
  }

  e.target.reset(); // Limpia el formulario
});

document.getElementById('form-update-item').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();

  if (!id) {
    alert('Por favor ingresa el ID del item a actualizar');
    return;
  }

  // Construir el objeto solo con campos que se hayan llenado
  const payload = {};
  const nombre = form.elements['nombre'].value.trim();
  const tipo = form.elements['tipo'].value.trim();
  const efecto = form.elements['efecto'].value.trim();

  if (nombre) payload.nombre = nombre;
  if (tipo) payload.tipo = tipo;
  if (efecto) payload.efecto = efecto;

  if (Object.keys(payload).length === 0) {
    alert('Debes llenar al menos un campo para actualizar');
    return;
  }

  try {
    const response = await fetch(`/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Item con ID ${id} actualizado correctamente`);
    } else {
      alert(`ERROR: ${result.mensaje}`);
    }

    console.log(result);
  } catch (error) {
    console.log("ID a actualizar:", id);
    console.log("Payload:", payload);
    console.error('Error al hacer PATCH /items', error);
    alert('ERROR en la solicitud');
  }

  form.reset(); // limpia el formulario
});

document.getElementById('form-user').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const itemsString = formData.get('items').trim();

  const data = {
    id: parseInt(formData.get('id')),
    nombre: formData.get('nombre'),
    correo: formData.get('correo'),
    items: itemsString ? itemsString.split(',').map(id => parseInt(id.trim())) : []
  };

  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('User registrado correctamente');
    } else {
      alert('ERROR al registrar: ' + result.mensaje);
    }

    console.log(result);
  } catch (error) {
    console.error('Error al hacer POST /users', error);
    alert('Error en la solicitud');
  }

  e.target.reset(); // Limpia el formulario
});

document.getElementById('form-get-user').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();
  const lista = document.getElementById('lista-usuarios');
  lista.innerHTML = '';

  const url = id ? `/users/${id}` : '/users';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      alert(data.mensaje || 'ERROR al obtener los datos');
      return;
    }

    const renderUsuario = (usuario) => {
      const li = document.createElement('li');
      const items = usuario.items.map(i => `${i.nombre} (${i.tipo})`).join(', ');
      li.textContent = `${usuario.id} - ${usuario.nombre} (${usuario.correo}) → ${items}`;
      lista.appendChild(li);
    };

    if (Array.isArray(data)) {
      data.forEach(renderUsuario);
    } else {
      renderUsuario(data);
    }
  } catch (err) {
    console.error('ERROR al hacer GET /users', err);
    alert('ERROR en la solicitud');
  }

  form.reset();
});

document.getElementById('form-delete-user').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();

  if (!id) {
    alert('Por favor ingresa el ID del usuario a eliminar');
    return;
  }

  try {
    const response = await fetch(`/users/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Usuario con ID ${id} eliminado correctamente`);
    } else {
      alert(`ERROR: ${result.mensaje}`);
    }

    console.log(result);
  } catch (error) {
    console.error('Error al hacer DELETE /users', error);
    alert('ERROR en la solicitud');
  }

  form.reset();
});

document.getElementById('form-update-user').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value.trim();

  if (!id) {
    alert('Por favor ingresa el ID del usuario a actualizar');
    return;
  }

  const payload = {};
  const nombre = form.elements['nombre'].value.trim();
  const correo = form.elements['correo'].value.trim();
  const itemsRaw = form.elements['items'].value.trim();

  if (nombre) payload.nombre = nombre;
  if (correo) payload.correo = correo;
  if (itemsRaw) {
    payload.items = itemsRaw.split(',').map(id => parseInt(id.trim())).filter(Boolean);
  }

  if (Object.keys(payload).length === 0) {
    alert('Debes llenar al menos un campo para actualizar');
    return;
  }

  try {
    const response = await fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Usuario con ID ${id} actualizado correctamente`);
    } else {
      alert(`ERROR: ${result.mensaje}`);
    }

    console.log(result);
  } catch (error) {
    console.error('Error al hacer PATCH /users', error);
    alert('ERROR en la solicitud');
  }

  form.reset();
});




// fetch('/')
//   .then(response => {
//     console.log('Respuesta de /:', response.status);
//   })
//   .catch(error => {
//     console.error('Error al hacer fetch a /', error);
//   });
 
//   function testGetItems() {
//   fetch('/items')
//     .then(response => response.json())
//     .then(data => console.log('GET /items response:', data))
//     .catch(error => console.error('Error al hacer GET /items', error));
// }

// testGetItems();

// function testPostItems() {
//   fetch('/items', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([
//       { id: 1, nombre: 'Espada', tipo: 'Ataque', efecto: 'Daño alto' },
//       { id: 2, nombre: 'Escudo', tipo: 'Defensa', efecto: 'Bloquea ataques' }
//     ])
//   })
//   .then(response => response.json())
//   .then(data => console.log('POST /items response:', data))
//   .catch(error => console.error('Error al hacer POST /items', error));
// }

// testPostItems();


//   function testGetItemById(id) {
//   fetch(`/items/${id}`)
//     .then(response => response.json())
//     .then(data => console.log(`GET /items/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer GET /items/${id}`, error));
// }

// // Llama la función para probar, por ejemplo buscando el ID 1:
// testGetItemById(1);


//   function testDeleteItemById(id) {
//   fetch(`/items/${id}`, {
//     method: 'DELETE'
//   })
//     .then(response => response.json())
//     .then(data => console.log(`DELETE /items/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer DELETE /items/${id}`, error));
// }

// // Llama la función para probar eliminando el ID 1:
// testDeleteItemById(1);

// function testPatchItemById(id) {
//   fetch(`/items/${id}`, {
//       nombre: 'Espada legendaria',
//       efecto: 'Daño masivo'
//     })
//     .then(response => response.json())
//     .then(data => console.log(`PATCH /items/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer PATCH /items/${id}`, error));
// }

// // Llama la función para probar actualizando el ID 1:
// testPatchItemById(1);

// function testPostUsers() {
//   fetch('/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([
//       {
//         id: 1,
//         nombre: 'Isabela',
//         correo: 'isabela@example.com',
//         items: [1, 2] // IDs de items existentes
//       },
//       {
//         id: 2,
//         nombre: 'Fernando',
//         correo: 'fernando@example.com',
//         items: [2] // Otro usuario
//       }
//     ])
//   })
//   .then(response => response.json())
//   .then(data => console.log('POST /users response:', data))
//   .catch(error => console.error('Error al hacer POST /users', error));
// }

// // Llama automáticamente la función
// testPostUsers();

//   function testGetUsers() {
//   fetch('/users')
//     .then(response => response.json())
//     .then(data => console.log('GET /users response:', data))
//     .catch(error => console.error('Error al hacer GET /users', error));
// }

// testGetUsers();

//   function testGetUserById(id) {
//   fetch(`/users/${id}`)
//     .then(response => response.json())
//     .then(data => console.log(`GET /users/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer GET /users/${id}`, error));
// }

// testGetUserById(1);

//   function testDeleteUserById(id) {
//   fetch(`/users/${id}`, {
//     method: 'DELETE'
//   })
//     .then(response => response.json())
//     .then(data => console.log(`DELETE /users/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer DELETE /users/${id}`, error));
// }

// testDeleteUserById(1);

// function testPatchUserById(id) {
//   fetch(`/users/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       nombre: 'Isabela Actualizada',
//       items: [2] // Solo actualizará los campos enviados
//     })
//   })
//     .then(response => response.json())
//     .then(data => console.log(`PATCH /users/${id} response:`, data))
//     .catch(error => console.error(`Error al hacer PATCH /users/${id}`, error));
// }

// testPatchUserById(2);

