//se llama mongoose que es necesario para crear el modelo
const mongoose = require('mongoose');

//se asigna el modelo a la constante user que se va a exportar
const User = mongoose.model('User', {
    //es posible agregarle diversos tipos o requisitos al modelo
    username: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
})

//se exporta el modelo
module.exports = User;