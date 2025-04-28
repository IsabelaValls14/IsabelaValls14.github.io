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