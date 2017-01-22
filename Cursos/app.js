"use strict";

//Carga de modulos
var express = require("express");
var fs=require("fs");
var https = require("https");
var path = require("path");
var bodyParser = require("body-parser");
var multer=require("multer");
var expressValidator = require("express-validator");
var passport = require("passport");
var passportHTTP = require("passport-http");
//Craga de modulos personalizados
var config=require("./config");
var cursos=require("./controlCursos");
var usuarios=require("./controlUsuarios");
//Variables
var facMulter= multer({ storage: multer.memoryStorage() });
var recEstaticos= path.join(__dirname, "static");
var servidor= express();
//Configuracion para el servidor de https
var clavePrivada=fs.readFileSync("./mi_clave.pem");
var certificado=fs.readFileSync("./certificado_firmado.crt");
var servidorHTTPS = https.createServer(
        { key: clavePrivada, cert: certificado }, servidor);
var estrategia=new passportHTTP.BasicStrategy(
        { realm: 'Autenticacion requerida' },
        function(user, pass, callback) {
           usuarios.conectar(user,pass,function(err,IDUsuario){
                if(err)
                {
                    callback(null, false);
                }
                else
                {
                    callback(null, { userId:IDUsuario });
                }
            });
        }
);
/*=========================================MIDDELWARE==================================================*/
//Configuracion https
servidor.use(passport.initialize());
passport.use(estrategia);
//ficheros estaticos
servidor.use(express.static(recEstaticos));
//parseadores del cuerpo de la peticion
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));
//validacion de capos
servidor.use(expressValidator());


