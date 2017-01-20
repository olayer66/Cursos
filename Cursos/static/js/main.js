/*
 * Funcion main:
    * Contiene la incializacion y las llamadas al DOM
    * Contiene las variables globales
 */
var divActivo;
var limite=5;
$(document).ready(function() 
{
    vistaBuscador();
    console.log("DOM inicializado");
    //cabecera
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
    $("#paginacion").on("click",".botonPagina",function (event)
    {    
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