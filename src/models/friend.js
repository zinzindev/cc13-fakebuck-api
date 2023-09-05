const { FRIEND_ACCEPTED, FRIEND_PEDING } = require('../config/constant');

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

	Friend.associate = (db) => {
		Friend.belongsTo(db.User, {
			as: 'Requester',
			foreignKey: {
				name: 'requesterId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	Friend.associate = (db) => {
		Friend.belongsTo(db.User, {
			as: 'Accepter',
			foreignKey: {
				name: 'accepterId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Friend;
};
