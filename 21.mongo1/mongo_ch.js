const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mi_base');

// define schema a usar
const schema = {nombre: String, apellido: String, edad: Number};

// obtiene objeto base relacionado con schema
const Usuarios = mongoose.model('Usuarios', schema);



const grabar = (req, res, next) => {

    // variable local
    const yo = {nombre: 'Juan', apellido: 'Perez', edad: 24};

    // nuevo objeto tipo Usuario
    let nuevo_usuario = new Usuarios(yo)

    // guarda en base
    nuevo_usuario.save();

    // lo buscamos en la base
    Usuarios.find()
    .then( (resultados) => console.log(resultados));

    next();
};

module.exports = {grabar};
