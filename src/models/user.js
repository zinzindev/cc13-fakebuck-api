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

	return User;
};
