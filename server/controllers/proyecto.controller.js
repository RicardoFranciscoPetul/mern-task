const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  try {
    const proyecto = new Proyecto(req.body);

    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id });
    res.status(200).json({ proyectos });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { nombre } = req.body;
  const nuevoProyecto = {};
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto)
      return res.status(404).json({ msg: 'proyecto no encontrado' });

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({
        msg: 'Acción no permitida, no tienes permisos sobre este registro',
      });
    }
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    return res.status(200).json({ nuevoProyecto });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
