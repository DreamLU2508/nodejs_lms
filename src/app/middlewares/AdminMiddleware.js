const Admin = require('../models/Admin');
const { mongooseToObject } = require('../../util/mongoose');

module.exports = async function AdminMiddleware (req, res, next) {
    if(req.cookies.admin) {
        res.locals.admin = {
            name: '',
            photo: ''
        };

        Admin.findOne({_id: req.cookies.admin})
            .then((admin) => {
                res.locals.admin.name = admin.name;
                res.locals.admin.photo = admin.photo;
            })
    }

    next()
}
