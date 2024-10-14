const express = require('express');
const fileUpload = require("express-fileupload")
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const fs = require('fs');
const path = require("path");




// models
const User = require("./models/User");
const morgan = require('morgan');


// server
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
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



// urls
const url = process.env.url || "mongodb://localhost:27017/event-management";
const db_name = process.env.db_name || "event-management";
const port = process.env.port || 3000;

// connect to mongo
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB is connected successfully");
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error));

const renderIndex = (req, res) => {
    res.render("index");
};



app.get("/", renderIndex);
app.get("/index", renderIndex);
app.get("/home", renderIndex);

// About page
app.get("/about", (req, res) => {
    res.render("about");
});

// Redirect to about
app.get("/about-us", (req, res) => {
    res.redirect('/about');
});

// Gallery page
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

// Registration and Login pages
app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Agenda page
app.get("/agenda", (req, res) => {
    res.render("agenda");
});









app.post('/register', async (req, res) => {
    try {
        const {  firstName, lastName, email, password, collegeName, year, department } = req.body;

        const file = req.files.image;
        console.log(file);
        const filename = new Date().getTime().toString() + path.extname(file.name);
        const savePath = path.join(__dirname, 'public', "uploads", file.name);
        if (file.truncated) {
            throw new Error("File Size too big");
        }
        await file.mv(savePath);

        const user = new User({
            firstName,
            lastName,
            email,
            password,
            collegeName,
            year,
            department,
            image: filename
        });

        const result = await user.save();
        res.status(201).json({ result: 'success', message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ result: 'error', message: 'Error creating user' });
    }
});


//  registered users only for testing 
app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).json({ result: 'error', message: 'Error retrieving users' });
        });
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid email or password');
            return res.status(400).json({ result: 'error', message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid email or password');
            return res.status(400).json({ result: 'error', message: 'Invalid email or password' });
        }

        req.session.user = user;
        console.log('Login successful');
        res.json({ result: 'success', message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ result: 'error', message: 'Error logging in' });
    }
});




// Handle 404
app.use((req, res) => {
    res.status(404).render("404");
});

