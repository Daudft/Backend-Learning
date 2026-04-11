const app = require("./src/app");


const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect("mongodb+srv://alikhaft45_db_user:fBCr8OLrWfLHOQYI@cluster0.out50q9.mongodb.net/day-5")
    .then(()=>{
        console.log("Database Connected");
    })
}
connectToDb();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})