const app = require("./src/app")
const express = require("express")
const connectDB = require("./config/db")
const noteModel = require("./model/note.model")
app.use(express.json())




//post api

app.post("/api/notes", async(req,res)=>{

    const {title,description} = req.body

    const notes =  await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message:"Note Created Successfully"
    })

})

//get api
app.get("/api/notes",async(req,res)=>{
    const notez = await noteModel.find()

    res.status(200).json({
        notez:notez
        
    })
})


//delete api

app.delete("/api/notes/:id", async(req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id);

    res.status(201).json({
        message:"Note Deleted"
    })
})

//update 

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const description = req.body.description

    const updateNote = await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Note Updated Successfully"
    })
})



connectDB()
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})