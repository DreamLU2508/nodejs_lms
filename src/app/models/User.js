const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phone: String,
    img: String,
    status: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('User', User);
