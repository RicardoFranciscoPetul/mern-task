const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
  '/',
  [check('nombre', 'El nombre es requerido').not().isEmpty()],
  auth,
  proyectoController.crearProyecto
);

router.get('/', auth, proyectoController.obtenerProyectos);

router.put('/:id', auth, proyectoController.actualizarProyecto);

module.exports = router;
