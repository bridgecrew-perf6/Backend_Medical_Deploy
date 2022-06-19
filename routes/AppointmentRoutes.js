const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
router.post('/addAppointment',AppointmentController.AddAppointment);
router.post('/getAllAppointment',AppointmentController.getAllAppointments);
router.post('/TodayAppointments',AppointmentController.TodayAppointments);
router.post('/DeleteAppointment/:id',AppointmentController.DeleteAppointment);
router.get('/getAllAppointmentForAdmin',AppointmentController.getAllAppointmentsAdmin);
module.exports = router;