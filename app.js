const express = require('express');
const fileUpload = require("express-fileupload")
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const fs = require('fs');
const path = require("path");

const routes = require("./routes/routes");
const connect = require("./db/db_connection");


// models
const User = require("./models/User");
const morgan = require('morgan');


// server
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// session 
app.use(session({
    secret: 'idkwwwsakdsasdkhjadkbhfdasfdnb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // http: false
}));

app.use(fileUpload({
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    limits: { fileSize: 4 * 1024 * 1024 } 
}));

app.use(routes);



// urls
const url = process.env.url || "mongodb://localhost:27017/event-management";
const db_name = process.env.db_name || "event-management";
const port = process.env.port || 3000;

// connect to mongo
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
});















