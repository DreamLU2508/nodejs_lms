const Admin = require('../models/Admin');
// const { mutipleMongooseToObject } = require('../../util/mongoose');

class Authentication{
    // [GET] /login
    login(req, res, next) {
        res.render('login', {layout: false})
    }

    // [GET] /auth/logout
    logout(req, res, next) {
        req.logOut();
        console.log(req.session);
        res.redirect('/auth');
    }
}

module.exports = new Authentication();
