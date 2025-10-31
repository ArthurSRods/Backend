require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const logger = require('morgan');
const usuariosrouter = require('./routes/usuariosRouter');

const produtosrouter = require('./routes/produtosRouter');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/usuarios', usuariosrouter);
app.use('/produtos', produtosrouter);

module.exports = app;