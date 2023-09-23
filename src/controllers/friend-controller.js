const { Op } = require('sequelize');

const { Friend } = require('../models');
const { FRIEND_PENDING, FRIEND_ACCEPTED } = require('../config/constant');
const createError = require('../utils/create-error');

exports.requestFriend = async (req, res, next) => {
	try {
		// console.log(`req.user.id = ${req.user.id}, type = ${typeof req.user.id}`);
		// console.log(`req.params.userId = ${req.params.userId}, type = ${typeof req.params.userId}`);
		if (req.user.id === +req.params.accepterId) {
			createError('cannot request yourself', 400);
		}
		// SELECT * FROM friends WHERE
		// requester_id = userId AND accepterId = req.user.id
		// OR
		// requester_id = req.user.id AND accepterId = userId
		const existFriend = await Friend.findOne({
			where: {
				[Op.or]: [
					{ requesterId: req.params.accepterId, accepterId: req.user.id },
					{ requesterId: req.user.id, accepterId: req.params.accepterId },
				],
			},
		});
		// console.log(existFriend);
		if (existFriend) {
			createError('already friend or pending', 400);
		}

		await Friend.create({
			requesterId: req.user.id,
			accepterId: req.params.accepterId,
			status: FRIEND_PENDING,
		});
		res.status(200).json({ message: 'success friend request' });
	} catch (error) {
		next(error);
	}
};

exports.acceptFriend = async (req, res, next) => {
	try {
		// UPDATE users SET status="ACCEPTED"
		// WHERE requester_id = req.params.requesterId
		// AND accepter_id = req.user.id
		const [totalRowUpdated] = await Friend.update(
			{ status: FRIEND_ACCEPTED },
			{ where: { requesterId: req.params.requesterId, accepterId: req.user.id } }
		);
		// console.log(totalRowUpdated);
		if (totalRowUpdated === 0) {
			createError('this user not sent request to you', 400);
		}

		res.status(200).json({ message: 'success add friend' });
	} catch (error) {
		next(error);
	}
};

exports.deleteFriend = async (req, res, next) => {
	try {
		// DELETE FROM friends
		// WHERE requester_id = req.params.friendId AND accepter_id = req.user.id
		// OR requester_id = req.user.id AND accepter_id = req.params.friendId
		const totalDelete = await Friend.destroy({
			where: {
				[Op.or]: [
					{ requesterId: req.params.friendId, accepterId: req.user.id },
					{ requesterId: req.user.id, accepterId: req.params.friendId },
				],
			},
		});
		console.log(totalDelete);
		if (totalDelete === 0) {
			createError('you do not have relationship with friend', 400);
		}

		res.status(204).json();
	} catch (error) {
		next(error);
	}
};
