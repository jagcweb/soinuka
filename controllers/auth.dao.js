const mongoose = require('mongoose');
const authSchema = require('../models/auth');

authSchema.statics = {
    login: function(query, callback){
        this.find(query, callback);
    }
}

const authModel = mongoose.model('User', authSchema);
module.exports = authModel;