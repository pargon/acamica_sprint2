const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurant');

// define schema a usar
const menu = {
    plato: String,
    precio: String,
    tipo_de_plato: String
};

// obtiene objeto base relacionado con schema
const menues = mongoose.model('menues', menu);

module.exports = menues;