/*
 * Funcion main:
    * Contiene la incializacion y las llamadas al DOM
    * Contiene las variables globales
 */
$(document).ready(function() {
	console.log("DOM inicializado");
        //cabecera
        //Menu
        //$("#buscarCurso").on("click",cargarBusqueda());
        //contenido
        $("#botonBuscarCurso").on("click",function(){
            var param=$("#buscarTitulo").val();
            $.ajax({
                type: "GET",
                url:"/curso/" + param,
                succes:function (data, textStatus, jqXHR) {
                console.log(textStatus);
                mostrarCursos(data);
                },
                error:function (jqXHR, textStatus, errorThrown) {
                 alert("Se ha producido un error: " + errorThrown);
                }
            });
        });
});


