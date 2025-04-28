const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

let catalogoItems = [
  { id: 1, nombre: 'Espada', tipo: 'Arma', efecto: 'Daño alto' },
  { id: 2, nombre: 'Escudo', tipo: 'Defensa', efecto: 'Bloquea ataques' }
];
let usuarios = []

// Este endpoint sirve el archivo index.html cuando alguien visita "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
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
