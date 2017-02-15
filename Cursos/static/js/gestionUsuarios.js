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
//Recupera los cursos del usuario pasado
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
    var lunes;
    var domingo;
    var fila;
    //Extraemos el rango de fecha a mostrar 
    calculaRangoFechas(fecha,function(fechLunes,fechDomingo){
        //Insertamos las fechas en el cuadro
        $("#fechaIniHorario").text(fechLunes.getDate()+"/"+fechLunes.getMonth()+"/"+fechLunes.getFullYear());
        $("#fechaFinHorario").text(fechDomingo.getDate()+"/"+fechDomingo.getMonth()+"/"+fechDomingo.getFullYear());
        //Extraemos los cursos del usuario en el rango de fechas
        lunes=fechLunes.getFullYear()+"-"+(fechLunes.getMonth()+1)+"-"+fechLunes.getDate();
        domingo=fechDomingo.getFullYear()+"-"+(fechDomingo.getMonth()+1)+"-"+fechDomingo.getDate();
        llamadaExtraerHorario(lunes,domingo,function(err,horarios){
            if(err)
            {
                callback(err);
            }
            else
            { 
                //Primera fila de 00:00:00 a inicial del primer curso menos 1
                insertaPrimeraFila(horarios[0].Hora_Inicio,function(fila){
                    $(".tablaHorario").append(fila);
                });
                //Filas centrales
                
                //ultima fila de final ultimo curso a 24:00:00

                callback(null);
            }
        });
    }); 
}
/*=============================FUNCIONES HORARIO==============================*/
//Carga dela tabla del horario de la semana actual
function cargaHorario(fecha,callback){
    var lunes;
    var domingo;
    var fila;
    //Extraemos el rango de fecha a mostrar 
    calculaRangoFechas(fecha,function(fechLunes,fechDomingo){
        //Insertamos las fechas en el cuadro
        $("#fechaIniHorario").text(fechLunes.getDate()+"/"+fechLunes.getMonth()+"/"+fechLunes.getFullYear());
        $("#fechaFinHorario").text(fechDomingo.getDate()+"/"+fechDomingo.getMonth()+"/"+fechDomingo.getFullYear());
        //Extraemos los cursos del usuario en el rango de fechas
        lunes=fechLunes.getFullYear()+"-"+(fechLunes.getMonth()+1)+"-"+fechLunes.getDate();
        domingo=fechDomingo.getFullYear()+"-"+(fechDomingo.getMonth()+1)+"-"+fechDomingo.getDate();
        llamadaExtraerHorario(lunes,domingo,function(err,horarios){
            if(err)
            {
                callback(err);
            }
            else
            { 
                //Transformamos las horas  a formato Date
                transformaHoras(horarios);
                //Primera fila de 00:00:00 a inicial del primer curso menos 1
                insertaPrimeraFila(horarios[0].Hora_Inicio,function(fila){
                    if(fila!==null)
                        $(".tablaHorario").append(fila);
                });
                //Filas centrales
                cargaFilasHorario(horarios);
                //ultima fila de final ultimo curso a 24:00:00
                insertaUltimaFila(horarios,function(fila){
                    if(fila!==null)
                        $(".tablaHorario").append(fila);
                });
                callback(null);
            }
        });
    }); 
}
//Carga en la tabla el horario
function cargaFilasHorario(horarios)
{
    var pos=0;
    var horaInicio;
    var horaFin;
    var celda;
    //Separamos los horarios que tengan mas de una hora seguida
    separarHorarios(horarios);
    //insertamos los horarios en las filas
    while(pos<horarios.length)
    {
        horaInicio=horarios[pos].Hora_Inicio;
        horaFin=horarios[pos].Hora_Fin;
        //creamos la fila (con ID indetificativo para cada celda[fila-dia])
        creaFila(horaInicio,horaFin,function(fila){
            if(fila!==null)
                $(".tablaHorario").append(fila);
        });
        //insertamos el titulo del elemento en la celda correspondiente por dia
        do
        {
            dia=horarios[pos].Dia.toLowerCase();
            switch (dia)
            {
                case "lunes":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_0";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "martes":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_1";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "miercoles":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_2";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "jueves":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_3";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "viernes":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_4";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "sabado":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_5";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
                case "domingo":
                    celda="#"+horarios[pos].Hora_Inicio.getHours()+"_6";
                    $(celda).addClass("celdaVerde");
                    $(celda).text($(celda).val()+horarios[pos].Titulo);
                    break;
            }
            pos++;         
        }
        while(pos<horarios.length && horarios[pos].Hora_Inicio.toLocaleTimeString()===horaInicio.toLocaleTimeString()) 
    }
}
//Crea una fila del horario
function creaFila(inicio,fin,callback){
    fila=$("<tr class='filaHorario'>");
        $(fila).append("<td>"+inicio.toLocaleTimeString()+" - "+fin.toLocaleTimeString()+"</td>");
        $(fila).append("<td id='"+inicio.getHours()+"_0'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_1'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_2'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_3'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_4'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_5'></td>");
        $(fila).append("<td id='"+inicio.getHours()+"_6'></td>");
        $(fila).append("</tr>");
        callback(fila);
}
//Inserta la primera fila de la tabla del horario
function insertaPrimeraFila(hora,callback){
    if(hora.toLocaleTimeString()>"00:00:00")
    {
        fila=$("<tr class='filaHorario'>");
        $(fila).append("<td>00:00:00 - "+hora.toLocaleTimeString()+"</td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("</tr>");
        callback(fila);
    }
    else
    {
        callback(null);
    }
}
//Inserta la ultima fila de la tabla del horario
function insertaUltimaFila(horarios,callback){
    var hora=horarios[horarios.length-1].Hora_Fin;
    if(hora.toLocaleTimeString()<"24.00.00")
    {
        var ultimaHora=horarios[0].Hora_Fin;
        horarios.forEach(function(horario){
            if(horario.Hora_Fin>ultimaHora)
                ultimaHora=horario.Hora_Fin;
        });
        fila=$("<tr class='filaHorario'>");
        $(fila).append("<td>"+ultimaHora.toLocaleTimeString()+" - 24:00:00</td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("<td></td>");
        $(fila).append("</tr>");
        callback(fila);
    }
    else
        callback(null);
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
function calculaRangoFechas(fecha,callback){
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
function cambiaFechaBotones(fecha){
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
//Suma 1  a la hora pasada
function sumaHora(hora,callback){
    var aux=hora.split(":");
    var cambioHora=new Date();
    cambioHora.setHours(aux[0],aux[1],aux[2]);
    cambioHora.setHours(cambioHora.getHours() + 1);
    callback(cambioHora.getHours()+":"+cambioHora.getMinutes()+":"+cambioHora.getSeconds());
}
//Transforma las hora a formato date
function transformaHoras(horarios){
    var aux;
    horarios.forEach(function(horario){
        var hIni=new Date();
        var hFin=new Date();
        aux=horario.Hora_Inicio.split(":");
        hIni.setHours(aux[0],aux[1],aux[2]);
        horario.Hora_Inicio=hIni;
        aux=horario.Hora_Fin.split(":");
        hFin.setHours(aux[0],aux[1],aux[2]);
        horario.Hora_Fin=hFin;
    });
}
//Divide los horarios que sean de dos o mas horas
function separarHorarios(horarios){
    var timeDiff;
    var diffDays;
    horarios.forEach(function(horario){
        
        timeDiff = Math.abs(horario.Hora_Fin.getTime() - horario.Hora_Inicio.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600));
        while(diffDays>1)
        {  
            var auxHora= new Date(horario.Hora_Fin);
            var auxFin= new Date(horario.Hora_Fin);
            auxHora.setHours(auxHora.getHours()-1);
            var nuevoHorario={
            Titulo: horario.Titulo,
            Dia: horario.Dia,
            Hora_Inicio:auxHora,
            Hora_Fin:auxFin
            };
            horarios.push(nuevoHorario);
            horario.Hora_Fin.setHours(horario.Hora_Fin.getHours()-1);
            timeDiff = Math.abs(horario.Hora_Fin.getTime() - horario.Hora_Inicio.getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600));
        }
        //console.log(horario.Titulo+"|"+horario.Dia+"|"+horario.Hora_Inicio+"|"+horario.Hora_Fin);
    });
    //ordenamos el array en funcion de la hora de inicio del curso
    horarios.sort(function (a,b){
        if (a.Hora_Inicio < b.Hora_Inicio)
            return -1;
        if (a.Hora_Inicio > b.Hora_Inicio)
            return 1;
        return 0;
    });
    horarios.forEach(function(horario){
                console.log(horario.Titulo+"|"+horario.Dia+"|"+horario.Hora_Inicio+"|"+horario.Hora_Fin);
            });
    console.log("TOTAL: " +horarios.length);
}