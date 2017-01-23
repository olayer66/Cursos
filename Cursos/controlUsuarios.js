/* 
 * Modulo de control de las acciones de los usuarios
 */
var accBBDD =require("./accesoBBDD");
module.exports={
    crearUsuario:crearUsuario,
    conectar:conectar,
    extraerCursosUsuario:extraerCursosUsuario
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
//Extrae los cursos del usuario pasado
function extraerCursosUsuario(IDUsuario,callback)
{
    
    var fechaActual= new Date();
    var fechaInicio;
    var fechaFin;
    var cursosProximos=[];
    var cursosPasados=[];
    var cursosActuales=[];
    //Extraemos cursos del usuario
    accBBDD.cursosDeUnUsuario(IDUsuario,function(err,cursos){
        if(err)
        {
            callback(err,null,null,null);
        }
        else
        {
            cursos.forEach(function(curso){
                fechaInicio=new Date(curso.F_Inicio);
                fechaFin= new Date(curso.F_Fin);
                if(fechaFin.getTime()<fechaActual.getTime())
                {
                    cursosPasados.push(curso);
                }
                else if(fechaInicio.getTime()>fechaActual.getTime())
                {
                    cursosProximos.push(curso);
                }
                else
                {
                    cursosActuales.push(curso);
                }
            });
            callback(null,cursosPasados,cursosProximos,cursosActuales);
        }
    });
}