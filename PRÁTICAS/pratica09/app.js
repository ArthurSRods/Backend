const express = require('express');
const app = express();
const apirouterDocs = require('./routes/apidocsRouter');

app.use(express.json());
app.use('/api-docs', apirouterDocs);

module.exports = app;