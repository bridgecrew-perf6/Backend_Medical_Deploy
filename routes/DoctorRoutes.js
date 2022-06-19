const express = require('express');
const router = express.Router();
const DoctorController =  require('../controllers/DoctorController');
const multer = require("../config/Cloudinary")
router.post("/addDoctor",multer,DoctorController.AddDoctor);
router.get("/timeSlot/:id",DoctorController.TimeSlots);
router.post('/deleteDoctor/:id',DoctorController.DeleteDoctor);
router.post("/getDoctors",DoctorController.GetDoctor)
router.get('/getAllDoctors',DoctorController.GetAllDoctors);


module.exports = router;