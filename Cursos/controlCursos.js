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
    totalResultados:totalResultados,
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
    console.log("Busqueda: " + titulo);
    console.log("Limite: " + limite);
    console.log("Posicion Inicio: " + posInicio);
    accBBDD.mostrarCursoPorTitulo(titulo,limite,posInicio,function (err,datos){
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
//Devuelve el numero de resultados conseguido en la busqueda
function totalResultados(titulo,callback)
{
    console.log("Busqueda: " + titulo);
    accBBDD.contarCursos(titulo,function (err,total){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            callback(null,total);
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
