const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  try {
    const verificado = jwt.verify(token, process.env.SECRET);
    req.usuario = verificado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no valido', error });
  }
};
