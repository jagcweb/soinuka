var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NextEventEusSchema = Schema({
    titulo: String,
    imagen: String,
    descripcion: String,
    anio: Number
});

module.exports = mongoose.model('NextEventsEu', NextEventEusSchema);