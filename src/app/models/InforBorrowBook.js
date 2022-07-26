const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InforBorrowBook = new Schema({
    borrowDate: String,
    returnDate: String,
    expirationDate: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }
});

module.exports = mongoose.model('InforBorrowBook', InforBorrowBook);
