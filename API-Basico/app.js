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
