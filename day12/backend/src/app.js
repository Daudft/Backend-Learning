const express = require("express")
const app = express()
const noteModel = require("./model/note.model")
const cors = require("cors")


app.use(cors())
app.use(express.json())

//post api
app.post("/api/notes", async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message:"Notes Created Successfully",
       
    })


})

//get api
app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes Fetched Successfully",
        notes:notes
    })
})

module.exports = app

//delete api

app.delete("/api/notes/:id", async (req,res)=>{
    const id  = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Notes Deleted Successfully"
    })
})

//patch api

app.patch("/api/notes/:id", async (req,res)=>{
    const id  = req.params.id
    const {title} = req.body


    await noteModel.findByIdAndUpdate(id,{title})

    res.status(200).json({
        message:"Notes Updated Successfully"
    })
})