const express = require('express');
const User = require('../models/users.models');
//se importa el modelo para la logica de los endpoint
const router = express.Router();


router.get('/users', async (req, res, next) =>{
    //se busca en el modelo y guarda un arreglo de objetos
    const user = await User.find();
    //envia estado OK y muestra la totalidad de datos
    res.status(200).send(user);
} )

// router.get('*', (req, res, next) => {
//     res.status(404).send('pagina no encontrada');
// })
module.exports = router;