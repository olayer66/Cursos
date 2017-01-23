/*
 * Este modulo contiene las funciones se usuarios en jquery para el usuario
 */
/*==========================FUNCIONES DE DATOS=============================*/
//Inicia la sesion del usuario
function cargarDatosUsuario(cursos,callback)
{
    //Eliminamos posibles resultados anteriores
    eliminarDatosUsuario();
    //Cargamos los cursos actuales
    cargaCursosActuales(cursos.cursosActuales);
    //cargamos cursos pasados
    cargaCursosPasados(cursos.cursosPasados);
    //cargamos cursos proximos
    cargaCursosProximos(cursos.cursosProximos);
    //Cargamos el horario(cursos.cursosActuales)(parte 4)
    callback(null);
}
//Elimina el contenido de los datos del usuario
function eliminarDatosUsuario()
{
    $(".filaCursoUsuario").remove();
}
function recuperarDatosUsuario(IDUsuario,callback)
{
    //Recuperamos los cursos
    llamadaCursosUsuario(IDUsuario,function(err,cursos){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            callback(null,cursos);
        }
    });
}
/*========================FUNCIONES CARGA DE CURSOS===========================*/
//Carga en la vista los cursos pasados del usuario
function cargaCursosPasados(cursos)
{
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        var fila = $("<tr class='filaCursoUsuario' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<td >"+curso.Titulo+"</td>");
        $(fila).append("<td>"+curso.Localidad+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Fin)+"</td>");
        $(fila).append("</tr>");
        $("#tablaCursosPasados").append(fila);
    });
}
//Carga en la vista los cursos proximos del usuario
function cargaCursosProximos(cursos)
{
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        var fila = $("<tr class='filaCursoUsuario' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<td >"+curso.Titulo+"</td>");
        $(fila).append("<td>"+curso.Localidad+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Fin)+"</td>");
        $(fila).append("</tr>");
        $("#tablaCursosProximos").append(fila);
    });
}
//Carga los cursos que se estan realizando en el momento
function cargaCursosActuales(cursos)
{
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        var fila = $("<tr class='filaCursoUsuario' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<td >"+curso.Titulo+"</td>");
        $(fila).append("<td>"+curso.Localidad+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Fin)+"</td>");
        $(fila).append("</tr>");
        $("#tablaCursosPasados").append(fila);
    });
}
/*======================FUNCIONES DEL FORM INSCRIPCION========================*/
//Rellena los combobox de la fecha en el formulario de inscripcion
function crearSelectFecha()
{
    //dias
    for (var i=1;i<=31;i++)
    {
        $("#usuarioDia").append("<option value='"+i+"' class='borrarSelect'>"+i+"</option>");
    }
    //meses
    for (var i=1;i<=12;i++)
    {
        $("#usuarioMes").append("<option value='"+i+"' class='borrarSelect'>"+i+"</option>");
    }
    //años
    for (var i=1900;i<=new Date().getFullYear();i++)
    {
        $("#usuarioAnio").append("<option value='"+i+"' class='borrarSelect'>"+i+"</option>");
    }
}


