const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema
const DoctorSchema = new mongoose.Schema(
    {
     Fullname:{
        type:String,
        required:[true, " full Name is required"],
     },
     Specialist:{
         type:String,
         required:[true],
     },
     days:{
        type:String,
        required:[true]
     },
     startTime:{
        type:String,
        required:[true],
     },
     endTime:{
        type:String,
        required:[true],
     },
     TimeInterval:{
        type:Number,
        required:[true],
        maxlength:2,
     },
     YearExperience:{
         type:Number,
         maxlength:2,
     },
      imageUrl: {
         type: String
      },
      imageName: {
         type: String,
      }
    }
)
module.exports=mongoose.model("Doctors", DoctorSchema)