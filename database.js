const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
DB=""
exports.connectDB = async () =>{
    try{
        const conn= mongoose.connect(process.env.DB,{
            useNewUrlParser:true,
        }).connection
        console.log("DB connected");
    }catch (err){
        console.log(err);
        process.exit(1);
    }
};