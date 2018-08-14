const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario ingresar nombre']
    },
    unidad_medida: {
        type: String
    },
    nacional: {
        type: Boolean
    }
}, { collection: 'articulos' });

module.exports = mongoose.model('Articulo', articuloSchema);