
//Carga en pantalla los cursos extraidos
function mostrarCursos(cursos)
{
    //INFORMACION: poner que dependiendo de la fecha de final se ponga de un color u otro
    borrarTablaCursos();
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        var fila = $("<tr class='filaCurso' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<td class='dataCurso' data-idcurso='"+curso.ID_Curso+"'>"+curso.Titulo+"</td>");
        $(fila).append("<td class='dataCurso' data-idcurso='"+curso.ID_Curso+"'>"+curso.Localidad+"</td>");
        $(fila).append("<td class='center dataCurso' data-idcurso='"+curso.ID_Curso+"'>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td class='center dataCurso' data-idcurso='"+curso.ID_Curso+"'>"+extraerFecha(curso.F_Fin)+"</td>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<td class='center dataCurso' data-idcurso='"+curso.ID_Curso+"'>"+vacantes+"</td>");
        $(fila).append("</tr>");
        $("#tablaCursos").append(fila);
    });
}
//inserta tantos botones de paginas como sea necesario
function insertarPaginacion(total,busq)
{
    var numPags= Math.ceil(total/5);
    $("#paginacion").append("<div class='botonMini' id='unoAtras' data-posinicio='"+0+"' data-numpags='"+numPags+"' data-busq='"+busq+"'> << </div>");
    for(var i=1;i<=numPags;i++)
    {
        var posInicio=(i-1)*5;
        $("#paginacion").append("<div class='botonMini botonPagina' data-posinicio='"+posInicio+"' data-busq='"+busq+"'  data-numpags='"+numPags+"'>"+i+"</div>");
    }
    $("#paginacion").append("<div class='botonMini' id='unoAlante' data-posinicio='"+5+"' data-numpags='"+numPags+"' data-busq='"+busq+"'> >> </div>");
}
//Quitar los botones de paginacion
function quitarPaginacion()
{
    $("#unoAtras").remove();
    $("#unoAlante").remove();
    $(".botonPagina").remove();
}

//Muestra la informacion del curso seleccionado en la tabla de cursos--------------------------------------------------------------------------------------------
function mostrarInformacionCurso(curso, horarioCurso,imagen)
{
    borrarTablaDetalle();
    $("#tituloDetalle").text(curso.Titulo);
    var fila = $("<tr class='filaDetalle'>");
            $(fila).append("<td class='cabeceraDetalle'>"+curso.Descripcion+"</td>");
            if(imagen!==null)
            {
                var carga= "data:image/jpg;base64," + imagen;
                $(fila).append("<td><img id='imagenDetalle' src='"+carga+"' /></td>");
            }
    $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");
        $(fila).append("<td class='cabeceraDetalle'><h3>Direccion:</h3>"+curso.Direccion+"</td>");
    $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");
        $(fila).append("<td class='cabeceraDetalle'><h3>Ciudad:</h3> "+curso.Localidad+"</td>");
    $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");
        $(fila).append("<td class='cabeceraDetalle'><h3>Duracion:</h3> Desde el "+extraerFecha(curso.F_Inicio)+" hasta el "+extraerFecha(curso.F_Fin)+"</td>");
    $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");
        $(fila).append("<td class='cabeceraDetalle'><h3>Horario:</h3></td>");
    $(fila).append("</tr class='filaDetalle'>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");  
            horarioCurso.forEach(function(horario)
            {
                 $(fila).append("<span>"+horario.Dia + ": " +horario.Hora_Inicio + " - " +horario.Hora_Fin +"</span><br>");
            });
        $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
    var fila = $("<tr class='filaDetalle'>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<td class='cabeceraDetalle'><h3>Numero de plazas: </h3>"+curso.Plazas+" ("+vacantes+" vacantes)</td>");  
    $(fila).append("</tr>");
    $("#tablaDetalle").append(fila);
}
//Inserta el boton de inscribirse en el caso de que el usuario este logeado
function insertarBotonLogin(IDCurso)
{
    $("#botonDetalle").append("<div class='boton' id='botonInscribirse' data-idcurso='"+IDCurso+"'>Inscribirse</div>");
}
/*==========================FUNCIONES AUXILIARES===========================*/
//Extrae la fechea de una variable
function extraerFecha(fecha)
{
    var date= new Date(fecha);
    var mes=date.getMonth()+1;
    return date.getDate()+"/"+mes+"/"+date.getFullYear();
}
//borra las filas de la tabla de busqueda de cursos
function borrarTablaCursos()
{
    $(".filaCurso").remove();
}
//borra las filas de la tabla de detalle del curso y la cabecera
function borrarTablaDetalle()
{
    $(".cabeceraDetalle").remove();
    $(".filaDetalle").remove();
    $("#botoninscribirse").remove();
}
//Cambia los valores de los botones de atras y alante con respecto a la posicion(pagina) donde estemos
function cambiarValoresPaginacion(total,posicion,limite)
{
    var alante=$("#unoAlante");
    var atras=$("#unoAtras");
    if(posicion<total)
    {
        alante.data("posinicio",posicion+limite);
    }
    if(posicion>0)
    {
        atras.data("posinicio",posicion-limite);
    }
}
