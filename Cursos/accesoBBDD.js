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
    mostrarCurso: mostrarCurso,
    //Horarios
    insertarHorario:insertarHorario
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
            query="UPDATE Usuarios"+
                  "SET  Correo=?, Nombre=?, Apellidos=?, Contraseña=?, F_Nacimiento=?, Sexo=?" +
                  "WHERE ID_Usuario= ?";
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
