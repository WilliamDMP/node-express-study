const express = require('express');
const router = express.Router();
//se importa el modelo para la logica de los endpoint
const User = require('../models/users.models');

router.put('/users/:id', async (req, res, next) =>{
    //se hace desestructuracion de las propiedades del modelo y se guardan los parametros (id) en dicha variable
    const { id } = req.params;
    //con findOne se busca el elemento segun el criterio, se compara con el id guardado y si existe se guarda 
    const user = await User.findOne( { _id: id } );
    //Este metodo busca el objetivo a modificar en este caso (user) y lo cambia por lo que recibe del body
    Object.assign(user, req.body);
    //esper y gurda dicho elemento
    await user.save();
    //responde con estado de OK y sin contenio
    res.sendStatus(204);
} )

module.exports = router;