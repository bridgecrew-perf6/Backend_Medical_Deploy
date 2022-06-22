const Announcements = require('../models/announcementModel');
const asyncHandler = require('express-async-handler');


///Create
const createAnnouncement = asyncHandler(async(req,res)=>{
    const Announcement = await Announcements.create({
        Title:req.body.Title,
        Details:req.body.Details,
        imageUrl : req.file.path,
        Imagename:req.file.filename,
    })
    return res.status(201).json(Announcement)
})

//Get
const getAnnouncement = asyncHandler(async(req,res)=>{
    const projection={"_id":0,"Title":0}   ///Will not return Title
    const Announcement = await Announcements.findById(req.params.id,projection)
    res.status(200).json(Announcement);
})
//GetAll
const getAllAnnouncement = asyncHandler(async(req,res)=>{
    const Announcement =await Announcements.find({}).sort([['_id', -1]])
    res.status(200).json(Announcement)
})
const UpdateAnnouncement = asyncHandler(async(req,res)=>{
    try{
        const Announcement =await Announcements.findOneAndUpdate(
            {Title: req.params.Title},
            {$set: req.body},
            {new: true,runValidators:true}
        );
        if(!Announcement){
            return res.status(404).json({
                message:"Title Does not Exists"
            });
        }
        return res.status(200).json({
            message:"Updated",
            data:Announcement,
        });
    } catch (err){
      res.status(500).send({
          message:err.message
      });
    }
})

const DeleteAnnouncement = asyncHandler(async(req,res)=>{
    try{
        const Ann = await Announcements.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        Ann
    })
    }
    catch (error){
        return res.status(409).json({
            message:error.message
        })
    }
    
})

    


module.exports={
    createAnnouncement,
    getAnnouncement,
    getAllAnnouncement,
    UpdateAnnouncement,
    DeleteAnnouncement,
    
}
