const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario ingresar nombre']
    },
    comprado: {
        type: Boolean,
        default: false
    }
}, { collection: 'articulos' });

module.exports = mongoose.model('Articulo', articuloSchema);