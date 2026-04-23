const app = require("./src/app");
const connectDB = require("./src/config/db");
const noteModel = require("./src/models/note.model");

connectDB();



//post api
app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body;

    const note = await noteModel.create({
        title,
        description,
    });

    res.status(201).json({
        message:"Note created successfully",
        note,
    });
})


//get api
app.get("/api/notes", async(req,res)=>{
    const notes =await noteModel.find();

    res.status(200).json({
        message:"Notes Successfully Fetched",
        notes:notes
    })
})


//delete api
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note deleted successfully",
    })
})


//update api
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        message:"Updated"
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});