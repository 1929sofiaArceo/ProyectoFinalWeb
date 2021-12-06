const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const schemaMascotas = new Schema({
    _nombre:{
        type: String,
        required: true
    },
    _genero:{
        type: String,
        required: true
    },
    _image:{
        type: String,
        required: true
    },
    _especie:{
        type: String,
        required: true
    },
    _raza:{
        type: String,
        required: true
    },
    _size:{
        type: String,
        required: true
    },
    _vacunas:{
        type: String,
        required: true
    },
    _edad:{
        type: Number,
        required: true
    },
    _desparasitado:{
        type: String,
        required: true
    },
    _esterilizado:{
        type: String,
        required: true
    },
    _expediente:{
        type: String
    }
}, { collection: 'mascotas'});

const Mascotas = mongoose.model("Mascota", schemaMascotas);
module.exports = Mascotas;
