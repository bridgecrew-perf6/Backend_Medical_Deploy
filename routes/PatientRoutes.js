const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');


router.post("/SignUp",PatientController.SignUp);
router.post("/login", PatientController.login);



module.exports = router;