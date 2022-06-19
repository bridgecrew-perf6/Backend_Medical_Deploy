const { default: mongoose } = require("mongoose");

const SpecialistSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true, "Please enter name"],

    },
    imageUrl:{
        type:String
    },
    imageName:{
        type:String,
    }
});
module.exports = mongoose.model("Specialists" , SpecialistSchema);