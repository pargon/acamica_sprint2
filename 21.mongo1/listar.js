const menues = require('./schemas');


const listar = async (req, res, next) => {

    let dbmenues = await menues.find().then(resp => resp );
    res.json(dbmenues);

    next();
};

module.exports = {listar};
