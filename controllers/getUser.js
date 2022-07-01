const express = require('express');
const router = express.Router();
const User = require('../models/users.models');

router.get('/:id', async(req, res, next) =>{
    const { id } = req.params;
    const user = await User.findOne( { _id: id });
    res.status(200).send(user);
} )

// router.get('*', (req, res, next) => {
//     res.status(404).send('pagina no encontrada');
// })
module.exports = router;