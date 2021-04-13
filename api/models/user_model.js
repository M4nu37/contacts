const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    contacts: Array
});

module.exports = mongoose.model('user', userSchema);