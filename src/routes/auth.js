const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const authController = require('../app/controllers/AuthController');
require('../config/passport')

router.get('/', authController.login);
router.get('/reset-password', authController.resetPassword);
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
