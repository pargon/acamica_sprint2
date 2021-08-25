//
// clases
//
class Usuario{
    constructor(nombre, apellido, mail, direenvio, telefono, userid, password){
        this.nombre = nombre;
        this.apellido= apellido;
        this.mail=mail;
        this.direenvio=direenvio;
        this.telefono=telefono;
        this.userid=userid;
        this.password=password;
        this.admin=false;
    }
    setAdmin(){
        this.admin=true;
    }
}
module.exports= Usuario;