//funcionalidad del servidor
/*=========================================METODOS POST==================================================*/
//Creacion de un nuevo curso
servidor.post("/curso", function(req, res) 
{
    //control de contenido    
        //Campos vacios
            req.checkBody("titulo","El titulo no puede estar vacio").notEmpty();
            req.checkBody("descripcion","Debe de indicar una descripcion del curso").notEmpty();
            req.checkBody("localidad","Debe de indicar la localidad donde se imparte el curso").notEmpty();
            req.checkBody("direccion","Debe de Indicar la direccion de donde se imparte el curso").notEmpty();
            req.checkBody("plazas","Debe de indicar el numero de plazas").notEmpty();
            req.checkBody("fechaInicio","La fecha de inicio no puede estar en blanco").notEmpty();
            req.checkBody("fechaFin","La fecha de fin no puede estar en blanco").notEmpty();
        //Control de tipos de datos
            req.checkBody("titulo","El titulo solo puede contener letras y numeros").matches(/^[A-Z0-9ñÑ\s]*$/i);
            req.checkBody("descripcion","La descripcion solo puede contener letras y numeros").matches(/^[A-Z0-9ñÑ\s]*$/i);
            req.checkBody("localidad","La localidad solo puede contener letras").matches(/^[A-Z\s]*$/i);
            req.checkBody("direccion","La direccion solo puede contener letras y numeros").matches(/^[A-Z0-9\s]*$/i);
            req.checkBody("plazas","El numero de plazas solo puede ser numerico").matches(/^[0-9]*$/i);
            
    //Validacion del contenido
    req.getValidationResult().then(function(result) 
    {
        //Carga de la imagen de perfil
        if (result.isEmpty()) 
        {
            //Llamada a la funcion para crear el curso
            cursos.crearCurso(req.body,function(err,IDCurso)
            {
                if(err)
                {
                    console.log(err);
                    res.status(400);
                }
                else
                {
                    console.log("Se ha creado el curso nº "+IDCurso);
                    res.status(200);
                }
            });
        } 
        else 
        {
            console.log("La validacion de los campos ha fallado:");
            console.log(result.array());
            res.status(400);
        }
        res.end();
    });
});
//Creacion de un nuevo usuario
servidor.post("/usuario", function(req, res) 
{
    //control de contenido    
        //Campos vacios
            req.checkBody("correo","El e-mail no puede estar vacio").notEmpty();
            req.checkBody("nombre","El nombre no puede estar vacio").notEmpty();
            req.checkBody("apellidos","El/los apellidos no pueden estar vacios").notEmpty();
            req.checkBody("contra","La contraseña no puede estar vacia").notEmpty();
            req.checkBody("contraRep","La confirmacion de la contraseña no puede estar vacia").notEmpty();
            req.checkBody("fechaDia","El dia no puede estar vacio").notEmpty();
            req.checkBody("fechaMes","El mes no puede estar vacio").notEmpty();
            req.checkBody("fechaAnio","El año no puede estar vacio").notEmpty();
            req.checkBody("sexo","Debe de seleccionar su sexo").notEmpty();
        //Control de tipos de datos
            req.checkBody("correo","El correo no tiene un formato correcto").isEmail();
            req.checkBody("nombre","El nombre solo puede contener letras").matches(/^[A-Z\s]*$/i);
            req.checkBody("apellidos","El/los apellidos solo pueden contener letras").matches(/^[A-Z\s]*$/i);
            req.checkBody("contra","La contraseña solo puede contener letras y numeros").matches(/^[A-Z0-9]*$/i);
            req.checkBody("contraRep","La verificacion solo puede contener letras y numeros").matches(/^[A-Z0-9]*$/i);
            req.checkBody("fechaDia","El dia solo puede contener numeros").matches(/^[0-9]*$/i);
            req.checkBody("fechaMes","El mes solo puede contener numeros").matches(/^[0-9]*$/i);
            req.checkBody("fechaAnio","El año solo puede contener numeros").matches(/^[0-9]*$/i);
        //Control de contraseña (personalizado)
            req.checkBody("contra","El campo contraseña ha de tener entre 4 y 8 caracteres").isLength({ min: 4, max: 8 });
            req.checkBody("contraRep","El campo de confirmacion de contraseña ha de tener entre 4 y 8 caracteres").isLength({ min: 4, max: 8 });
            req.checkBody("contra","La verificacion de la contraseña no coincide").equals(req.body.contraRep);
        //Control de la fecha (personalizado)
            
    //Validacion del contenido
    req.getValidationResult().then(function(result) 
    {
        //Carga de la imagen de perfil
        if (result.isEmpty()) 
        {
            usuarios.crearUsuario(req.body,function(err){
                if(err)
                {
                    console.log(err);
                    res.status(400);
                }
                else
                {
                    console.log("Se ha creado el usuario");
                    res.status(200);
                }
            });
        } 
        else 
        {
            console.log("La validacion de los campos ha fallado:");
            console.log(result.array());
            res.status(400);
        }
    });
});
/*=========================================METODOS GET===================================================*/
//Carga pagina inicio
servidor.get("/",function(req,res){
    fs.readFile('./static/index.html', function (err, html) 
    {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
    });
});
//Busqueda de curso/s
servidor.get("/curso",function(req,res){
    var busq= req.query.busq;
    var limite=req.query.limite;
    var posInicio=req.query.posInicio;
    if(busq!==null && busq!==undefined)
    {
        //Si es un ID de curso
        if(!isNaN(busq))
        {
            cursos.buscarCursoID(busq,function(err,respuesta){
                if(err)
                {
                    console.log(err);
                    res.status(500);
                    res.end();
                }
                else
                {
                    console.log("Respuesta correcta");
                    res.status(200);
                    res.json(respuesta);
                }
            });
        }
        else //Si es un titulo
        {
            if(limite!==null && limite!==undefined && posInicio!==null && posInicio!==undefined)
            {
                cursos.buscarCursoTitulo(busq,limite,posInicio,function(err,respuesta){
                    if(err)
                    {
                        console.log(err);
                        res.status(500);
                        res.end();
                    }
                    else
                    {
                        console.log("Respuesta correcta");
                        res.status(200);
                        res.json(respuesta);
                    }
                });
            }
            else
            {
                console.log("El limite " +limite+" o la posicion de inicio "+posInicio+" no son validos");
                res.status(404);
                res.end();
            }
        }
    }
    else
    {
        console.log("No es un parametro de busqueda valido: " +busq);
        res.status(404);
        res.end();
    }
});
//Devuelve el numero de resultados que contienen el parametro de busqueda
servidor.get("/curso/:busq",function(req,res){
    var busq= req.params.busq;
    if(busq!==null && busq!==undefined)
    {
            cursos.totalResultados(busq,function(err,total){
                if(err)
                {
                    console.log(err);
                    res.status(500);
                    res.end();
                }
                else
                {
                    console.log("Respuesta correcta");
                    res.status(200);
                    res.json(total);
                }
            });
    }
    else
    {
        console.log("No es un parametro de busqueda valido: " +busq);
        res.status(404);
        res.end();
    }
});
//Devuelve si el usuario es valido(si lo es devuelve el ID de usuario, si no devuelve FALSE)
servidor.get("/usuario/login",passport.authenticate('basic', {session: false}),function(req,res){
     res.json({permitido: true, IDUsuario:"paco"});
});
/*=========================================METODOS PUT===================================================*/
//Modificacion de un curso: ID por parametro y Datos en el cuerpo
servidor.put("/curso/:id",function(req,res){
    var datos= req.body;
    var id= req.params.id;
    if(id!==null && id!== undefined && !isNaN(id))
    {
        cursos.modificarCurso(id,datos,function(err){
            if(err)
            {
                console.log(err);
                res.status(500);
            }
            else
            {
                console.log("Modifcacion correcta del curso "+id);
                res.status(200);
            }
        });
    }
    else
    {
        console.log("El ID de curso no es valido: "+id);
        res.status(404);
    }
    res.end();
});
//añade o modifica la imagen de un curso
servidor.put("/curso/imagen/:id",facMulter.single("imagen"),function(req,res){
    var imagen;
    var id= req.params.id;
    if(id!==null && id!== undefined && !isNaN(id))
    {
        if (req.file)
        {
            imagen= req.file.buffer;
        }
        else
        {
            imagen=null;
        }
        cursos.cambiarImagenCurso(id,imagen,function(err){
            if(err)
            {
                console.log(err);
                res.status(500);
            }
            else
            {
                console.log("Modifcacion correcta del curso "+id);
                res.status(200);
            }
        });
    }
    else
    {
        console.log("El ID de curso no es valido: "+id);
        res.status(404);
    }
    res.end();
});
/*========================================METODOS DELETE=================================================*/
//Eliminar un curso
servidor.delete("/curso/:id",function(req,res){
    var id= req.params.id;
    if(id!==null && id!== undefined && !isNaN(id))
    {
        cursos.borrarCurso(id,function(err){
            if(err)
            {
                console.log(err);
                res.status(404);
            }
            else
            {
                console.log("Se ha borrado el curso "+ id);
                res.status(200);
            }       
        });
    }
    else
    {
        console.log("El ID de curso no es valido: "+id);
        res.status(404);
    }
    res.end();
});
/*======================================INICIO DEL SERVIDOR==============================================*/
//Abrimos el servidor a la escucha por el puerto 3000
//servidor.listen(config.puerto, function(err) {
//    if (err) {
//        console.log("Error al abrir el puerto "+config.puerto+": " + err);
//    } else {
//        console.log("Servidor escuchando en el puerto "+config.puerto+".");
//    }
//});

//Abrimos el servidor https a la escucha por el puerto 5555
servidorHTTPS.listen(config.puertoHTTPS, function(err) {
    if (err) {
        console.log("Error al abrir el puerto "+config.puertoHTTPS+": " + err);
    } else {
        console.log("Servidor escuchando en el puerto "+config.puertoHTTPS+".");
    }
});


