const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const activeRouter = require('./routes/active');
//const userRouter = require('./routes/users');
const session = require('express-session');

const app = express();
app.use(session({secret: "test", resave: true, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/actives', activeRouter);
//app.use('/api/users', userRouter);
app.use(function (req, res, next) {
    res.status(404).send("Oops! The requested view does not exist.")
});

module.exports = app;
