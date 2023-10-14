const fs = require('fs');

const { validateCreatePost } = require('../validators/post-validator');
const { Post, Friend, User } = require('../models');
const { FRIEND_ACCEPTED } = require('../config/constant');
const { Op, JSON } = require('sequelize');
const cloudinary = require('../utils/cloudinary');
const createError = require('../utils/create-error');

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

exports.getAllPostIncludeFriend = async (req, res, next) => {
	try {
		// SELECT * FROM user_id = req.user.id OR user_id = friendId OR ...
		// SELECT * FROM user_id IN (req.user.id, friendId)

		const friends = await Friend.findAll({
			where: {
				status: FRIEND_ACCEPTED,
				[Op.or]: [{ requesterId: req.user.id }, { accepterId: req.user.id }],
			},
		});

		const friendIds = friends.map((el) =>
			el.requesterId === req.user.id ? el.accepterId : el.requesterId
		);

		const posts = await Post.findAll({
			where: {
				userId: [req.user.id, ...friendIds],
			},
			order: [['updatedAt', 'DESC']],
			include: {
				model: User,
				attributes: {
					exclude: ['password'],
				},
			},
		});
		res.status(200).json({ posts });
	} catch (error) {}
};

exports.deletePost = async (req, res, next) => {
	try {
		const post = await Post.findOne({where: {id: req.params.postId}})
		if(!post){
			createError('this post was not found', 400);
		}
		if(post.userId !== req.user.id){
			createError('you have no permission to delete this post', 403);
		}
		await post.destroy();
		res.status(204).json();
	} catch (error) {
		next(error);
	}
}
