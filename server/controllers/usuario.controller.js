const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        msg: `El correo: ${email} ya esta registrado`,
      });
    }
    usuario = new Usuario(req.body);

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ usuario, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send('Ocurrio un error');
  }
};
