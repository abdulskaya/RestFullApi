const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const db = require('./src/config/db');
const db_config = require('./src/config/config.json')
const session = require('express-session');
const flash = require('connect-flash');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport');
const router = require("./src/routers/router");
const assosications = require('./src/models/assosications');
const seqStore = new SequelizeStore({
    db: db,
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        //expiration : 10 * 1000,
        checkExpirationInterval : 10 * 100
    },
    store: seqStore,
    proxy: false, //set true if you do SSL outside of node .
}));

seqStore.sync();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(flash());

app.use( function (req, res, next) {
    res.locals.error =  req.flash('error'); 
    next();
});

app.use(passport.initialize());
app.use(passport.session());

//routers
app.use('/api',router);

app.listen(3000, () => {
    console.log('System is running on 3000');
})