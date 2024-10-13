const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const app = express();
const path = require("path");
const port = 3000 || process.env.port;

require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));



const url = "mongodb://localhost:27017" || process.env.url;
const db_name = "event-management" || process.env.db_name;

const client = new MongoClient(url);

async function getData() {
    try {
        await client.connect();
        const db = client.db(db_name);
        const collection = db.collection("events");
        const response = await collection.find({}).toArray();
        console.log(response);
    } catch (error) {
        console.error("Error connecting to the database or fetching data:", error);
    } finally {
        await client.close();
    }
}

// mongoose.connect

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});





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

// Handle 404
app.use((req, res) => {
    res.status(404).render("404");
});

