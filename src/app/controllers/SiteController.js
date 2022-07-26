// const { render } = require('node-sass');
const User = require('../models/User');
const Book = require('../models/Book');
const InforBorrowBook = require('../models/InforBorrowBook');
// const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    async index(req, res, next) {
        const countUser = await User.count();
        const countBook = await Book.count();
        const countInforBorrowBook = await InforBorrowBook.count();
        const countBorrowBook = await InforBorrowBook.count({returnDate: ""});
        const countReturnBook = countInforBorrowBook - countBorrowBook;
        res.render( 'home',{
            user: countUser,
            book: countBook,
            borrowBook: countBorrowBook,
            returnBook: countReturnBook,
        })
    }
}

module.exports = new SiteController();
