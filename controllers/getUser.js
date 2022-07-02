const express = require('express');
const router = express.Router();
//se importa el modelo para la logica de los endpoint
const User = require('../models/users.models');

router.get('/users/:id', async(req, res, next) =>{
    //se hace desestructuracion de las propiedades del modelo y se guardan los parametros (id) en dicha variable
    const { id } = req.params;
    //con findOne se busca el elemento segun el criterio, se compara con el id guardado y si existe se guarda 
    const user = await User.findOne( { _id: id });
    //responde con estado OK y muestra el dato segun el id
    res.status(200).send(user);
} )

// router.get('*', (req, res, next) => {
//     res.status(404).send('pagina no encontrada');
// })

//se exporta el endpoint
module.exports = router;