const cloudinary = require('../config/cloudinary');

exports.upload = async (filePath, publicId) => {
	const option = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	};

	if (publicId) {
		option.public_id = publicId;
	}

	// const {secure_url, public_id} = await cloudinary.uploader.upload(filePath, {
	const result = await cloudinary.uploader.upload(filePath, option);
	// console.log(result);
	// return {secure_url, public_id};
	return result.secure_url;
};

exports.getPublicId = (url) => {
	const splitSlash = url.split('/');
	return splitSlash[splitSlash.length - 1].split('.')[0];
};
