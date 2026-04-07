const express = require("express");

const app = express(); //server instance ban gaya 

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.get('/home',(req,res)=>{
    res.send("This is Home Page");
})

app.get('/about',(req,res)=>{
    res.send("This is about page")
})

app.get('/contact',(req,res)=>{
    res.send("This is contact page");
})

app.listen(3000);//server ko 3000 port pe listen karne ke liye kaha