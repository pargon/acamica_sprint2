
class Pedido{
    constructor(numero, fecha, userid, codmediopago, detalle){
        this.numero=numero;
        this.fecha=fecha;
        this.userid=userid;
        this.codmediopago=codmediopago;
        this.estado='Pendiente';
        this.detalle=detalle;
    }
    setEstado(estado){
        this.estado = estado;
    }
}
class DetallePedido{
    constructor(codproducto, cantidad){
        this.codproducto=codproducto;
        this.cantidad=cantidad;
    }
}

module.exports = Pedido;