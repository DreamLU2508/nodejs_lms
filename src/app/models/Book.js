const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    name: String,
    image: String,
    author: String,
    datePurchase: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Book', Book);
