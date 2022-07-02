const express = require('express');
const router = express.Router();
//se importa el modelo para la logica de los endpoint
const User = require('../models/users.models');

router.post('/users', async (req, res, next) =>{
    //crea una nueva instancia del modelo con lo que recibe del body
    const user = new User(req.body);
    //espera y almacena en la base de datos dicho objeto
    await user.save();
    //envia estado de creado y muestra el id del elemento
    res.status(201).send(user._id);
} )

module.exports = router;