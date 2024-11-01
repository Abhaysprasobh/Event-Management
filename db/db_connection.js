const mongoose = require("mongoose");
const url = process.env.URL || "mongodb://localhost:27017/event-management";
const db_name = process.env.DB_NAME || "event-management";
const port = process.env.PORT || 3000;


const connect = () => {
    return mongoose.connect(url, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then((result) => {
            console.log("DB is connected successfully");
            return result;
        })
        .catch((error) => {
            console.log(error);
            console.log("Retrying connection in 30 seconds...");
            return new Promise((resolve) => {
                setTimeout(() => resolve(connect()), 30000);
            });
        });
}

module.exports = connect;





