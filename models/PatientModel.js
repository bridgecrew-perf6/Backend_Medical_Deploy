const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const PatientSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:[true, " full Name is required"],
            trim:true,
            minlength:4,
        },
        username:{
            type:String,
            unique:true,
            required:[true,"Username is required"],
            minlength:4,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:6,
        },
        phonenumber: {
            type:Number,
            required:[true,"Phone number is required"],
        },
        DOB:{
         type:Date,
        }
        
    }
);


PatientSchema.pre("save", async function (next){
    try{
       if(!this.isModified()){
           return next();
       }
       this.password = await bcrypt.hash(this.password , 12);
    }catch(err){
        console.log(err);
    }
});
PatientSchema.methods.checkpassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Patients",PatientSchema)