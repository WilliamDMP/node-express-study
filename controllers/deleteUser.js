const express = require('express');
const router = express.Router();
//se importa el modelo para la logica de los endpoint
const User = require('../models/users.models');


router.delete('/users/:id', async (req, res, next) =>{
    //se hace desestructuracion de las propiedades del modelo y se guardan los parametros (id) en dicha variable
    const { id } = req.params;
    //con findOne se busca el elemento segun el criterio, se compara con el id guardado y si existe se guarda 
    const user = await User.findOne( { _id: id } );
    //si existe el usuario se aplica el metodo
    if ( user ) {
        user.remove();
    }
    //responde con estado 204 indicando que es OK y sin contenido
    res.sendStatus(204);
} )

//se exporta el endpoint
module.exports = router;
