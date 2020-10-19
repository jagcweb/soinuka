var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
    nombre: String,
    email: String,
    telefono: String,
    mensaje: String
});

module.exports = mongoose.model('Contact', ContactSchema);