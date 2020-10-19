var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = Schema({
    imagen: String
});

module.exports = mongoose.model('Slider', SliderSchema);