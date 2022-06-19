const Doctors = require('../models/DoctorModel');
const Appointments = require('../models/AppointmentModel')
const asyncHandler = require('express-async-handler');
const moment = require("moment")
const AddDoctor = asyncHandler(async(req,res)=>{
    const Doctor = await Doctors.create({
        Fullname:req.body.Fullname,
        Specialist:req.body.specialist,
        days:req.body.days,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        TimeInterval:req.body.timeInterval,
        YearExperience:req.body.yearExperience,
        imageUrl:req.file.path,
        imageName:req.file.filename,
    })
     return res.status(201).json({Doctor})
})
const TimeSlots = asyncHandler(async(req,res)=>{
   const Doctor = await Doctors.findById(req.params.id)
   const ST = Doctor.startTime
   const CT = Doctor.endTime
   const sInterval = Doctor.TimeInterval
   let x = {
    slotInterval: sInterval,
    openTime: ST,
    closeTime: CT,
    }
    let startTime = moment(x.openTime, "HH:mm")
              
              
              let endTime = moment(x.closeTime, "HH:mm");
              
            
              let allTimes = [];
              
              //Loop over the times - only pushes time with slotInterval minutes interval
              while (startTime < endTime) {
                
                allTimes.push(startTime.format("HH:mm")); 
                
                startTime.add(x.slotInterval, 'minutes');
};
   res.status(200).json(allTimes);
})


const DeleteDoctor = asyncHandler(async(req,res)=>{
    {   try{
        const query = {doctor_id:req.params.id}
        const CheckIfAppointmentsAvailable = await Appointments.findOne(query)
        
        if(CheckIfAppointmentsAvailable){
            return res.status(409).json({
                message:"Doctor Already Have Appointments"
            })
        }
        else{
            const Doctor = await Doctors.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message:"Succesful Deleted"
            })
        }
        
    } catch (error){
        return res.status(409).json({
          message:error.message
        })
        
    }
} 

})
const GetDoctor = asyncHandler(async(req,res)=>{
    var query = {Specialist:req.body.Specialist}
    const Doctor = await Doctors.find({}).where(query)
    return res.status(200).json(Doctor)
})
const GetAllDoctors =asyncHandler(async(req,res)=>{
    const Doctor = await Doctors.find({})
    return res.status(201).json(Doctor)
})



module.exports={
    AddDoctor,
    TimeSlots,
    DeleteDoctor,
    GetDoctor,
    GetAllDoctors,
}