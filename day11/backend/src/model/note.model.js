const mongoose = require("mongoose")
const { mountpath } = require("../app")

const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("day11",noteSchema)

module.exports = noteModel