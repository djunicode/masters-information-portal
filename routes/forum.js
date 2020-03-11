'use strict';

const router = require('express').Router();
const { findAll, create, findById, update, destroy } = require('../controllers/forum');

//FIND ALL
router.get('/', findAll);

//FIND BY ID
router.get('/:id', findById);

//CREATE
router.post('/', create);


//UPDATE
router.put('/:id', update);

//DESTROY
router.delete('/:id', destroy);

module.exports = router;