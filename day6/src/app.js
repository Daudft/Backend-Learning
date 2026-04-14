const express = require("express");
const model = require("./models/notes.model");

const app = express();
app.use(express.json());


app.post("/notes",async (req,res)=>{
    const {title,description} = req.body;

   const note = await model.create({
    title,description
  })

  res.status(201).json({
    message: "note created successfully",
    note
  })
})


app.get("/notes", async(req,res)=>{
   const notes = await model.find()

   res.status(201).json({
    message: "Notes fetched Succsessfully",
    notes
   })
})

module.exports = app;