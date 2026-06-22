const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const authRouter = express.Router()

//resgister api

authRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

    const isEmailExist = await userModel.findOne({email})

    if(isEmailExist){
        return res.status(409).json({
            message:"Email Already Exists"
        })
    }


    const user = await  userModel.create({
        name,email,password
    })


    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )
    

    res.cookie("jwt_token",token)


    res.status(201).json({
        message:"User Registered succesfully",
        user,
        token
    })



})



module.exports = authRouter

