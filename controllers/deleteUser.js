const express = require('express');
const router = express.Router();
const User = require('../models/users.models');


router.delete('/:id', async (req, res, next) =>{
    const { id } = req.params;
    const user = await User.findOne( { _id: id } );
    if ( user ) {
        user.remove();
    }
    res.sendStatus(204);
} )

module.exports = router;
