const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth')
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'El formato de correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 5 }),
  ],
  authController.autenticarUsuario
);

router.get('/', auth, authController.usuarioAutenticado)

module.exports = router;
