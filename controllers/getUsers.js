const express = require('express');
const User = require('../models/users.models');
const router = express.Router();


router.get('/', async (req, res, next) =>{
    const user = await User.find();
    res.status(200).send(user);
} )

// router.get('*', (req, res, next) => {
//     res.status(404).send('pagina no encontrada');
// })
module.exports = router;