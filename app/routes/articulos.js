const express = require('express');
const articulosRouter = express.Router();
const Articulo = require('../models/articulo');
const _ = require('underscore');

/**
 * Crear un articulo en la lista
 */
articulosRouter.post('/v1/articulos', (req, res) => {
    let body = req.body;

    let articulo = new Articulo({
        nombre: body.nombre,
        unidad_medida: body.unidad_medida,
        nacional: body.nacional
    });

    articulo.save((err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json(articuloDB);
    });
});

/**
 * Obtener todos los articulos
 */
articulosRouter.get('/v1/articulos', (req, res) => {
    Articulo.find({}, (err, articulos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.send(articulos);
    });
});

/**
 * Obtener un articulo por id
 */
articulosRouter.get('/v1/articulos/:id', (req, res) => {
    let id = req.params.id;

    Articulo.findById(id, (err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json(articuloDB);
    })
});


/**
 * Actualizar un articulo de la lista
 */
articulosRouter.put('/v1/articulos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['comprado']);

    Articulo.findByIdAndUpdate(id, body, { new: true }, (err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json(articuloDB);
    });
});


/**
 * Borra un articulo de la lista
 */
articulosRouter.delete('/v1/articulos/:id', (req, res) => {
    let id = req.params.id;

    Articulo.findByIdAndRemove(id, (err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!articuloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ariculo no encontrado'
                }
            });
        };
        res.json(articuloDB);
    });
});

module.exports = articulosRouter;