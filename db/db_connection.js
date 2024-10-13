const mongoose = require("mongoose");
const url = process.env.url || "mongodb://localhost:27017/event-management";
const db_name = process.env.db_name || "event-management";
const port = process.env.port || 3000;

const express = require("express");

const app = express();
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB is connected successfully");
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    name: String,
    password: String
});

const UserModel = mongoose.model("users", userSchema);



app.get("/getUsers", async (req, res) => {
    const userData = await UserModel.find();
    res.json(userData);
})