const { default: mongoose } = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId, ref:'Doctors'
    },
    patient_id:{
       type:mongoose.Schema.Types.ObjectId, ref:'Patients'
    },
    date:{
      type:Date,
      required:[true]
    },
    time:{
        type:String,
        required:[true]
    }
})

module.exports= mongoose.model("Appointments",AppointmentSchema)