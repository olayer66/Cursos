/*
 * Funcion main:
    * La incializacion y las llamadas al servidor
    * Las variables globales
    * Las funciones de muestra y ocultacion de las direfentes ventanas
 */
var divActivo;
var limite=5;
$(document).ready(function() 
{
    console.log("DOM inicializado");
    //Carga de vista inicial
    vistaInicial();
    //cabecera
    $("#registrarse").on("click",function(){
        vistaNuevoUsuario();
    });
    $("#logearse").on("click",function(){
        vistaLoginUsuario();
    });
    //Menu
    $("#buscarCurso").on("click",function(){
        vistaBuscador();
    });
    //contenido
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
                alert("paso 6");
                alert(err);
            }
            else
            {
                alert("paso 7");
                alert(login.permitido +": "+ login.IDUsuario);  
            }
        });
    });
});
/*==========================FUNC. DE VISTA============================*/
//Carga la vista inicial
function vistaInicial()
{
    divActivo=$("#buscador");
    vistaBuscador();
    $("#menuConSesion").hide();
    $("#insertarUsuario").hide();
    $("#loginConectado").hide();
    $("#usuarioConectado").hide();
    $("#loginUsuario").hide();
    $("#datosUsuario").hide();
    
}
//Muestra la ventana de buscador
function vistaBuscador()
{
    divActivo.hide();
    divActivo=$("#buscador");
    divActivo.show();
    $("#buscar").show();
    $("#cargaCursos").hide();
    $("#paginacion").hide();
}
//Muestra la ventana de nuevo usuario
function vistaNuevoUsuario()
{
    divActivo.hide();
    divActivo=$("#insertarUsuario");
    $(".borrarSelect").remove();
    crearSelectFecha();
    divActivo.show();
    $("#insercionUsuario").show();
    $("#insercionUsuarioCorrecta").hide();
}
//Muestra la ventana de logeo
function vistaLoginUsuario()
{
    divActivo.hide();
    divActivo=$("#loginUsuario");
    divActivo.show();
}
function vistaDatosUsuario()
{
    divActivo.hide();
    divActivo=$("#datosUsuario");
    divActivo.show();
}
/*===========================FUNC. DE LLAMADA==========================*/
function llamadaTotalCursos(busq,callback)
{
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
function llamadaExtraeCursos(busq,limite,posInicio,callback)
{
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
//Inserta un nuevo usuario en la BBDD
function llamadaInsertarUsuario(callback)
{
    alert($("#usuarioAnio").val()+"/"+$("#usuarioMes").val()+"/"+$("#usuarioDia").val())
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
function llamadaLoginUsuario(callback)
{
    var user =$("#loginCorreo").val();
    var pass =$("#loginContra").val();
    alert("paso 1");
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
        alert("paso 2");
        console.log(textStatus);
        callback(null,data);
        },
        error:function (jqXHR, textStatus, errorThrown) 
        {
         alert("paso 3");
         callback(new Error("Fallo en en el login. Error: "+ errorThrown),null);
        }
    });
}