const jwt = require("jsonwebtoken");

const texto1 = "hola curso";

var token = jwt.sign({ texto1 }, 'secretmimama123*');

console.log(token);


var decoded = jwt.verify(token, 'secretmimama123*');

console.log('decodificado ', decoded);
