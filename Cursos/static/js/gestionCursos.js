/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Carga en pantalla los cursos extraidos
function mostrarCursos(cursos)
{
    //INFORMACION: poner que dependiendo de la fecha de final se ponga de un color u otro
    borrarTablaCursos();
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        var fila = $("<tr class='filaCurso'>");
        $(fila).append("<td >"+curso.Titulo+"</td>");
        $(fila).append("<td>"+curso.Localidad+"</td>");
        $(fila).append("<td>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td>"+extraerFecha(curso.F_Fin)+"</td>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<td>"+vacantes+"</td>");
        $(fila).append("</tr>");
        $(".tablaCursos").append(fila);
    });
}
//inserta tantos botones de paginas como sea necesario
function insertarPaginacion(total)
{
    var numPags= Math.ceil(total/5);
    alert(total+"|||"+numPags);
    $("#menuPaginacion").append("<li class='botonMini' id='unoAtras'> << </li>");
    for(var i=1;i<=numPags;i++)
    {
        var posInicio=(i-1)*5;
        $("#menuPaginacion").append("<li class='botonMini' id='botonPagina' data-posInicio='"+posInicio+"'>"+i+"</li>");
    }
    $("#menuPaginacion").append("<li class='botonMini' id='unoAlante'> >> </li>");
}
/*==========================FUNCIONES AUXILIARES===========================*/
//Extrae la fechea de una variable
function extraerFecha(fecha)
{
    var date= new Date(fecha);
    var mes=date.getMonth()+1;
    return date.getDate()+"/"+mes+"/"+date.getFullYear();
}
//borra los filas de la tabla de busyqeda de cursos
function borrarTablaCursos()
{
    $(".filaCurso").remove();
}