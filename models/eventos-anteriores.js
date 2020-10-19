var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreviousEventSchema = Schema({
    titulo: String,
    imagen: String,
    descripcion: String,
    anio: Number
});

module.exports = mongoose.model('PreviousEvent', PreviousEventSchema);