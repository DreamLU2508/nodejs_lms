const Admin = require('../models/Admin');
const { passwordHash, vaildPassword } = require('../../util/password');
const password = require('../../util/password');
const { mongooseToObject } = require('../../util/mongoose');

class Authentication{
    // [GET] /admin/profile
    profile(req, res, next) {
        Admin.findById(req.session.passport.user)
            .then((admin) => {
                res.render('admin/profile', {
                    admin: mongooseToObject(admin)
                });
            })
            .catch(next)
    }

    // [GET] /admin/change-password
    changePassword(req, res, next) {
        res.render('admin/change-password');
    }

    // [PUT] /admin/edit
    edit(req, res, next) {
        if(req.file){
            req.body.photo = req.file.originalname;
        }
        Admin.updateOne({_id: req.user._id}, req.body)
            .then((admin) => {
                res.redirect('/admin/profile');
            })
    }

    // [PATCH] /admin/updatePassword
    updatePassword(req, res, next) {
        Admin.updateOne({_id: req.user._id}, {passwordHash: passwordHash(req.body.password)})
            .then(() => {
                res.redirect('/')
            })
    }

}

module.exports = new Authentication();
