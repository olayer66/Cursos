/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cargarBusqueda()
{
    //console.log("cargando busqueda");
    alert("hola");
}
//Carga en pantalla los cursos extraidos
function mostrarCursos()
{
    
}
//Carga en pantala los horarios del curso escogido
function mostrarHorarios(horarios)
{
    $(".tablaCursos").append("<tr>");
    $(".tablaCursos").append("<td>Curso</td>");
    $(".tablaCursos").append("<td>Lugar</td>");
    $(".tablaCursos").append("<td>Fecha Inicio</td>");
    $(".tablaCursos").append("<td>Fecha Fin</td>");
    $(".tablaCursos").append("<td>Vacantes</td>");
    $(".tablaCursos").append("</tr>");
    horarios.forEach(function(horario)
    {
        var vacantes=0;
        $(".tablaCursos").append("<tr>");
        $(".tablaCursos").append("<th>"+horario.Titulo+"</th>");
        $(".tablaCursos").append("<th>"+horario.Localidad+"</th>");
        $(".tablaCursos").append("<th>"+horario.F_Inicio+"</th>");
        $(".tablaCursos").append("<th>"+horario.F_Fin+"</th>");
        vacantes=horario.Plazas - horario.Plazas_Ocupadas;
        $(".tablaCursos").append("<th>"+vacantes+"</th>");
        $(".tablaCursos").append("</tr>");
    });
}