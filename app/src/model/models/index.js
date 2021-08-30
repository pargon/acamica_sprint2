const { DataTypes } = require('sequelize');

function createModel (sequelize){
  const User = sequelize.define('user', {
    userid: {
      type: DataTypes.STRING(60),
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    direenvio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }},
    {
      timestamps: false
    }
  );
//   return User;
// }
// function createProductModel (sequelize){
  const Product = sequelize.define('product', {
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }},{
      timestamps: false
    }
  );
//   return Product;
// }
// function createPaymethModel (sequelize){
  const PayMeth = sequelize.define('paymeth', {
    descripcion: {
      type: DataTypes.STRING(100),
      unique: true
    }},{
      timestamps: false
    }
    );
//   return PayMeth;
// }
// function createOrderModel (sequelize){
  const Order =  sequelize.define('order', {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    direccion_entrega: {
      type: DataTypes.STRING(100),
      allowNull: true
    }},{
      timestamps: false
    });

  const OrderProduct = sequelize.define('orderproduct',{
      cantidad: DataTypes.INTEGER
    },
    { 
      timestamps: false 
    }     
  );
  Order.belongsTo( User, { targetKey: 'userid', foreignKey: 'userUserid' });
  Order.belongsTo( PayMeth, { targetKey: 'descripcion', foreignKey: 'paymethDescripcion' });
  Order.belongsToMany(Product, {through: OrderProduct});
  Product.belongsToMany(Order, {through: OrderProduct});
    
  return {Order, Product, PayMeth, User};
}

module.exports ={
  createModel
};