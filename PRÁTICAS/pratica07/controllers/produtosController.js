const mongoose = require("mongoose");
const Produto = require("../models/produtosModel");

async function criar(req, res) {
  try {
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco
    });
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  const produtoEncontrado = await Produto.findOne({ _id: id });

  if (!produtoEncontrado) {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }

  req.produto = produtoEncontrado;
  return next();
}

function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
    const id = req.params.id;
    const { nome, preco } = req.body;
  
    if (!nome || !preco) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
  
    try {
      const produtoAtualizado = await Produto.findOneAndUpdate(
        { _id: id },
        { nome, preco },
        { runValidators: true, new: true }
      );
    
      if (!produtoAtualizado) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }
  
      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return res.status(400).json({ msg: "Parâmetro inválido" });
    }
  }
  

async function remover(req, res) {
  const id = req.params.id;
  const produtoRemovido = await Produto.findOneAndDelete({ _id: id });

  if (!produtoRemovido) {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }

  return res.status(204).send();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
