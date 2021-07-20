const { json } = require('express');
const sequelize = require('../services/conect');

const todosEstudiantes = async () =>{

    return await sequelize.query(
        'select * from estudiantes',
        {
            type: sequelize.QueryTypes.query
        }
    )
}

module.exports = {todosEstudiantes};
