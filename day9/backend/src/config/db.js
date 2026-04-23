const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb+srv://daud:CFEol4TOmmKUNIFt@cluster0.lfxgwyx.mongodb.net/day-9")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connectDB;
