const chalk = require('chalk');

module.exports = (err, req, res, next) => {
	console.log(chalk.magentaBright.bold.italic(err));

	if (err.name === 'ValidationError') {
		err.statusCode = 400;
	} else if (err.name === 'TokenExpiredError') {
		err.statusCode = 401;
	} else if (err.name === 'JsonWebTokenError') {
		err.statusCode = 401;
	}

	res.status(err.statusCode || 500).json({ message: err.message });
};
