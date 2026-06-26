const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")


//regsiter api

authRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

const isUserExist = await userModel.findOne({email})
 if(isUserExist){
        return res.status(409).json({
            message:"User Already Exist"
        })
     }

     const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,email,password: hash
    })
     
     const token = jwt.sign(
        {
            id: user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)
    
    res.status(201).json({
        message:"user Registered Successfully",
        user,
        token
    })


})


authRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body


    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User Not Exist with this email"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatch){
        return res.status(404).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign(
        {
            email:user.email,
            password:user.password
        },
        process.env.JWT_SECRET
    )


    res.status(201).json({
        message:"User Logged In Successfully"
    })


})


module.exports = authRouter