'use strict';

const rateLimit = require('express-rate-limit');
const { rateLimitWindowInterval, rateLimitAttempts } = require('./constants');

module.exports = {
	limiter: rateLimit({
		windowMs: rateLimitWindowInterval,
		max: rateLimitAttempts,
		message: JSON.stringify('Rate limit exceeded', null, 4),
	}),

	directives: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'"],
	},

	options: {
    origin: '*',
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204 || 200,
	},
};