// const { render } = require('node-sass');
// const { render } = require('node-sass');
const Admin = require('../models/Admin');
const md5 = require('md5');
// const { mutipleMongooseToObject } = require('../../util/mongoose');

class Authentication{
    // [GET] /auth
    login(req, res, next) {
        res.render('login', {layout: false})
    }

    // [POST] /auth/process
    process(req, res, next) {
        Admin.findOne({username: req.body.username})
            .then(admin => {
                if(admin.password !== md5(req.body.password)){
                    res.render('login', {
                        error: "Mật khẩu không đúng" ,
                        layout: false
                    });
                    return;
                }
                res.cookie('admin', admin._id);

                res.redirect('/');
            })
            .catch(() => {
                res.render('login', {
                    error: "Tài khoản không tồn tại" ,
                    layout: false
                });
            })
    }

    // [GET] /auth/logout
    logout(req, res, next) {
        res.clearCookie('admin');
        res.redirect('/auth')
    }
}

module.exports = new Authentication();
