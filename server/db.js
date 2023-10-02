const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

console.log('connection to db initiated');

mongoose.connect(process.env.MONGODB_URI || '');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});