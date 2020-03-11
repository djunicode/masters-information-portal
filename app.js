'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes/index');
const { directives, limiter, options } = require('./config/middlewares');

app.set('json spaces', 2);

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// morgan
app.use(morgan('dev'));

// express-rate-limit
app.use(limiter);

// helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ directives }));
app.use(helmet.noCache());

// cors
app.use(cors(options));

// api routes
app.use('/api', router);

// 404 resource not found
app.use('*', (req, res, next) => {
	return res.status(404).send({
		error: {
			status: res.statusCode,
			message: 'Resource not found',
		},
	});
});

// custom error handler
app.use((err, req, res, next) => {
	return res.status(500 || err.status).send({
		error: {
			status: 500 || err.status,
			message: err.message,
		},
	});
});

module.exports = app;
