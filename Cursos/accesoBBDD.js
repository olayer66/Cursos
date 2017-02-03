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
    añadirUsuarioCurso:añadirUsuarioCurso,
    quitarUsuarioCurso:quitarUsuarioCurso,
    //Cursos
    crearCurso: crearCurso,
    modificarCurso: modificarCurso,
    borrarCurso:borrarCurso,
    mostrarCurso: mostrarCurso,
    mostrarCursoPorTitulo:mostrarCursoPorTitulo,
    contarCursos:contarCursos,
    cambiarImagenCurso:cambiarImagenCurso,
    extraerImagen:extraerImagen,
    inscribirUsuarioEnCurso:inscribirUsuarioEnCurso,
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
        var fecha=valores.fechaAnio+"/"+valores.fechaMes+"/"+valores.fechaDia;
        query="INSERT INTO Usuarios(Correo,Nombre,Apellidos,Contraseña,F_Nacimiento,Sexo)"+
              "VALUES (?,?,?,?,?,?)";
        valoresEntrada=[valores.correo,valores.nombre,valores.apellidos,valores.contra,fecha,valores.sexo];
        //Conectamos con la consulta requerida
        conexion.connect(function(err)
        {
            if (err) 
            {
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(query,valoresEntrada,function(err, rows) 
                {
                    if (err) 
                    {
                        //console.error(err);
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
                    //console.error(err);
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
                //console.error(err);
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
function conectar(user,pass,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(user!==null && user!==undefined && pass!==null && pass!==undefined)
    {
        query="SELECT ID_Usuario FROM usuarios WHERE Correo=? AND Contraseña=?";
        valoresEntrada=[user,pass];
        //Conectamos con la consulta requerida
        handleDisconnect(conexion);
        conexion.connect(function(err)
        {
            if (err) 
            {
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
                {
                    if (err) 
                    {
                        //console.error(err);
                        callback(err,null);
                    } 
                    else 
                    {
                        callback(null,rows[0].ID_Usuario);
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
//Extrae los cursos en los que esta apuntado el usuario pasado
function cursosDeUnUsuario(IDUsuario,callback)
{
  var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDUsuario!==null && IDUsuario!==undefined)
    {
        query="SELECT cursos.* FROM asig_cursos AS asig,cursos WHERE asig.ID_Usuario=? AND asig.ID_Curso=cursos.ID_Curso";
        valoresEntrada=[IDUsuario];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                //console.error(err);
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
//Extrae los usuarios que estan inscritos en el curso pasado
function usuariosDeUnCurso(IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        query="SELECT * FROM asig_cursos WHERE ID_Curso=?";
        valoresEntrada=[IDCurso];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                //console.error(err);
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
//Añade un usuario a un curso
function añadirUsuarioCurso(IDUsuario,IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null && IDCurso!==undefined)
    {
        if(IDUsuario!==null && IDUsuario!==undefined)
        {
            query="INSERT INTO Cursos(ID_Curso,ID_Usuario) VALUES (?,?)";
            valoresEntrada=[IDCurso,IDUsuario];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    //console.error(err);
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
            callback(new Error("El ID de usuario no es valido"));
        }
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
//Quita un usuario de un curso
function quitarUsuarioCurso(IDUsuario,IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null && IDCurso!==undefined)
    {
        if(IDUsuario!==null && IDUsuario!==undefined)
        {
            query="DELETE FROM asig_cursos WHERE ID_Curso= ? AND ID_Usuario=?";
            valoresEntrada=[IDCurso,IDUsuario];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    //console.error(err);
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
            callback(new Error("El ID de usuario no es valido"));
        }
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
/*========================================CURSOS========================================*/
//Crear un curso
function crearCurso(valores,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(valores!==null)
    {
        query="INSERT INTO Cursos(Titulo,Descripcion,Localidad,Direccion,Plazas,F_inicio,F_Fin) VALUES (?,?,?,?,?,?,?)";
        valoresEntrada=[valores.titulo,valores.descripcion,valores.localidad,valores.direccion,valores.plazas,valores.fechaInicio,valores.fechaFin];
        //Conectamos con la consulta requerida
        conexion.connect(function(err)
        {
            if (err) 
            {
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                conexion.query(query,valoresEntrada,function(err, info) 
                {
                    if (err) 
                    {
                        //console.error(err);
                        callback(err,null);
                    } 
                    else 
                    {              
                        //Insertamos los horarios
                        valores.horarios.forEach(function(horario)
                        {
                            query="INSERT INTO horarios(ID_Curso,Dia,Hora_Inicio,Hora_Fin) VALUES (?,?,?,?)";
                            valoresEntrada=[info.insertId,horario.dia,horario.horaInicio,horario.horaFin];
                            conexion.query(query,valoresEntrada,function(err) 
                            {
                                if (err) 
                                {
                                    conexion.rollback(function() {
                                        throw err;
                                    });
                                    callback(err,null);
                                } 
                            });
                        });
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
            query="UPDATE cursos SET  Titulo=?,Descripcion=?, Localidad=?, Direccion=?, Plazas=?, F_Inicio=?, F_Fin=?, Imagen=? WHERE ID_Curso= ?";
            valoresEntrada=[valores.titulo,valores.descripcion,valores.localidad,valores.direccion,valores.plazas,valores.fechaInicio,valores.fechaFin,valores.imagen,IDCurso];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    //console.error(err);
                    callback(err);
                } 
                else 
                {              
                    valores.horarios.forEach(function(horario)
                    {
                        if(horario.IDHorario!==null && horario.IDHorario!==undefined)
                        {
                            query="UPDATE horarios SET  Dia=?, Hora_Inicio=?, Hora_Fin=? WHERE ID_Curso= ? AND ID_Horario =?";
                            valoresEntrada=[horario.dia,horario.horaInicio,horario.horaFin,IDCurso,horario.IDHorario];
                            //Conectamos con la consulta requerida
                            conexion.query(mysql.format(query,valoresEntrada),function(err) 
                            {
                                if (err) 
                                {
                                    //console.error(err);
                                    conexion.rollback(function() {
                                        throw err;
                                    });
                                    callback(err);
                                } 
                            });
                        }
                        else
                        {
                            callback(new Error("El ID de horario no es valido"));
                        }
                    });
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
                //console.error(err);
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
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                callback(null,rows[0]);
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
        query="SELECT * FROM cursos WHERE Titulo RLIKE ? ORDER BY F_Inicio ASC LIMIT ? OFFSET ?";
        valoresEntrada=[titulo,parseInt(limite),parseInt(posInicio)];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                //console.error(err);
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
//Extrae el numero de cursos que cumplen la condicion pasada por el titulo
function contarCursos(titulo,callback)
{
      var conexion = mysql.createConnection(config.conexionBBDD);
    if(titulo!==null && titulo!==undefined)
    {
        query="SELECT COUNT(ID_Curso) AS total FROM cursos WHERE Titulo RLIKE ?";
        valoresEntrada=[titulo];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err,contador) 
        {
            if (err) 
            {
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                console.log("Total de resultados: "+contador[0].total);
                callback(null,contador[0].total);
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de curso no es valido"),null);
    }
}
function cambiarImagenCurso(IDCurso,imagen,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        query="UPDATE cursos SET Imagen=? WHERE ID_Curso= ?";
        valoresEntrada=[imagen,IDCurso];
        //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err) 
        {
            if (err) 
            {
                //console.error(err);
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
//Extrae la imagen del curso pasado por parametro
function extraerImagen(IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null && IDCurso!==undefined)
    {
        query="SELECT Imagen FROM cursos WHERE ID_Curso=?";
        valoresEntrada=[IDCurso];
         //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                //console.error(err);
                callback(err,null);
            } 
            else 
            {
                callback(null,rows[0].Imagen);
                conexion.end();
            }
        });
    }
    else
    {
        callback(new Error("El ID de curso no es valido"),null);
    }
}
//Inscripcion de un usuario en un curso -----------------------------------------------------------------------------------------------------------------------------
function inscribirUsuarioEnCurso(IDCurso,IDUsuario,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null && IDUsuario!==null)
    {
        valoresEntrada=[IDCurso, IDUsuario];
        //Conectamos con la consulta requerida
        conexion.connect(function(err)
        {
            if (err) 
            {
                //console.error(err);
                callback(err);
            } 
            else 
            {
                query="SELECT COUNT(ID_Curso) AS total FROM asig_cursos WHERE ID_Curso RLIKE ? and ID_Usuario RLIKE ?";
                conexion.query(query,valoresEntrada,function(err, contador) 
                {
                    if (err) 
                    {
                        //console.error(err);
                        callback(err);
                    } 
                    else 
                    {
                        if(contador[0].total === 0){
                            
                            query="SELECT * FROM cursos WHERE ID_Curso RLIKE ?";
                            conexion.query(query,IDCurso,function(err, curso) 
                            {
                                if (err) 
                                {
                                    //console.error(err);
                                    callback(err);
                                } 
                                else 
                                {
                                    
                                    var fechaActual= new Date();
                                    fechaFin= new Date(curso[0].F_Fin);
                                    
                                    if(fechaFin.getTime()<fechaActual.getTime()) //El curso ya ha terminado
                                    {
                                        callback("El usuario no puede registrarse en un curso finalizado");
                                    }
                                    else
                                    {
                                        query="INSERT INTO asig_cursos(ID_Curso,ID_Usuario) VALUES (?,?)";
                                        conexion.query(query,valoresEntrada,function(err, info) 
                                        {
                                            if (err) 
                                            {
                                                callback(err);
                                            } 
                                            else 
                                            {
                                                console.log("Esta la info que devuelve al insertar: " + info);
                                                callback(null);
                                                conexion.end();
                                            }
                                        });
                                    }
                                }
                            });   
                        }
                        else{
                            callback("El usuario ya esta registrado en ese curso");
                        }
                    }
                });
            }      
        });
    }
    else
    {
        callback(new Error("Los valores no son validos"));
    }
}

/*=======================================HORARIOS=======================================*/
//Inserta un horario en la tabla
function insertarHorario (IDCurso,horario,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
   if(horario!==null)
   {
       query="INSERT INTO horarios(ID_Curso,Dia,Hora_Inicio,Hora_Fin)"+
             "VALUES (?,?,?,?)";
       valoresEntrada=[IDCurso,horario.dia,horario.horaInicio,horario.horaFin];
       //Conectamos con la consulta requerida
       conexion.connect(function(err)
       {
           if (err) 
           {
               //console.error(err);
               callback(err);
           } 
           else 
           {
               conexion.query(query,valoresEntrada,function(err) 
               {
                   if (err) 
                   {
                       //console.error(err);
                       callback(err);
                   } 
                   else 
                   {
                       callback(null);
                       conexion.end();
                   }
               });
           }      
       });
   }
   else
   {
       callback(new Error("El horario no es valido"),null);
   }
}
//Modifica un horario
function actualizarHorario(horario,callback)
{
     var conexion = mysql.createConnection(config.conexionBBDD);
    if(horario.IDCurso!==null && horario.IDCurso!==undefined)
    {
        if(horario.IDHorario!==null && horario.IDHorario!==undefined)
        {
            query="UPDATE horarios SET  Dia=?, Hora_Inicio=?, Hora_Fin=? WHERE ID_Curso= ? AND ID_Horario =?";
            valoresEntrada=[horario.dia,horario.horaInicio,horario.horaFin,horario.IDCurso,horario.IDHorario];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    //console.error(err);
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
            callback(new Error("El ID de horario no es valido"));
        }
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
//Borra un horario de la tabla
function borrarHorario (IDCurso,IDHorario,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null && IDCurso!==undefined)
    {
        if(IDHorario!==null && IDHorario!==undefined)
        {
            query="DELETE FROM horarios WHERE ID_Curso= ? AND ID_Horario=?";
            valoresEntrada=[IDCurso,IDHorario];
            //Conectamos con la consulta requerida
            conexion.query(mysql.format(query,valoresEntrada),function(err) 
            {
                if (err) 
                {
                    //console.error(err);
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
            callback(new Error("El ID de horario no es valido"));
        }
    }
    else
    {
        callback(new Error("El ID de curso no es valido"));
    }
}
function mostrarHorario (IDCurso,callback)
{
    var conexion = mysql.createConnection(config.conexionBBDD);
    if(IDCurso!==null)
    {
        query="SELECT * FROM horarios WHERE ID_Curso=?";
        valoresEntrada=[IDCurso];
        //Conectamos con la consulta requerida
        conexion.query(mysql.format(query,valoresEntrada),function(err, rows) 
        {
            if (err) 
            {
                //console.error(err);
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
/*==================================CONTROL DE CONEXION=================================*/
function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    //console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}
