const siteRouter = require('./site');
const userRouter = require('./user');
const bookRouter = require('./book');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const inforBorrowBookRouter = require('./inforBorrowBook');
const authMiddleware = require('../app/middlewares/AuthMiddleware')

function Route(app) {
    app.use('/login', authRouter);

    //custom middleware
    app.use(authMiddleware);

    app.use('/', siteRouter);
    
    app.use('/admin', adminRouter);

    app.use('/users', userRouter);

    app.use('/books', bookRouter);

    app.use('/information-borrow', inforBorrowBookRouter);
}

module.exports = Route;
