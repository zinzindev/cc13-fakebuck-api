module.exports = (sequelize, Datatypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: {
				type: Datatypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: Datatypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: Datatypes.STRING,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			mobile: {
				type: Datatypes.STRING,
				unique: true,
				validate: {
					is: /^[0-9]{10}$/,
				},
			},
			password: {
				type: Datatypes.STRING,
				allowNull: false,
			},
			profileImage: Datatypes.STRING,
			coverImage: Datatypes.STRING,
		},
		{
			underscored: true,
		}
	);

	User.associate = (db) => {
		User.hasMany(db.Post, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Comment, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Like, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Friend, {
			as: 'Requester',
			foreignKey: {
				name: 'requesterId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Friend, {
			as: 'Accepter',
			foreignKey: {
				name: 'accepterId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return User;
};
