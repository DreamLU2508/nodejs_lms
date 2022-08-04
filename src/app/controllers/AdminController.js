const Admin = require('../models/Admin');
const { passwordHash, vaildPassword } = require('../../util/password');
const password = require('../../util/password');
// const { mutipleMongooseToObject } = require('../../util/mongoose');

class Authentication{
    // [GET] /admin/add
    add(req, res, next) {
        res.json('ok')
    }

}

module.exports = new Authentication();
