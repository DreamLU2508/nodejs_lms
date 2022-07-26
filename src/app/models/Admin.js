const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phone: String,
    photo: String,
});

module.exports = mongoose.model('Admin', Admin);
