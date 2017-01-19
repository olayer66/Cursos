/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Carga en pantalla los cursos extraidos
function mostrarCursos(cursos)
{
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
    alert("tenemos paginacion");
}
/*==========================FUNCIONES AUXILIARES===========================*/
function extraerFecha(fecha)
{
    var date= new Date(fecha);
    var mes=date.getMonth()+1;
    return date.getDate()+"/"+mes+"/"+date.getFullYear();
}
function borrarTablaCursos()
{
    $(".filaCurso").remove();
}