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
function mostrarCursos(horarios)
{
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