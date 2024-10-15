// modules
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');

// functions and models
const routes = require('./routes/routes');
const connect = require('./db/db_connection');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'idkwwwsakdsasdkhjadkbhfdasfdnb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(fileUpload({
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    limits: { fileSize: 4 * 1024 * 1024 }
}));

// View engine
app.set('view engine', 'ejs');

// Routes
app.use(routes);

// Database connection and server start
connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database:', error);
    });
