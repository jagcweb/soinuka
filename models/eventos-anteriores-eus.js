var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreviousEventEusSchema = Schema({
    titulo: String,
    imagen: String,
    descripcion: String,
    anio: Number
});

module.exports = mongoose.model('PreviousEventsEu', PreviousEventEusSchema);