const express = require("express");
const dotenv = require("dotenv");
const DB = require("./database").connectDB;
const app = express();
const cors = require('cors');
dotenv.config();
const announcementRoute = require("./routes/announcementRoutes");
const PatientRoute = require("./routes/PatientRoutes");
const SpecialistRoute = require("./routes/SpecialistRoute");
const DoctorRoute = require("./routes/DoctorRoutes")
const AppointmentRoute = require("./routes/AppointmentRoutes");


DB();
const port = process.env.PORT|| 3900;
app.use(cors());
app.use(express.json());
app.use("/api/announcement" ,announcementRoute);
app.use("/api/patients",PatientRoute);
app.use("/api/Specialist",SpecialistRoute);
app.use("/api/Doctor",DoctorRoute)
app.use("/api/Appointment",AppointmentRoute)

app.listen(port,() => {
    console.log("listening on port "+3900);
});
  
