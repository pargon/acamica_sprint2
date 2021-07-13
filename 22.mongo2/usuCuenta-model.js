const mon = require('./connect');

const schema = mon.Schema;


const usuCuenta = new schema({
    nombre:String,
    apellido:String,
    email:String,
    saldo:Number
});

mon.model('usucuenta', usuCuenta);
const usuC = mon.model('usucuenta');


module.exports = usuC;
