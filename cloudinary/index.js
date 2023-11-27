// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'Yelpcamp',
//         allowedFormats: [ 'jpeg', 'png', 'jpg']
//     },
// });

// const upload = multer({ storage });

// module.exports = {
//     cloudinary,
//     storage
// }

const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer'); // Make sure to include this line

// Other configurations and middleware...

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Yelpcamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    },
});

const upload = multer({ storage });

// Other code...

module.exports = {
    cloudinary,
    storage,
    upload
};

