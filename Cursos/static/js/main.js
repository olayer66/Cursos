/*
 * Funcion main:
    * La incializacion y las llamadas al servidor
    * Las variables globales
    * Las funciones de muestra y ocultacion de las direfentes ventanas
 */
var divActivo;
var limite=5;
var IDUsuarioLogin;
var fAnt;
var fSig;
$(document).ready(function() 
{
    console.log("DOM inicializado");
    //Carga de vista inicial
    vistaInicial();
    /*-----------------CABECERA-----------------------*/
    $("#registrarse").on("click",function(){
        vistaNuevoUsuario();
    });
    $("#logearse").on("click",function(){
        vistaLoginUsuario();
    });
    //Boton de cerrar sesion
    $("#desconectar").on("click",function(){
        IDUsuarioLogin=undefined;
        eliminarDatosUsuario();
        vistaDesconexion();
    });
    /*-------------------MENU--------------------------*/
    $("#buscarCurso").on("click",function(){
        vistaBuscador();
    });
    $("#misCursos").on("click",function(){
        
        
        //Extraemos los datos del usuario
        recuperarDatosUsuario(IDUsuarioLogin,function(err,cursos){
            if(err)
            {
                alert(err);
            }
            else
            {
                //Cargamos los datos extraidos
                cargarDatosUsuario(cursos,function(err){
                    if(err)
                    {
                        alert("err");
                    }
                    else
                    {
                        vistaDatosUsuario();
                    }
                });
            }
        });
    });
    /*-----------------CONTENIDO-----------------------*/
    //Boton para buscar cursos por titulo
    $("#botonBuscarCurso").on("click",function(){
        var busq=$("#buscarTitulo").val();
        //Extraemos el nº de resultados
        llamadaTotalCursos(busq, function (err,total){
            if (err)
            {
                alert(err);
            }
            else
            {
                //Si hay cursos que cumplan la condicion
                if(total>0)
                {
                    quitarPaginacion();
                    if(total>5)
                    {
                        insertarPaginacion(total,busq);
                        $("#paginacion").show();
                    }
                    //Extraemos los cursos
                    llamadaExtraeCursos(busq,limite,0,function(err,cursos){
                        if(err)
                        {
                            alert(err);
                        }
                        else
                        {
                            mostrarCursos(cursos);
                            $("#detalleCurso").hide();
                            $("#cargaCursos").show();
                        }
                    });
                }
                else
                {
                    alert("No se han encontrado resultados");
                }
            }        
        });  
    });
    //Boton de paginacion de uno hacia atras
    $("#paginacion").on("click","#unoAtras",function (){
        var busq=$("#unoAtras").data("busq");
        var posInicio=$("#unoAtras").data("posinicio");
        var numPags=$("#unoAlante").data("numpags");
        var total=numPags*limite;
        if(posInicio >=0)
        {
            cambiarValoresPaginacion(total,posInicio,limite);
            llamadaExtraeCursos(busq,limite,posInicio,function(err,cursos)
            {
                if(err)
                {
                    alert(err);
                }
                else
                {
                    mostrarCursos(cursos);
                }
            });
        }
    });
    //Boton de paginacion de uno hacia adelante
    $("#paginacion").on("click","#unoAlante",function (){
        
        var busq=$("#unoAlante").data("busq");
        var posInicio=$("#unoAlante").data("posinicio");
        var numPags=$("#unoAlante").data("numpags");
        var total=numPags*limite;
        if(posInicio < total)
        {
            cambiarValoresPaginacion(total,posInicio,limite);
            llamadaExtraeCursos(busq,limite,posInicio,function(err,cursos)
            {
                if(err)
                {
                    alert(err);
                }
                else
                {
                    mostrarCursos(cursos);
                }
            });
        }
    });
    //Botones de paginas en la paginacion de los cursos
    $("#paginacion").on("click",".botonPagina",function (event){    
        var boton=$(event.target);
        var busq=boton.data("busq");
        var posInicio=boton.data("posinicio");
        var numPags=$("#unoAlante").data("numpags");
        var total=numPags*limite;
        cambiarValoresPaginacion(total,posInicio,limite);
        llamadaExtraeCursos(busq,limite,posInicio,function(err,cursos)
        {
            if(err)
            {
                alert(err);
            }
            else
            {
                mostrarCursos(cursos);
            }
        });
    });
    //Boton de crear nuevo usuario
    $("#botonCrearUsuario").on("click",function(){
        llamadaInsertarUsuario(function(err){
            if(err)
            {
                alert(err);
            }
            else
            {
                $("#insercionUsuario").hide();
                $("#insercionUsuarioCorrecta").show(); 
            }
        });
    });
    //Boton de iniciar sesion
    $("#botonLoginUsuario").on("click",function(){
        llamadaLoginUsuario(function(err,login){
            if(err)
            {
                alert(err);
            }
            else
            {
                //login correcto
                if(login.permitido===true)
                {
                    IDUsuarioLogin=login.IDUsuario;
                    //mostramos los datos del usuario
                    cargarPantallaUsuario(login.IDUsuario,function(err)
                    {
                        if(err)
                        {
                            alert("err");
                        }
                        else
                        {
                            
                            $("#spanUsuarioConectado").text($("#loginCorreo").val());
                            vistaDatosUsuario();
                        }  
                    });
                }
                else
                {
                    alert("El usuario o la contraseña no son validos");
                }
            }
        });
    });  
    //Cada una de las filas de la tabla cursos
    $("#tablaCursos").on("click",".dataCurso", function (event){    
        
        var boton=$(event.target);
        var id=boton.data("idcurso");
        
        llamadaExtraeCurso(id,function(err,curso)
        {
            if(err)
            {
                alert(err);
            }
            else
            {
                
                mostrarInformacionCurso(curso.datos,curso.horarios);
                if(IDUsuarioLogin!==undefined)
                    insertarBotonLogin(curso.datos.ID_Curso);
               
            }
        });
        $("#detalleCurso").show();
    });
    //Inscribe al usuario en el curso concreto
    $("#botonDetalle").on("click","#botonInscribirse", function (event){    
        var boton=$(event.target);
        var idcurso=boton.data("idcurso");
        inscribirseEnCurso(idcurso, IDUsuarioLogin,function(err)
        {
            if(err)
            {
                alert(err);
            }
            else
            {
                alert("Se ha inscrito correctamente  en el curso");
                cargarPantallaUsuario(IDUsuarioLogin,function(err){
                    if(err)
                    {
                        alert(err);
                    }
                    else
                    {
                        vistaDatosUsuario();
                    }
                });
                
            }
        });
    });
    //Boton de paginacion de curso hacia atras
    $("#botonSemanaAnt").on("click",function (){
        cambiarHorario(fAnt,function(err){
            if(err)
            {
                alert(err);
            }
        });
    });
    //Boton de paginacion de curso hacia alante
    $("#botonSemanaSig").on("click",function (){
        cambiarHorario(fSig,function(err){
            if(err)
            {
                alert(err);
            }
        });
    });
});
/*==========================FUNC. DE VISTA============================*/
//Carga la vista inicial
function vistaInicial(){
    divActivo=$("#buscador");
    vistaBuscador();
    $("#menuConSesion").hide();
    $("#insertarUsuario").hide();
    $("#loginConectado").hide();
    $("#usuarioConectado").hide();
    $("#loginUsuario").hide();
    $("#datosUsuario").hide();
    $("#detalleCurso").hide();
    
}
//Muestra la ventana de buscador
function vistaBuscador(){
    divActivo.hide();
    divActivo=$("#buscador");
    divActivo.show();
    $("#buscar").show();
    $("#cargaCursos").hide();
    $("#paginacion").hide();
    $("#detalleCurso").hide();
}
//Muestra la ventana de nuevo usuario
function vistaNuevoUsuario(){
    divActivo.hide();
    divActivo=$("#insertarUsuario");
    $(".borrarSelect").remove();
    crearSelectFecha();
    divActivo.show();
    $("#insercionUsuario").show();
    $("#insercionUsuarioCorrecta").hide();
}
//Muestra la ventana de logeo
function vistaLoginUsuario(){
    divActivo.hide();
    divActivo=$("#loginUsuario");
    divActivo.show();
}
//Muestra la ventana con los datos del usuario
function vistaDatosUsuario(){
    divActivo.hide();
    divActivo=$("#datosUsuario");
    divActivo.show();
    $("#menuConSesion").show();
    $("#login").hide();
    $("#loginConectado").show();
    $("#resultado").hide();
    
}
//Oculta los div de conectado y carga la vista del buscador
function vistaDesconexion(){
    $("#menuConSesion").hide();
    $("#login").show();
    $("#loginConectado").hide();
    vistaBuscador();
}
/*===========================FUNC. DE LLAMADA==========================*/
function llamadaTotalCursos(busq,callback){
    $.ajax({
        type: "GET",
        url:"/curso/"+busq,
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la extraccion del total. Error: "+ errorThrown),null);
        }
    });   
}
//Extrae los cursos por el titulo
function llamadaExtraeCursos(busq,limite,posInicio,callback){
    $.ajax({
        type: "GET",
        url:"/curso",
        data:{
            "busq":busq,
            "limite":limite,
            "posInicio":posInicio
        },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la extraccion de los cursos. Error: "+ errorThrown),null);
        }
    });
}
//Extrae los datos de un curso concreto (por id)
function llamadaExtraeCurso(id,callback){
    console.log("Encontrado id= "+id);
    $.ajax({
        type: "GET",
        url:"/curso/busqueda/"+id,
        data:{
            "id":id
        },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la extraccion del curso. Error: "+ errorThrown),null);
        }
    });
}
//Inserta un nuevo usuario en la BBDD
function llamadaInsertarUsuario(callback){
    $.ajax({
        type: "POST",
        url:"/usuario",
        data:{
            "correo":$("#usuarioCorreo").val(),
            "nombre":$("#usuarioNombre").val(),
            "apellidos":$("#usuarioApellidos").val(),
            "contra":$("#usuarioContra").val(),
            "contraRep":$("#usuarioContraRep").val(),
            "fechaDia":$("#usuarioDia").val(),
            "fechaMes":$("#usuarioMes").val(),
            "fechaAnio":$("#usuarioAnio").val(),
            "sexo":$('input[name=usuarioSexo]:checked').val()
        },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la insercion del usuario. Error: "+ errorThrown),null);
        }
    });
}
function llamadaLoginUsuario(callback){
    var user =$("#loginCorreo").val();
    var pass =$("#loginContra").val();
    var cadenaBase64 = btoa(user + ":" + pass);
    $.ajax({
        type: "GET",
        url:"/usuario/login",
        beforeSend: function(req) {
           // Añadimos la cabecera 'Authorization' con los datos
           // de autenticación.
           req.setRequestHeader("Authorization", 
                                "Basic " + cadenaBase64);
       },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en en el login. Error: "+ errorThrown),null);
        }
    });
}
//Llama al servidor para extraer los cursos de un usuario
function llamadaCursosUsuario(IDUsuario,callback){
    $.ajax({
        type: "GET",
        url:"/usuario/"+IDUsuario,
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la extraccion de los cursos proximos. Error: "+ errorThrown),null);
        }
    });
}
//Permite a un usuario registrarse en un curso seleccionado ----------------------------------------------------------------------------------------------------------
function inscribirseEnCurso(IDCurso, IDUsuario, callback){
    $.ajax({
        type: "POST",
        url:"/curso/inscripcion",
        data:{
            "idCurso":IDCurso,
            "idUsuario":IDUsuario
        },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la inscripcion del usuario "+IDUsuario+" en el curso "+IDCurso+". Error: "+ errorThrown),null);
        }
    });
}
function llamadaExtraerHorario(fechLunes,fechDomingo,callback)
{
    
     $.ajax({
        type: "GET",
        url:"/usuario/horarios/"+IDUsuarioLogin,
        data:{
            "fechLunes":fechLunes,
            "fechDomingo":fechDomingo
        },
        success:function (data, textStatus, jqXHR) 
        {
            console.log(textStatus);
            callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         callback(new Error("Fallo en la extraccion del horario entre los dias"+fechLunes+" y "+fechDomingo+" del usuario "+IDUsuarioLogin+". Error: "+ errorThrown),null);
        }
    });
}
/*=================================FUNCIONES CARGA PANTALLAS=======================================*/
function cargarPantallaUsuario(IDUsuario,callback){
    //Extraemos los datos del usuario
    recuperarDatosUsuario(IDUsuario,function(err,cursos){
        if(err)
        {
            alert(err);
        }
        else
        {
            //Cargamos los datos extraidos
            cargarDatosUsuario(cursos,function(err){
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
    });
}