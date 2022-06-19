const Appointments = require('../models/AppointmentModel');
const Doctors = require('../models/DoctorModel');
const asyncHandler = require('express-async-handler');
const moment = require("moment");

const AddAppointment = asyncHandler(async(req,res)=>{

  try{
    const Doctor = await Doctors.findById(req.body.doctor_id)
    console.log(Doctor.days)
    var date = req.body.date
    console.log(date)
    var Day = moment(date).format('dddd')
    var AttendedDay = Doctor.days
    const Exists = await Appointments.findOne({doctor_id:req.body.doctor_id,time:req.body.time,date:req.body.date})
  
    if (Day != AttendedDay) {
      return res.status(409).json({
        message: "Choose with " + AttendedDay + " date",
      })
    }
   else if (Exists){
    return res.status(409).json({
      message: "Already Booked, Change another time",
    })
   }
    
    else{
      const Booked = await Appointments.create({
        patient_id:req.body.patient_id,
        doctor_id:req.body.doctor_id,
        date:req.body.date,
        time:req.body.time,
      })
      return res.status(200).json(Booked)
    }
   
  
  
}
  catch (error){
    return res.status(409).json({
      message:error.message
    })
  }
    
    
   
  } 

)

const getAllAppointments = asyncHandler(async(req,res)=>{
  const start = moment().startOf('day').toDate()
   const end = moment().startOf('day').add(1,'day').toDate()
  const Appointment = await Appointments.find({}).where({patient_id:req.body.patient_id}).populate({path:'doctor_id' , select:['Fullname']}).sort({date:1})
   return res.status(200).json(Appointment)
})
const TodayAppointments = asyncHandler(async(req,res)=>{
  const start = moment().startOf('day').toDate()
   const end = moment().startOf('day').add(1,'day').toDate()
  const Appointment = await Appointments.find({
    date: {
      $gte:start,
      $lte:end
    }
  }).where({patient_id:req.body.patient_id}).populate({path:'doctor_id' , select:['Fullname']}).sort({date:1})
   return res.status(200).json(Appointment)
})
const DeleteAppointment  = asyncHandler(async(req,res)=>{
    
    const Delete = await Appointments.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      message:"deleted"
    })
})
const getAllAppointmentsAdmin = asyncHandler(async(req,res)=>{
  const Appointment = await Appointments.find({}).populate({path:'doctor_id' , select:['Fullname']}).populate({path:'patient_id' , select:['fullname']})
   return res.status(200).json(Appointment)
})




module.exports={
    AddAppointment,
    getAllAppointments,
    DeleteAppointment,
    getAllAppointmentsAdmin,
    TodayAppointments,

}
