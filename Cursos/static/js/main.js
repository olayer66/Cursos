/*
 * Funcion main:
    * Contiene la incializacion y las llamadas al DOM
    * Contiene las variables globales
 */
var divActivo;
$(document).ready(function() 
{
    console.log("DOM inicializado");
    //Ocultamos todos los div
    ocultarDiv();
    //cabecera
    $("#buscarCurso").on("click",function(){
        if(divActivo!==undefined)
            divActivo.hide();
        divActivo=$("#buscador");
        divActivo.show();
    });
    //contenido
    $("#botonBuscarCurso").on("click",function(){
        var param=$("#buscarTitulo").val();
        $.ajax({
            type: "GET",
            url:"/curso",
            data:{
                "busq":param,
                "limite":"5",
                "posInicio":"0"
            },
            success:function (data, textStatus, jqXHR) 
            {
            console.log(textStatus);
            if(divActivo!==undefined)
                divActivo.hide();
            divActivo=$("#cargaCursos");
            divActivo.show();
            mostrarCursos(data);
            },
            error:function (jqXHR, textStatus, errorThrown) 
            {
             alert("Se ha producido un error: " + errorThrown);
            }
        });
    });
});
function ocultarDiv()
{
    $("#cargaCursos").hide();
}