// const { render } = require('node-sass');
const Book = require('../models/Book');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const { json } = require('express');

class BookController {
    // [GET] /books/create
    create(req, res, next) {
        res.render('books/create');
    }

    // [GET] /books/show
    show(req, res, next) {
        Book.find().sort({[req.query.column]: req.query.type})
            .then((books) => {
                res.render('books/show', {
                    books: mutipleMongooseToObject(books)
                });       
            })
            .catch(next);
    }

    // [GET] /:id/edit
    edit(req, res, next) {
        Book.findOne({_id: req.params.id})
            .then((book) => {
                res.render('books/edit', {
                    book: mongooseToObject(book)
                });
            })
            .catch(next);
    }

    // [POST] /books/store
    store(req, res, next) {
        if(req.file){
            req.body.image = "/" + req.file.path.split("\\").slice(2).join("/");
        }
        var book = new Book(req.body);
        book.save()
            .then(() => {
                res.redirect("/books/show");
            })
            .catch(next);
    }

    // [PUT] /books/:id
    update(req, res, next) {
        if(req.file){
            req.body.image = "/" + req.file.path.split("\\").slice(2).join("/");
        }
        Book.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/books/show");
            })
            .catch(next)
    }

    // [DELETE] /books/:id
    delete(req, res, next) {
        Book.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect("back");
            })
            .catch(next)
    }
}

module.exports = new BookController();