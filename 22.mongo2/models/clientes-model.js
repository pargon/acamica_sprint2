const mon = require('../services/connect');

const schema = mon.Schema;

const contacto = new schema({
    telefono: String, 
    direccion: String
});

const cliente = new schema({
    nombre:String,
    apellido:String,
    email:String,
    contacto:[contacto]
});

mon.model('cliente', cliente);
const climodel = mon.model('cliente');


module.exports = climodel;
