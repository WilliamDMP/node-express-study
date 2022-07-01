const express = require('express');
const router = express.Router();
const User = require('../models/users.models');

router.post('/', async (req, res, next) =>{
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user._id);
} )

module.exports = router;