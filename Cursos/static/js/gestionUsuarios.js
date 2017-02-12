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
    //Iniciamos las fecha de los botones
    cambiaFechaBotones(new Date());
    //Cargamos el horario
    cargaHorario(new Date(),function(err){
        if (err)
        {
            callback(err);
        }
        else
        {
            
            callback(null);
        }
    });
}
//Elimina el contenido de los datos del usuario
function eliminarDatosUsuario(){
    $(".filaCursoUsuario").remove();
}
function recuperarDatosUsuario(IDUsuario,callback){
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
function cargaCursosPasados(cursos){
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
function cargaCursosProximos(cursos){
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
function cargaCursosActuales(cursos){
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
//Carga dela tabla del horario de la semana actual
function cargaHorario(fecha,callback)
{
    //Extraemos el rango de fecha a mostrar 
    calculaRangoFechas(fecha,function(fechLunes,fechDomingo){
        //Insertamos las fechas en el cuadro
        $("#fechaIniHorario").text(fechLunes.getDate()+"/"+fechLunes.getMonth()+"/"+fechLunes.getFullYear());
        $("#fechaFinHorario").text(fechDomingo.getDate()+"/"+fechDomingo.getMonth()+"/"+fechDomingo.getFullYear());
        //Extraemos los cursos del usuario en el rango de fechas

        //Primera fila de 00:00:00 a inicial del primer curso menos 1

        //Filas centrales

        //ultima fila de final ultimo curso a 24:00:00
        
        callback(null);
    }); 
}
/*======================FUNCIONES DEL FORM INSCRIPCION========================*/
//Rellena los combobox de la fecha en el formulario de inscripcion
function crearSelectFecha(){
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

/*===========================FUNCIONES AUXILIARES=============================*/
//Calcula el rango de fecha a mostrar en el horario
function calculaRangoFechas(fecha,callback)
{
    var fechDomingo;
    var fechLunes;
    var dia= fecha.getDay();
    var diaAux;
    if(dia===0)
    {   
        fechDomingo=fecha;
        fechLunes=new Date(fecha);
        fechLunes.setDate(fechLunes.getDate()-6);
    }
    else if(dia===1)
    {
        fechLunes=new Date(fecha);
        fecha.setDate(fecha.getDate()+6);
        fechDomingo=fecha;
    }
    else
    {
        diaAux=dia-1;
        fecha.setDate(fecha.getDate()-Number(diaAux));
        fechLunes=new Date(fecha);
        fecha.setDate(fecha.getDate()+6);
        fechDomingo=fecha;
    }
    callback(fechLunes,fechDomingo);
}
//Cambia la fecha de los botones de paginacion del horario dependiendo de la fecha pasada
function cambiaFechaBotones(fecha)
{
    var fechAnt=new Date();
    var fechSig=new Date();
    fechAnt.setDate(fecha.getDate()-7);
    fechSig.setDate(fecha.getDate()+7);
    fechAnt=fechAnt.getDate()+"/"+fechAnt.getMonth()+"/"+fechAnt.getFullYear();
    fechSig=fechSig.getDate()+"/"+fechSig.getMonth()+"/"+fechSig.getFullYear();
    //Se que no esta bien del todo pero el .data() no he consguido que funcionara no cambia los valores
    $("#botonSemanaAnt").attr("data-fech",fechAnt);
    $("#botonSemanaSig").attr("data-fech",fechSig);
}