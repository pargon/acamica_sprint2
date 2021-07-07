const menues = require('./schemas');


const borraruno = async (req, res, next) => {

    let qplato = req.query.plato;

    await menues.deleteOne({plato: qplato})
    .then( next() )
    .catch( err => res.status(404).send(err));

};

module.exports = {borraruno};
