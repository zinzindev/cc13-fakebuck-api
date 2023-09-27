const cloudinary = require('../config/cloudinary');

exports.upload = async (filePath) => {
	const result = await cloudinary.uploader.upload(filePath, {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	});
	console.log(result);
};
