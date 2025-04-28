const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

let catalogoItems = [];
// let catalogoItems = [
//   { id: 1, nombre: 'Espada', tipo: 'Arma', efecto: 'Daño alto' },
//   { id: 2, nombre: 'Escudo', tipo: 'Defensa', efecto: 'Bloquea ataques' }
// ];

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

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = catalogoItems.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ mensaje: `Item con ID ${id} no encontrado` });
  }
  res.json(item)
})