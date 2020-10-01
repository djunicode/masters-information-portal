const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const cache = (req, res, next) => {
    client.get(req.user.name, (err, data) => {
        if (err) {
            throw err;
        }
        if (data !== null) {
            return res.send(JSON.parse(data));
        }
        else {
            next();
        }
    })
}

module.exports = { cache }