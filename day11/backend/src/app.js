const express = require('express');
const noteModel = require("./model/note.model")

const app = express();



//api post
app.post("/api/notes",(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,
        description,
    })

    res.status(201).json({
        message:
    })


})

module.exports = app;