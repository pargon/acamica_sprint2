const { getModel } = require("../model");


async function initialize() {

  createUser();
  createPayMeth();
  createProduct();
  createOrder();  
}

async function createUser(){
  
  const User = getModel('UserModel');  
  const current = await User.findOne({
    where: {
      userid: 'admin'
    }
  });
  if (!current) {
    User.create({
      userid: 'admin',
      nombre: 'gonzalo',
      apellido: 'parra',
      mail: 'gon@parra.com.ar',
      direenvio: 'direccion gon 123',
      telefono: '1122334455',
      password: 'Mimamamemimamemimamimama123*',
    });
  }
}

async function createPayMeth(){
  
  const PayMeth = getModel('PayMethModel');
  
  const current = await PayMeth.findOne({
    where:{
      codmediopago: 'CASH'
    }
  });
  if (!current) {
    PayMeth.create({
      codmediopago: 'CASH',
      descripcion: 'Efectivo'
    });
  }
}

async function createProduct(){
  
  const Product = getModel('ProductModel');
  const current = await Product.findOne({
    where: {
      codproducto: 'COCA'
    }
  });
  if (!current) {
    await Product.create({
      codproducto: 'COCA',
      descripcion: 'Coca Cola',
      precio: 180
    });
  }

  const Product2 = getModel('ProductModel');
  const current2 = await Product2.findOne({
    where: {
    codproducto: 'PEPSI'
    }
  });
  if (!current2) {
    await Product2.create({
      codproducto: 'PEPSI',
      descripcion: 'Pepsi Cola',
      precio: 170
    });
  }  

  const Product3 = getModel('ProductModel');
  const current3 = await Product3.findOne({
    where: {
      codproducto: 'HAMBUR'
    }
  });
  if (!current3) {
    await Product3.create({
      codproducto: 'HAMBUR',
      descripcion: 'Hamburguesa',
      precio: 320
    });
  }  
}

async function createOrder(){
  
  const Order = getModel('OrderModel');
  
  const current = await Order.findOne({
    where: {    numero: 1003}
  });

  if (!current) {
    Order.create({
      numero: 1003,
      fecha: '20210825',
      userid: 'admin',
      codmediopago: 'CASH',
      Detail:[{codproducto:'COCA', cantidad:1}]
      });
  }
}

module.exports ={
  initialize
}