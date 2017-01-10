// Conexion a la BBDD
"use strict";

var mysql = require("mysql");
var config= require("./config");
var query;
var valoresEntrada;
// Salida del modulo con todas las funciones
module.exports={
    //Usuarios
    crearUsuario: crearUsuario,
    modificarUsuario: modificarUsuario,
    mostrarUsuario: mostrarUsuario,
    conectar: conectar,
    //Usuarios y cursos
    cursosDeUnUsuario:cursosDeUnUsuario,
    usuariosDeUnCurso:usuariosDeUnCurso,
    //Cursos
    crearCurso: crearCurso,
    modificarCurso: modificarCurso,
    borrarCurso:borrarCurso,
    mostrarCurso: mostrarCurso,
    mostrarCursoPorTitulo:mostrarCursoPorTitulo,
    //Horarios
    insertarHorario:insertarHorario,
    actualizarHorario:actualizarHorario,
    borrarHorario:borrarHorario,
    mostrarHorario:mostrarHorario
};
/*=======================================USUARIOS=======================================*/
//Crear un usuario
function crearUsuario(valores,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(valores!==null)
    {
        query="INSERT INTO Usuarios(Correo,Nombre,Apellidos,Contraseña,F_Nacimiento,Sexo)"+
              "VALUES (?,?,?,?,?,?)";
        valoresEntrada=[valores.correo,valores.nombre,valores.apellidos,valores.contra,valores.fechaNac,valores.sexo];
        //Conectamos con la consulta requerida
        conexion.connect(function(err)
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(query,valoresEntrada,function(err, rows) 
                {
                    if (err) 
                    {
                        console.error(err);
                        callback(err,null);
                    } 
                    else 
                    {
                        callback(null,rows);
                        conexion.end();
                    }
                });
            }      
        });
    }
    else
    {
        callback(new Error("Los valores no son validos"),null);
    }
}
//modificar un usuario
function modificarUsuario(IDUsuario,valores,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDUsuario!==null)
    {
        if(valores!==null)
        {
            query="UPDATE Usuario SET  Correo=?, Nombre=?, Apellidos=?, Contraseña=?, F_Nacimiento=?, Sexo=? WHERE ID_Usuario= ?";
            valoresEntrada=[valores.correo,valores.nombre,valores.apellidos,valores.contraseña,valores.fechaNac,valores.sexo,IDUsuario];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    console.error(err);
                    callback(err);
                } 
                else 
                {
                    conexion.end();
                }
            });
        }
        else
        {
            callback(new Error("Los valores no son validos"));
        }
    }
    else
    {
        callback(new Error("El ID de usuario no es valido"));
    }
}
//Extraer los datos de un usuario
function mostrarUsuario(ID,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(ID!==null)
    {
        query="SELECT * FROM Usuarios WHERE ID_Usuario=?";
        valoresEntrada=[ID];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                callback(null,rows);
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de usuario no es valido"),null);
    }
}
//Comprbar el login del usuario
function conectar(datos,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(datos!==null)
    {
        query="SELECT ID_Usuario FROM usuarios WHERE Correo=? AND Contraseña=?";
        valoresEntrada=[datos.correoLog,datos.contraLog];
        //Conectamos con la consulta requerida
        handleDisconnect(conexion);
        conexion.connect(function(err)
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
                {
                    if (err) 
                    {
                        console.error(err);
                        callback(err,null);
                    } 
                    else 
                    {
                        callback(null,rows);
                        conexion.end();
                    }
                }); 
            }    
        });
    }
    else
    {
        callback(new Error("Los datos no son validos"),null);
    }
}
/*===================================USUARIOS Y CURSOS==================================*/
/*========================================CURSOS========================================*/
//Crear un curso
function crearCurso(valores,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(valores!==null)
    {
        query="INSERT INTO Cursos(Titulo,Descripcion,Localidad,Direccion,Plazas,F_inicio,F_Fin)"+
              "VALUES (?,?,?,?,?,?,?)";
        valoresEntrada=[valores.titulo,valores.descripcion,valores.localidad,valores.direccion,valores.plazas,valores.fechaInicio,valores.fechaFin];
        //Conectamos con la consulta requerida
        conexion.connect(function(err)
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(query,valoresEntrada,function(err, info) 
                {
                    if (err) 
                    {
                        console.error(err);
                        callback(err,null);
                    } 
                    else 
                    {
                        callback(null,info.insertId);
                        conexion.end();
                    }
                });
            }      
        });
    }
    else
    {
        callback(new Error("Los valores no son validos"),null);
    }
}
//modificar un usuario
function modificarCurso(IDCurso,valores,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        if(valores!==null)
        {
            query="UPDATE cursos SET  Titulo=?, Localidad=?, Direccion=?, Plazas=?, F_Inicio=?, F_Fin=?, Imagen=? WHERE ID_Curso= ?";
            valoresEntrada=[valores.titulo,valores.localidad,valores.direccion,valores.plazas,valores.fechaInicio,valores.fechaFin,valores.imagen,IDCurso];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    console.error(err);
                    callback(err);
                } 
                else 
                {
                    conexion.end();
                }
            });
        }
        else
        {
            callback(new Error("Los valores no son validos"));
        }
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
//Borra un curso de la BBDD
function borrarCurso(IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        query="DELETE FROM cursos WHERE ID_Curso= ?";
        valoresEntrada=[IDCurso];
        //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err) 
        {
            if (err) 
            {
                console.error(err);
                callback(err);
            } 
            else 
            {
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
//Muestra todos los datos de un curso
function mostrarCurso(IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        query="SELECT * FROM cursos WHERE ID_Curso=?";
        valoresEntrada=[IDCurso];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                callback(null,rows);
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de curso no es valido"),null);
    }
}
/*Muestra todos los datos de los cursos que tengan todo o parte del titulo pasado
 * titulo: texto por el que buscar
 * limite: numero maximo de resultados
 * posInicio: a partir de donde se quiere mepzar a buscar
*/
function mostrarCursoPorTitulo(titulo,limite,posInicio,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(titulo!==null && titulo!==undefined)
    {
        query="SELECT * FROM cursos WHERE MATCH(Titulo) AGAINST(?) ORDER BY F_Inicio ASC LIMIT ? OFFSET ?";
        valoresEntrada=[titulo,limite,posInicio];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                console.error(err);
                callback(err,null);
            } 
            else 
            {
                callback(null,rows);
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de curso no es valido"),null);
    }
}
/*=======================================HORARIOS=======================================*/
/*==================================CONTROL DE CONEXION=================================*/
function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}