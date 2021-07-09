const mon = require('mongoose');


mon.connect('mongodb://localhost:27017/contactos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mon;
