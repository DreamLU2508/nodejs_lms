// const { render } = require('node-sass');
const { render } = require('node-sass');
const Admin = require('../models/Admin');
const { mongooseToObject } = require('../../util/mongoose');
const md5 = require('md5');

class AdminController {
    // [GET] /admin/profile
    profile(req, res, next) {
        Admin.findById(req.cookies.admin)
            .then(admin => {
                res.render('admin/profile', {
                    admin: mongooseToObject(admin)
                });
            })
            .catch(next);   
    }

    // [GET] /admin/change-password
    changePassword(req, res, next) {
        res.render('admin/change-password') 
    }

    // [PUT] /admin/edit
    edit(req, res, next) {
        if(req.file){
            req.body.photo = req.file.path.split("\\").slice(4).join();
        }
        Admin.updateOne({_id: req.cookies.admin}, req.body)
            .then(() => {
                res.redirect("/admin/profile");
            })
            .catch(next)
    }

    // [PATCH] /admin/edit-password
    editPassword(req, res, next) {
        if(req.body.password === req.body.confirmPassword){
            Admin.updateOne({_id: req.cookies.admin}, {password: md5(req.body.password)})
                .then(res.redirect('/'))
                .catch(next)
        }

        res.render('admin/change-password', {
            err: true,
            message: 'Mật khẩu không khớp'
        })
    }
}

module.exports = new AdminController();
