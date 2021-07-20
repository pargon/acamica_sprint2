const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/acamica';

const sequelize = new Sequelize(path, {operatorsAliases: false});

sequelize.authenticate()
.then( () => {
    console.log('conectado');  })
.catch(err =>{
    sequelize.close();
});