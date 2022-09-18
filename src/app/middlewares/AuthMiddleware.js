module.exports = function SortMiddleware (req, res, next) {
    if(req.isAuthenticated()){
        
        res.locals.admin = {
            name: req.user.name,
            photo: req.user.photo,
        }
        return next();
    }
    res.redirect('/login')
}