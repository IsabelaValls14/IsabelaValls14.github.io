const express = require('express');
const app = express();
const path = require('path');

// Esto permite que Express sirva archivos de /public
app.use(express.static('public'));

// Este endpoint sirve el archivo index.html cuando alguien visita "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
