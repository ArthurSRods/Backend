const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: { type: String, required: true },
  concluida: Boolean,
});

module.exports = mongoose.model("Tarefa", schema);