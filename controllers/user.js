const express = require('express');
const { encryptPassword, comparePassword } = require('../infra/encryption');

const router = express.Router();

// --- Routes

router.get('/', (req, res) => res.send('Hello World!'));
// post
// put
// delete

// ---

module.exports = router;
