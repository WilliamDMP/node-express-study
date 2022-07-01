const express = require('express');
const router = express.Router();
const User = require('../models/users.models');

router.put('/:id', async (req, res, next) =>{
    const { id } = req.params;
    const user = await User.findOne( { _id: id } );
    Object.assign(user, req.body);
    await user.save();
    res.sendStatus(204);
} )

module.exports = router;