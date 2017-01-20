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
        var fila = $("<tr class='filaCurso' data-idcurso='"+curso.ID_Curso+"'>");
        $(fila).append("<td >"+curso.Titulo+"</td>");
        $(fila).append("<td>"+curso.Localidad+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Inicio)+"</td>");
        $(fila).append("<td class='center'>"+extraerFecha(curso.F_Fin)+"</td>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<td class='center'>"+vacantes+"</td>");
        $(fila).append("</tr>");
        $(".tablaCursos").append(fila);
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