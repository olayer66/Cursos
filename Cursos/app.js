"use strict";

//Carga de modulos
var express = require("express");
var fs=require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var multer=require("multer");
var expressValidator = require("express-validator");
var session = require("express-session");
var mysqlSession = require("express-mysql-session");
//Craga de modulos personalizados
var config= require("./config");
var accBBDD =require("./accesoBBDD");
var controlPartidas=require("./controlPartidas");
//Variables
var facMulter= multer({ storage: multer.memoryStorage() });
var recEstaticos= path.join(__dirname, "static");
var servidor= express();
var MySQLStore = mysqlSession(session);
var sessionStore = new MySQLStore(config.conexionBBDD);
var middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

//Configuracion de Express
servidor.set("view engine", "ejs");
servidor.set("views","paginas");

//Middleware
servidor.use(express.static(recEstaticos));
servidor.use(bodyParser.urlencoded({ extended: true }));
servidor.use(expressValidator());
servidor.use(middlewareSession);
//funcionalidad del servidor
/*==========================================METODOS GET==================================================*/
//Carga pagina inicio
servidor.get("/",function(req,res)
{
    res.status(200);
    if (req.session.IDUsuario===undefined)
        res.render("login");
    else
        res.redirect("/");
});
/*=========================================METODOS POST==================================================*/
//Creacion de un nuevo usuario
servidor.post("/nuevousuario",facMulter.single("imgPerfil"), function(req, res) 
{
    //control de contenido    
        //Campos vacios
            req.checkBody("correo","El e-mail no puede estar vacio").notEmpty();
            req.checkBody("nombre","El nombre no puede estar vacio").notEmpty();
            req.checkBody("apellidos","El/los apellidos no pueden estar vacios").notEmpty();
            req.checkBody("contra","La contraseña no puede estar vacia").notEmpty();
            req.checkBody("contraRep","La confirmacion de la contraseña no puede estar vacia").notEmpty();
            req.checkBody("fechaNac","La fecha de nacimiento no puede estar vacia").notEmpty();
            req.checkBody("sexo","Debe de seleccionar su sexo").notEmpty();
        //Control de tipos de datos
            req.checkBody("correo","El correo no tiene un formato correcto").isEmail();
            req.checkBody("nombre","El nombre solo puede contener letras").matches(/^[A-Z\s]*$/i);
            req.checkBody("apellidos","El/los apellidos solo pueden contener letras").matches(/^[A-Z\s]*$/i);
            req.checkBody("contra","La contraseña solo puede contener letras y numeros").matches(/^[A-Z0-9]*$/i);
            req.checkBody("contraRep","La verificacion solo puede contener letras y numeros").matches(/^[A-Z0-9]*$/i);
        //Control de contraseña (personalizado)
            req.checkBody("contra","El campo contraseña ha de tener entre 4 y 8 caracteres").isLength({ min: 4, max: 8 });
            req.checkBody("contraRep","El campo de confirmacion de contraseña ha de tener entre 4 y 8 caracteres").isLength({ min: 4, max: 8 });
            req.checkBody("contra","La verificacion de la contraseña no coincide").equals(req.body.contraRep);
        //Control de la fecha (personalizado)
        //if(req.checkBody("fechaNac","El campo fecha de nacimiento no es valido").isDate())
        //    req.checkBody("fechaNac","El campo fecha de nacimiento Debe ser anterior a lafecha actual").isBefore();
    //Validacion del contenido
    req.getValidationResult().then(function(result) 
    {
        //Carga de la imagen de perfil
        if (result.isEmpty()) 
        {
            //Llamada a la BBDD
            accBBDD.crearUsuario(req.body,function(err)
            {
                if(err)
                {
                    res.status(400);
                    res.render("error",{cabecera:"400-Error al crear la cuenta",
                                        mensaje: err.message,
                                        pila: err.stack,
                                        pagina:"volverusuario"});
                }
                else
                {
                    res.status(200);
                    res.render("usuariocreado",{IDUsuario:null,nick:req.body.nick});
                }
            });
        } 
        else 
        {
             res.status(200);
             res.render("nuevousuario",{errores:result.array()});
        }
    });
});

/*======================================INICIO DEL SERVIDOR==============================================*/
//Abrimos el servidor a la escucha por el puerto 3000
servidor.listen(config.puerto, function(err) {
    if (err) {
        console.log("Error al abrir el puerto "+config.puerto+": " + err);
    } else {
        console.log("Servidor escuchando en el puerto "+config.puerto+".");
    }
});


