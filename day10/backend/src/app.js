const express = require("express")
const noteModel = require("./model/note.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


//apis
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note Created Successfully",
        note
    })
})

//get api
app.get("/api/notes/",async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"note fetched successfully",
        notes:notes
    })
})

//delete api

app.delete("/api/notes/:id", async(req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully"
    })

})

//update api
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} = req.body


    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"note updated"
    })
})


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app