const express = require('express');
const router = express.Router();

router.patch('/users/:id', (req, res, next) =>{
    res.sendStatus(204)
} )

module.exports = router;