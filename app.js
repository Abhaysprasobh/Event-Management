const express = require('express');
const app = express();
const path = require("path")
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log('Server is running http://localhost:'+port);
});

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/index", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/home", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/about-us", (req, res) => {
    res.sendFile("./views/about.html", { root: __dirname });
});
app.get("/gallery", (req, res) => {
    res.sendFile("./views/gallery.html", { root: __dirname });
});
app.get("/register", (req, res) => {
    res.sendFile("./views/register.html", { root: __dirname });
});
app.get("/login", (req, res) => {
    res.sendFile("./views/login.html", { root: __dirname });
});
app.get("/agenda", (req, res) => {
    res.sendFile("./views/agenda.html", { root: __dirname });
});

