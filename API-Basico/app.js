const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json()); 

let catalogoItems = [];

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