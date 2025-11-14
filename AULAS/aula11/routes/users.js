const express = require('express');
const { gerarToken, verificarToken } = require("../middlewares/auth");
const Usuario = require("../models/userModel");
const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const {username, password } = req.body;

  if (username === "arthu@iesb.br" && password === "abcd1234"){
    const payload = {
      iss: "Minha API",
      email: username,
      nome: "Arthur",
      perfil: "admin",
    };
    try {
      return res.json({ token: gerarToken(payload) });
    } catch(err){
      return res.status(500).json({msg: err.message});
    }
  }

  return res.status(401).json({msg: "Credenciais Invalidas"});
});

router.post("/renovar", verificarToken, function (req, res) {
  try {
    const payload = {
      iss: req.payload.iss,
      email: req.payload.email,
      nome: req.payload.nome,
      perfil: req.payload.perfil,
    };
    return res.json({ token: gerarToken(payload) });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
