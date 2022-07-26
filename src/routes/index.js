const siteRouter = require('./site');
const userRouter = require('./user');
const bookRouter = require('./book');
const authenticationRouter = require('./authentication');
const adminRouter = require('./admin');
const inforBorrowBookRouter = require('./inforBorrowBook');
const loginMiddleware = require('../app/middlewares/LoginMiddleware')

function Route(app) {
    app.use('/auth', authenticationRouter)
    
    app.use('/admin', loginMiddleware, adminRouter)    

    app.use('/', loginMiddleware, siteRouter);

    app.use('/users', loginMiddleware, userRouter);

    app.use('/books', loginMiddleware, bookRouter);

    app.use('/information-borrow', loginMiddleware, inforBorrowBookRouter);
}

module.exports = Route;
