const InforBorrowBook = require('../models/InforBorrowBook');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class InforBorrowBookControllder {
    // [GET] /information-borrow/show
    show(req, res, next) {
        InforBorrowBook.find().populate('userId').populate('bookId')
            .then(InforBorrowBooks => {
                res.render("inforBorrow/show", {
                    InforBorrowBooks: mutipleMongooseToObject(InforBorrowBooks)
                });
            })
            .catch(next);
    }

    // [GET] /information-borrow/:id/detail
    detail(req, res, next) {
        res.json('thành công')
    }
}

module.exports = new InforBorrowBookControllder();
