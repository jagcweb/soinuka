var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        trim: true
    }
});

module.exports = UserSchema;