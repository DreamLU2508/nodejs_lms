const bcrypt = require('bcryptjs');

module.exports = {
    passwordHash: function (password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
    
        return hash;
    },
    
    vaildPassword: function (password, passwordHash) {
        return bcrypt.compareSync(password, passwordHash);
    }
}