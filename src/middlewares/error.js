const chalk = require('chalk');

module.exports = (err, req, res, next) => {
	console.log(chalk.magentaBright.bold.italic(err));
    res.status(500).json({message: err.message});
};
