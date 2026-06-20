const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()


//regsiter api

authRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

const isUserExist = await userModel.findOne({email})
 if(isUserExist){
        return res.status(409).json({
            message:"User Already Exist"
        })
     }


    const user = await userModel.create({
        name,email,password
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



module.exports = authRouter