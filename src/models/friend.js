const {FRIEND_ACCEPTED, FRIEND_PEDING} = require('../config/constant')

module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define(
		'Friend',
		{
			status: {
				type: DataTypes.ENUM(FRIEND_PEDING, FRIEND_ACCEPTED),
				allowNull: false,
				defaultValue: FRIEND_PEDING,
			},
		},
		{ underscored: true }
	);
	return Friend;
};
