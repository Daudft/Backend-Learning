const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect("mongodb+srv://daud:CFEol4TOmmKUNIFt@cluster0.lfxgwyx.mongodb.net/day-11")
    .then(()=>{
        console.log("Database Running")
    })
}

module.exports = connectDB