require('dotenv').config;

const express = require('express');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
// const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport')

const db = require('./config/db/index')
const route = require('./routes');
const configPassport = require('./config/passport')
const sortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = process.env.PORT || 3000;
db.connect();


// morgan
// app.use(morgan('combined'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// can de su dung dc  body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// method override
app.use(methodOverride('_method'));

// handlebars set view
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            status: (status) => {
                if (status) {
                    return 'Hoạt động';
                } else {
                    return 'Tạm dừng';
                }
            },
            displayReturnBook: (returnDate) => {
                if (returnDate === "") {
                    return 'Chưa trả';
                } else {
                    return returnDate;
                }
            },
            sortable: (field, sort) => {
                var sortCheckColumn = field === sort.column ? sort.type : "default";

                var icon = {
                    default: 'fa-solid fa-sort',
                    asc: "fa-solid fa-arrow-down-short-wide",
                    desc: "fa-solid fa-arrow-down-wide-short"
                }

                var type = {
                    default: 'desc',
                    asc: "desc",
                    desc: "asc"
                }

                var sortIcon = icon[sortCheckColumn];
                var sortType = type[sort.type];

                return `<a href="?_sort&column=${field}&type=${sortType}"><i class="${sortIcon} mx-2"></i></a>`
            }
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// config session connect mongodb
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: db.dbString
    }),
}))

// config passport
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// custom middleware
app.use((req, res, next) => {
    console.log(req.user);
    next();
})
app.use(sortMiddleware);

//route
route(app);

// listen port
app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
});


