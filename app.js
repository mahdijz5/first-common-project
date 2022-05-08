require('dotenv').config({path : './configs/configs.env'});
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')

const path = require('path');

const connectDB = require('./configs/db');

//* DataBase connection
connectDB();

const app = express();

//* body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//* session
app.use(
    
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            
        })
    })
    );


//*connect flash
app.use(flash());


//* view engin
app.use(expressEjsLayout)
app.set('view engine', 'ejs')
app.set('layout', './layouts/mainLayout')
app.set('views', 'views')

//* statics
app.use(express.static(path.join(__dirname, 'public')))

//* Routes
app.use('/', require('./routes/home'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server has been started in ${process.env.NODE_ENV} in port ${PORT} `);
})

