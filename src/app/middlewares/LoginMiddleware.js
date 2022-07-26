module.exports = function LoginMiddleware (req, res, next) {
    if(!req.cookies.admin) {
        res.redirect('/auth');
        return;
    }

    next()
}
