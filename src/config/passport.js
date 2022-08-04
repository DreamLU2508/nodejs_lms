const stratery = require('passport-local');
const Admin = require('../app/models/Admin')
const { vaildPassword } = require('../util/password')

module.exports = function configPassport(passport) {
    var customField = {
        usernameField: 'username',
        passwordField: 'password',
    };

    var veryfyCallback = (username, password, done) => {
        console.log('?')
        Admin.findOne({ username: username })
            .then((admin) => {
                if (!admin) {
                    return done(null, false);
                }

                var isVaild =  vaildPassword(password, admin.passwordHash);
                
                if (isVaild) { return done(null, admin); }
                else { return done(null, false); }
            })
            .catch((err) => {
                return done(err);
            })
    };

    passport.use(new stratery(customField, veryfyCallback));

    passport.serializeUser(function (admin, done) {
        done(null, admin.id);
    });

    passport.deserializeUser(function (adminId, done) {
        Admin.findById(adminId)
            .then((admin => { return done(null, admin); }))
            .catch(err => { return done(err)})
    });
}