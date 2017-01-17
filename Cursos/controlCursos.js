/* 
 * Modulo que controla las acciones sobre los cursos
 */
"use strict";
var accBBDD =require("./accesoBBDD");

module.exports={
    //cursos
    crearCurso:crearCurso,
    modificarCurso:modificarCurso,
    borrarCurso:borrarCurso,
    buscarCursoID:buscarCursoID,
    buscarCursoTitulo:buscarCursoTitulo,
    //horarios
    extraerHorarios:extraerHorarios
};
//Crear un curso
function crearCurso(datos,callback)
{
    if (datos!==null && datos!==undefined)
    {
        //Insertamos el curso
        accBBDD.crearCurso(datos,function(err,IDCurso){
            if(err)
            {
                callback(err,null);
            }
            else
            {
                //Insertamos los horarios
                var IDHorario=0;
                datos.horarios.forEach(function(horario){
                    accBBDD.insertarHorario(IDCurso,IDHorario,horario,function(err){
                        if(err)
                        {
                            accBBDD.borrarCurso(IDCurso,function(err){
                                if(err)
                                {
                                    callback(err,null);
                                }
                            });
                            callback(err,null);
                        }
                    });
                    IDHorario++;
                });
                //Si es correcto devolvemos el ID del Curso
                callback(null,IDCurso);
            }
        });  
    }
}
//Modificar un curso
function modificarCurso(IDCurso,datos,callback)
{
    //modificamos el curso
    
    //modificamos los horarios
}
//borrar un curso
function borrarCurso(IDCurso,callback)
{
    accBBDD.borrarCurso(IDCurso,function(err){
        if (err)
        {
            callback(err);
        }
        else
        {
            callback(null);
        }
    });
}
//busqueda por ID
function buscarCursoID(IDCurso,callback)
{
    accBBDD.mostrarCurso(IDCurso,function (err,datos)
    {
        if(err)
        {
           callback(err,null);
        }
        else
        {
            callback(null,datos);
        }
    });
}
//busqueda por titulo
function buscarCursoTitulo(titulo,limite,posInicio,callback)
{
    accBBDD.mostrarCursoPorTitulo(titulo,limite,posInicio,function callback(err,datos){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            callback(null,datos);
        }
    });
}
/*====================================FUNCIONES SOBRE HORARIOS=================================*/
//Extrae los horarios asociados a un curso
function extraerHorarios(IDCurso,callback)
{
    accBBDD.mostrarHorario(IDCurso,function(err,datos){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            callback(null,err);
        }
    });
}