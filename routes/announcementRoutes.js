const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/AnnouncementController');
const multer = require('../config/Cloudinary')

router.post("/newAnnouncement",multer,AnnouncementController.createAnnouncement);
router.get("/getAnnouncement/:id",AnnouncementController.getAnnouncement)
router.get("/getAllAnnouncements/",AnnouncementController.getAllAnnouncement)
router.post("/Update/:Title",AnnouncementController.UpdateAnnouncement)
router.post("/delete/:id",AnnouncementController.DeleteAnnouncement)

module.exports = router;
