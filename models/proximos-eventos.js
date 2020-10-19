var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NextEventSchema = Schema({
    titulo: String,
    imagen: String,
    descripcion: String,
    anio: Number
});

module.exports = mongoose.model('NextEvent', NextEventSchema);