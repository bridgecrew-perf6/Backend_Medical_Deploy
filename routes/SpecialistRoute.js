const express = require("express");
const router = express.Router();
const SpecialistController = require('../controllers/SpecialistController')
const multer = require('../config/Cloudinary')

router.post('/newSpecialist',multer,SpecialistController.createSpecialist);
router.get("/getAllSpecialists",SpecialistController.getAllSpecialists);
router.post("/UpdateSpecialist/:id",SpecialistController.UpdateSpecialists);

module.exports = router;