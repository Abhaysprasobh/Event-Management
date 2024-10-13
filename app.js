const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Consolidate routes for the home page
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
