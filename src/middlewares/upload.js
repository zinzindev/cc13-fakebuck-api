const chalk = require('chalk');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		// console.log(req);
		// console.log(chalk.cyan('============================================'));
		// console.log(file);
		// console.log(chalk.magenta('============================================'));

		// cb(null, new Date().getTime() + '' + Math.round(Math.random() * 1e9) + '.' + file.mimetype.slice(6));
		// cb(null, `${new Date().getTime()}${Math.round(Math.random() * 1e9)}.${file.mimetype.slice(6)}`);
		cb(
			null,
			`${new Date().getTime()}${Math.round(Math.random() * 1e9)}.${
				file.mimetype.split('/')[1]
			}`
		);
	},
});

// const fileFilter = (req, file, cb) => {
//   if(file.mimetype !== 'image/jpeg')  {
//     cb(new Error('hey not image file'))
//   }
// }

// module.exports =  multer({storage: storage, fileFilter});
module.exports = multer({ storage });
