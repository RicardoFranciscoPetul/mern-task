const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'El formato de correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 5 }),
  ],
  authController.autenticarUsuario
);

module.exports = router;
