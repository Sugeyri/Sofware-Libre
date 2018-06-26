const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rol = new Schema({
    name: { type: String },
    description: { type: String }
    
});

module.exports = mongoose.model('roles', rol);