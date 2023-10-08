const /* `fs` stands for "file system" and it is a built-in module in Node.js that provides file
system-related functionality. In this code snippet, `fs` is being used to perform file system
operations, specifically to delete a file using the `unlink` method. */
fs = require('fs');
const { validateCreatePost } = require('../validators/post-validator');
const cloudinary = require('../utils/cloudinary');
const { Post } = require('../models');

exports.createPost = async (req, res, next) => {
	try {
		const value = validateCreatePost({
			title: req.body.title,
			image: req.file?.path,
		});

		if (value.image) {
			value.image = await cloudinary.upload(value.image);
		}

    value.userId = req.user.id;

		const post = await Post.create(value);

		res.status(201).json({ post });
	} catch (error) {
		next(error);
	} finally {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
	}
};
