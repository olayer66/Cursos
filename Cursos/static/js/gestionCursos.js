
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
function mostrarInformacionCurso(curso, horarioCurso)
{
    $("#infoCurso").remove();
    $("#resultado").show();

    var fila = $("<div id='infoCurso' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<h2>"+curso.Titulo+"</h2>");
        $(fila).append("<p>"+curso.Descripcion+"</p>");
        
        $(fila).append("<h3>Lugar de imparticion:</h3>");
        $(fila).append("<p>"+curso.Direccion+"</p>");
        
         (fila).append("<h3>Ciudad:</h3>");
        $(fila).append("<p>"+curso.Localidad+"</p>");
        
        $(fila).append("<h3>Duracion:</h3>");
        $(fila).append("<p>Desde el "+extraerFecha(curso.F_Inicio)+" hasta el "+extraerFecha(curso.F_Fin)+"</p>");
        
        $(fila).append("<h3>Horario:</h3>");
        
        $(fila).append("<ul>");
        horarioCurso.forEach(function(horario)
        {
             $(fila).append("<li>"+horario.Dia + ": " +horario.Hora_Inicio + " - " +horario.Hora_Fin +"</li>");
        });
        $(fila).append("</ul>");
        
        $(fila).append("<h3>Numero de plazas:</h3>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<p>"+curso.Plazas+" ("+vacantes+" vacantes)</td>");
        
        $(fila).append("<div id='botonInscribirse' class='botonMini botoninscribirse' data-idcurso='"+curso.ID_Curso+"'>Inscribirse</div>");
       
    $("#resultado").append(fila);
}

/*==========================FUNCIONES AUXILIARES===========================*/
//Extrae la fechea de una variable
function extraerFecha(fecha)
{
    var date= new Date(fecha);
    var mes=date.getMonth()+1;
    return date.getDate()+"/"+mes+"/"+date.getFullYear();
}
//borra los filas de la tabla de busqueda de cursos
function borrarTablaCursos()
{
    $(".filaCurso").remove();
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