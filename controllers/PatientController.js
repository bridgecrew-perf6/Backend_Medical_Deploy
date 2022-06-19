const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");
const asyncHandler = require('express-async-handler');
const Patients = require('../models/PatientModel');
const { compare  } = require('bcrypt');
const bcrypt = require("bcrypt");



const SignUp = asyncHandler(async (req, res) => {
    try {
        
        const UsernameExists = await Patients.findOne({ username: req.body.username });
        
        if (UsernameExists) {
            return res.status(409).json(
                {
                    message: "Username is already exists",
                }
            )
        }
        if(req.body.DOB==null){
            return res.status(409).json(
                {
                    message: "Enter Your Birthday",
                }
            )
        }
        var phonenb = parseInt(req.body.phonenumber)
        const saltround=10;
        var hashedpassword = bcrypt.hash(req.body.password , saltround)
        const Patient = await Patients.create({
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            phonenumber: phonenb,
            DOB: req.body.DOB+"Z",
        })
        return res.status(201).json(Patient)
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err);
    }

})

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    res.status(statusCode).json({
      data:{
        token,
        user, 
      }
    });
  };

const login = asyncHandler(async (req , res)=>{
    try{
        const {username , password} =req.body;
        if((req.body.username='')  && (req.body.password='')) {
            return res.status(401).json(
                {
                    message:"Enter username and password"
                }
            )
        }
        const UsernameExists = await Patients.findOne({ username });
        if (!UsernameExists) {
            return res.status(409).json({
                message:"Username does not exists, Create New Account"
            })
        }
        
        if(UsernameExists && !(await UsernameExists.checkpassword(password , UsernameExists.password))){
            return res.status(409).json({
                message:"Password is incorrect"
            }) 
        }
        else{
            createSendToken(UsernameExists , 200 , res);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err);
    }
})

module.exports = {
    SignUp,
    login,
}
