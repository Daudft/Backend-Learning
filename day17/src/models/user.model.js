const mongoose = require("mongoose")

const userScheme = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"User already exist"]
    },
    password:String
})


const userModel = mongoose.model("users",userScheme)

module.exports = userModel