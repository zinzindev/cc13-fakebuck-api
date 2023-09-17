const { validateRegister, valdateLogin } = require('../validators/auth-validator');
const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const createError = require('../utils/create-error');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
	try {
		const value = validateRegister(req.body);

		// database check email or moblie init
		// SELECT * FROM users WHERE email = value.email OR mobile = value.mobile
		const user = await User.findOne({
			where: {
				[Op.or]: [{ email: value.email || '' }, { mobile: value.mobile || '' }],
			},
		});

		// console.log(user);
		// database existing
		if (user) {
			createError('email or mobile is already in use', 400);
		}

		value.password = await bcrypt.hash(value.password, 12);

		// User.create({
		// 	firstName: value.firstName,
		//   lastName: value.lastName,
		//   mobile: value.emailOrPassword,
		//   password: bcrypt.hash(value.password, 12)
		// });
		await User.create(value);

		res.status(201).json({
			message: 'register success. please log in to continue.',
		});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const value = valdateLogin(req.body);

		// SELECT * FROM users WHERE email = value.emailOrMobile OR mobile = value.emailOrMobile
		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ email: value.emailOrMobile },
					{ mobile: value.emailOrMobile },
					// { password: value.password },
				],
			},
		});
		if (!user) {
			createError('invalid email or mobile or password', 400);
		}

		const isCorrectPassword = await bcrypt.compare(value.password, user.password);
		if (!isCorrectPassword) {
			createError('invalid email or mobile or password', 400);
		}

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		res.status(200).json({ accessToken });
	} catch (error) {
		next(error);
	}
};

exports.getMe = (req, res, next) => {
	res.status(200).json({user: req.user});
}