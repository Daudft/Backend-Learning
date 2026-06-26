const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

//post api

authRouter.post("/register",(req,res)=>{
    const {name,email,password} = req.body

    const isEmailExist = userModel.findOne({email})


    if(isEmailExist){
        return res.status(409).json({
            message:"User Already Exists"
        })
    }

    const user = userModel.create({
        name,email,password
    })


    const token = jwt.sign({
        id:user._id
        
    },
    process.env.JWT_SECRET

)

res.cookie("Jwt_token",token)


    res.status(201).json({
        message:"User Registered Successfully",
        user,
        token
    })
})



authRouter.post("/protected",(req,res)=>{
    console.log(req.cookie)
})

module.exports = authRouter