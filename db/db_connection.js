const { MongoClient } = require("mongodb");
const url = process.env.url || "mongodb://localhost:27017";
const db_name = process.env.db_name || "event-management";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

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

getData();