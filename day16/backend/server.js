const app = require("./src/app")
const connectToDb = require("./config/db")

connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000")

})