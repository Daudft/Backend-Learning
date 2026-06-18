require("dotenv").config()
const express = require("express")
const noteModel = require("../model/note.model")
const app = express()
const cors = require("cors")
const path = require("path")

app.use(express.static("public"))
app.use(cors())


app.use(express.json())


//post api

app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(200).json({
        message:"note Created Successfully"
    })
})


//get api
app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find()

    res.status(201).json({
        notes:notes
    })
})


//delete
app.delete("/api/notes/:id", async(req,res)=>{

    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(201).json({
        message:"Note Deleted"
    })
})

//patch

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const description = req.body.description

   const updated = await noteModel.findByIdAndUpdate(id,{description})

    res.status(201).json({
        message:"note updated successfully"
    })
})


//wildcard

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","./public/index.html"))
})


module.exports = app