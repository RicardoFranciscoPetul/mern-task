const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
  '/',
  auth,
  [check('nombre', 'El nombre es requerido').notEmpty()],
  tareaController.crearTarea
);

module.exports = router;
