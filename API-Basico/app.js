const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

let catalogoItems = [
  { id: 1, nombre: 'Espada', tipo: 'Arma', efecto: 'Daño alto' },
  { id: 2, nombre: 'Escudo', tipo: 'Defensa', efecto: 'Bloquea ataques' }];
let usuarios = [
  { id: 1, nombre: 'Isabela', correo: 'isabela@example.com', items: [1, 2] },
  { id: 2, nombre: 'Fernando', correo: 'fernando@example.com', items: [2] }]; 

// Este endpoint sirve el archivo index.html cuando alguien visita "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
// Endpoint para agregar ítems
app.post('/items', (req, res) => {
  const nuevosItems = Array.isArray(req.body) ? req.body : [req.body];
  const errores = [];

  for (const item of nuevosItems) {
    const { id, nombre, tipo, efecto } = item;

    if (!id || !nombre || !tipo || !efecto) {
      errores.push({ item, error: 'Faltan campos requeridos' });
      continue;
    }

    const existe = catalogoItems.find(i => i.id === id);
    if (existe) {
      errores.push({ item, error: 'ID duplicado' });
      continue;
    }

    catalogoItems.push(item);
  }

  if (errores.length > 0) {
    return res.status(400).json({ mensaje: 'Algunos items no se agregaron', errores });
  }

  res.status(201).json({ mensaje: 'Items agregados correctamente' });
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/items', (req, res) => {
  if (catalogoItems.length === 0) {
    return res.status(404).json({ mensaje: 'No hay items en el catálogo' });
  }
  
  res.json(catalogoItems);
});


app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = catalogoItems.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ mensaje: `Item con ID ${id} no encontrado` });
  }
  res.json(item)
})

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = catalogoItems.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: `Item con ID ${id} no encontrado` });
  }

  catalogoItems.splice(index, 1);
  res.json({ mensaje: `Item con ID ${id} eliminado correctamente` });
});


app.patch('/items/:id', (req, res) => {
  const { nombre, tipo, efecto } = req.body;

  if (nombre) item.nombre = nombre;
  if (tipo) item.tipo = tipo;
  if (efecto) item.efecto = efecto;

  res.json({ mensaje: `Item con ID ${id} actualizado correctamente`, item });
});

app.post('/users', (req, res) => {
  const nuevosUsuarios = Array.isArray(req.body) ? req.body : [req.body];
  const errores = [];

  for (const usuario of nuevosUsuarios) {
    const { id, nombre, correo, items } = usuario;

    if (!id || !nombre || !correo || !Array.isArray(items)) {
      errores.push({ usuario, error: 'Faltan campos requeridos o items no es arreglo' });
      continue;
    }

    const usuarioExistente = usuarios.find(u => u.id === id);
    if (usuarioExistente) {
      errores.push({ usuario, error: 'ID de usuario duplicado' });
      continue;
    }

    // Verificar que los items existan en el catálogo
    const itemsInvalidos = items.some(itemId => !catalogoItems.find(item => item.id === itemId));
    if (itemsInvalidos) {
      errores.push({ usuario, error: 'Uno o más items no existen en el catálogo' });
      continue;
    }

    usuarios.push(usuario);
  }

  if (errores.length > 0) {
    return res.status(400).json({ mensaje: 'Algunos usuarios no se agregaron', errores });
  }

  res.status(201).json({ mensaje: 'Usuarios agregados correctamente' });
});
app.get('/users', (req, res) => {
  if (usuarios.length === 0) {
    return res.status(404).json({ mensaje: 'No hay usuarios registrados' });
  }

  const usuariosConItems = usuarios.map(usuario => {
    const itemsCompletos = usuario.items.map(itemId => {
      return catalogoItems.find(item => item.id === itemId);
    });
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      items: itemsCompletos
    };
  });

  res.json(usuariosConItems);
});
