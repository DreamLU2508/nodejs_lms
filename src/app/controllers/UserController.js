// const { render } = require('node-sass');
const md5 = require('md5');
const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
// const { render } = require('node-sass');
const { json } = require('express');

class SiteController {
    // [GET] /users/create
    create(req, res, next) {
        res.render('users/create');
    }

    // [GET] /users/:id/edit
    edit(req, res, next) {
        User.findOne({ _id: req.params.id})
            .then((user) => {
                res.render('users/edit', {
                    user: mongooseToObject(user)
                })
            })
            .catch(next);
    }

    // [GET] /users/show
    show(req, res, next) {
        
        User.find()
            .sort({[req.query.column]: req.query.type})
            .then((users) => {res.render('users/show', {
                users: mutipleMongooseToObject(users)
            })})
            .catch(next);
    }

    // [GET] /users/status
    status(req, res, next) {
        User.find()
            .sort({[req.query.column]: req.query.type})
            .then((users) => {res.render('users/status', {
                users: mutipleMongooseToObject(users)
            })})
            .catch(next);
    }

    // [POST] /users/store
    store(req, res, next) {
        req.body.img = "/img/user.png";
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.redirect("/users/show");
            })
            .catch(next);
    }

    // [PUT] /users/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/users/show'))
            .catch(next);
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

    // [PUT] /users/:id/activate
    activate(req, res, next) {
        User.updateOne({ _id: req.params.id }, {status: true})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PUT] /users/:id/deactivate
    deactivate(req, res, next) {
        User.updateOne({ _id: req.params.id }, {status: false})
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new SiteController();
