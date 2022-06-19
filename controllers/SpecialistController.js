const Specialists = require('../models/SpecialistModel');
const asyncHandler = require('express-async-handler');
const res = require('express/lib/response');

const createSpecialist = asyncHandler(async(req,res)=>{
    const Specialist = await Specialists.create({
        Name:req.body.Name,
        imageUrl:req.file.path,
        imageName:req.file.filename,
    })
    return res.status(201).json({Specialist})
})
const getAllSpecialists = asyncHandler(async(req,res)=>{
    
    const Specialist = await Specialists.find({})
    return res.status(200).json(Specialist)
})
const UpdateSpecialists = asyncHandler(async(req,res)=>{
    try{
        const query = {Name:req.body.Name}
        const id = req.params.id;
        const Specialist = await Specialists.findByIdAndUpdate(id,{
            Name:req.body.Name
        })
        return res.status(200).json(Specialist)
    }
    catch (error){
        return res.status(409).json({message:error})
    }
})

module.exports={
    createSpecialist,
    getAllSpecialists,
    UpdateSpecialists,
}