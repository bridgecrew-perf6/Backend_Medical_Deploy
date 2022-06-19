const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: [true, "Please enter your fullname"],
            trim: true,
            minLength: 4,
            
        },
        Details: {
            type: String,
            required: [true, "Please enter your Password"],
            unique: true,
            trim: true,
            minLength: 5,
            maxLength: 9999,
        },
        imageUrl:{
            type: String,
        },
        Imagename:{
            type: String,
        }
        
    },
);
module.exports = mongoose.model("Announcement",announcementSchema)