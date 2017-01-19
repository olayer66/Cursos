/*
 * Funcion main:
    * Contiene la incializacion y las llamadas al DOM
    * Contiene las variables globales
 */
var divActivo;
$(document).ready(function() 
{
    console.log("DOM inicializado");
    //cabecera
    $("#buscarCurso").on("click",vistaBuscador());
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
                    llamadaExtraeCursos(busq,5,0,function(err,cursos){
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
    $("#unoAtras").on("click",function(){
        alert("cagada");
        var busq=$("#unoAtras").data("busq");
        var posInicio=$("#unoAtras").data("posInicio");
        cambiarValorAtraAlante(false);
        llamadaExtraeCursos(busq,5,posInicio,function(err,cursos)
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
    //Boton de paginacion de uno hacia alante
    $("#unoAlante").on("click",function (){
        var busq=$("#unoAlante").data("busq");
        var posInicio=$("#unoAlante").data("posInicio");
        cambiarValorAtraAlante(true);
        llamadaExtraeCursos(busq,5,posInicio,function(err,cursos)
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
});
/*==========================FUNC. DE VISTA============================*/
function vistaBuscador()
{
    if(divActivo!==undefined)
        divActivo.hide();
    divActivo=$("#buscador");
    $("#buscador").show();
    $("#buscar").show();
    $("#cargaCursos").hide();
    $("#paginacion").hide();
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
            "limite":"5",
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