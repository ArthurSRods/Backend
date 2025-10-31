const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const token = gerarToken({ email: usuario });
  res.status(200).json({ token });
});

router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  res.status(200).json({ token });
});

module.exports = router;