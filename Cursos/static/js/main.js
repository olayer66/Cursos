/*
 * Funcion main:
    * Contiene la incializacion y las llamadas al DOM
    * Contiene las variables globales
 */
$(document).ready(function() {
        menuSinLog();
	console.log("DOM inicializado");
        //cabecera
        //Menu
        $("#buscarCurso").on("click",cargarBusqueda());
        //contenido

});


