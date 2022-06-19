const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary =require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config()






cloudinary.config({ 
    cloud_name: 'ddm0hzlkk',
    api_key: '399851585435227', 
    api_secret: 'xNPPXIwLVuY1Q45JzTv2n50p8LM',
});



const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder: "mernBlog",
        allowedFormats: ['jpeg', 'jpg', 'png'],
        
    },
});



module.exports = multer({storage , limits:{fileSize:1*1000*500}}).single("file")