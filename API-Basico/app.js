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

app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: `Usuario con ID ${id} no encontrado` });
  }

  const { nombre, correo, items } = req.body;

  if (nombre) usuario.nombre = nombre;
  if (correo) usuario.correo = correo;
  
  if (items) {
    if (!Array.isArray(items)) {
      return res.status(400).json({ mensaje: 'Items debe ser un arreglo' });
    }
    const itemsInvalidos = items.some(itemId => !catalogoItems.find(item => item.id === itemId));
    if (itemsInvalidos) {
      return res.status(400).json({ mensaje: 'Uno o más items no existen en el catálogo' });
    }
    usuario.items = items;
  }

  res.json({ mensaje: `Usuario con ID ${id} actualizado correctamente`, usuario });
});