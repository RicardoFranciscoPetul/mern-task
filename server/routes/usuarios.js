const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('nombre', 'Falta el campo nombre').not().isEmpty(),
    check('email', 'El formato de correo no es valido').isEmail(),
    check(
      'password',
      'La contraseña debe contener al menos 5 caracteres'
    ).isLength({ min: 5 }),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
