const express = require("express");
const noteModel = require("./model/note.model");

const app = express();
app.use(express.json());

//post api
app.post('/api/notes', async (req,res)=>{
    const {title,description} = req.body;

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Note Created Successfully",
        note
    })
})


//get api

app.get('/api/notes',async (req,res)=>{
   const notes = await noteModel.find();

   res.status(200).json({
    message: "Notes Fetched Successfully",
    notes
   })
})

//delete api
app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id;

   await noteModel.findByIdAndDelete(id)

   res.status(200).json({
    message:"Note Deleted"
   })
})

//patch

app.patch('/api/notes/:id', async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        message:"Successfully Updated"
        
    })


})

module.exports = app;