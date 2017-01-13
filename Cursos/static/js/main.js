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
        $("botonBuscarCurso").on("click",function(event){
            alert("Busqueda iniciada");
            event.stopPropagation();
        });
});


