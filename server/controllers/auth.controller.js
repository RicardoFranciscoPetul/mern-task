const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto)
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ usuario, token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
