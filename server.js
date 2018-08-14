/* jslint node: true */
'use strict'

//carga de archivo de configuración
require('./app/config/config');

//modulos npm
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//inicio de aplicación
const app = express();

//application/json
app.use(bodyParser.json());

//urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// habilitación de cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    next();
});

//habilitar la carpeta rutas
app.use(express.static(path.resolve(__dirname, './public')));

//logger para modo desarrollo
app.use(morgan('dev'));

//configuración global de rutas
var articulosRoutes = require('./app/routes/articulos');
app.use('/api', articulosRoutes);

//conexión a base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Se ha conectado a la BD');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});

// Server index.html page when request to the root is made
app.get('/', function(req, res, next) {
    res.sendfile('./public/index.html')
})