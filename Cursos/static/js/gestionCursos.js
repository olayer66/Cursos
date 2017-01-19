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
function mostrarCursos(cursos)
{
    cursos.forEach(function(curso)
    {
        var vacantes=0;
        $(".tablaCursos").append("<tr>");
        $(".tablaCursos").append("<th>"+curso.Titulo+"</th>");
        $(".tablaCursos").append("<th>"+curso.Localidad+"</th>");
        $(".tablaCursos").append("<th>"+curso.F_Inicio+"</th>");
        $(".tablaCursos").append("<th>"+curso.F_Fin+"</th>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(".tablaCursos").append("<th>"+vacantes+"</th>");
        $(".tablaCursos").append("</tr>");
    });
}
//inserta tantos botones de paginas como sea necesario
function insertarPaginacion(total)
{
    
}