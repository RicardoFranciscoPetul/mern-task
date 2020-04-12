const Tarea = require('../models/Tarea.model');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { proyecto } = req.body;
  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto)
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res
        .status(401)
        .json({ msg: 'No tienes permisos sobre este registro' });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};
