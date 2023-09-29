const cloudinary = require('cloudinary').v2;

cloudinary.config({
	secure: true,
	cloud_name: process.env.COLOUDINARY_NAME,
	api_key: process.env.COLOUDINARY_API_KEY,
	api_secret: process.env.COLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
