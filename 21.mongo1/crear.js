const menues = require('./schemas');


const grabar = (req, res, next) => {

    // variable local
    let mmenu = req.body; // { plato: 'Milanesas', precio: '1500', tipo_de_plato: 'Minuta'};

    let dbmenues = new menues(mmenu);

    dbmenues.save();  

    next();
};

module.exports = {grabar};
