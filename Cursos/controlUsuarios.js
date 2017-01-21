/* 
 * Modulo de control de las acciones de los usuarios
 */
var accBBDD =require("./accesoBBDD");
module.exports={
    crearUsuario:crearUsuario,
    conectar:conectar
};
//Crear un usuario
function crearUsuario(usuario,callback)
{
    accBBDD.crearUsuario(usuario,function(err){
        if(err)
        {
            callback(err);
        }
        else
        {
            callback(null);
        }
    });
}
//Login del usuario
function conectar(user,pass,callback)
{
    accBBDD.conectar(user,pass,function(err,resultado){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            if(resultado===undefined)
                callback(null,false);
            else
                callback(null,resultado);
        }
    });
}
