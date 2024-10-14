const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const path = require("path");
const fileUpload = require("express-fileupload")


// models
const User = require("./models/User");
const morgan = require('morgan');


// server
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));


// urls
const url = process.env.url || "mongodb://localhost:27017/event-management";
const db_name = process.env.db_name || "event-management";
const port = process.env.port || 3000;


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









app.post('/add-user', async (req, res) => {
    const { username, firstName, lastName, email, password, collegeName, year, department } = req.body;

    const file = req.files.image;
    console.log(file)
    const savePath = path.join(__dirname, 'public', "uploads", file.name);
    await file.mv(savePath, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).send(err);
        }
    });

    const user = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        collegeName,
        year,
        department,
        image
    });

    user.save()
        .then((result) => {
            res.json({ result: 'success', user: result });
        })
        .catch((err) => {
            console.error('Error creating user:', err);
            res.status(500).json({ result: 'error', message: 'Error creating user' });
        });

    
});









// Handle 404
app.use((req, res) => {
    res.status(404).render("404");
});

