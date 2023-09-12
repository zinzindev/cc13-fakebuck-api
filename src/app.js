// *** for config models ***
// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

// *** for create server
require('dotenv').config();
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/auth-route')
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(morgan('dev'));
app.use(
	rateLimit({
		windowMs: 1000 * 60 * 15,
		max: 1000,
		message: { message: 'you are hacker' },
	})
);
app.use(helmet());
app.use(cors());
app.use(express.json()); // middleware pass request body

app.use('/auth', authRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
	console.log(chalk.blueBright.bold.italic(`sever running on port: ${port}`))
);
