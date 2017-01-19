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
        var fila = $("<tr>");
        $(fila).append("<th>"+curso.Titulo+"</th>");
        $(fila).append("<th>"+curso.Localidad+"</th>");
        $(fila).append("<th>"+extraerFecha(curso.F_Inicio)+"</th>");
        $(fila).append("<th>"+extraerFecha(curso.F_Fin)+"</th>");
        vacantes=curso.Plazas - curso.Plazas_Ocupadas;
        $(fila).append("<th>"+vacantes+"</th>");
        $(fila).append("</tr>");
        $(".tablaCursos").append(fila);
    });
}
//inserta tantos botones de paginas como sea necesario
function insertarPaginacion(total)
{
    
}
/*==========================FUNCIONES AUXILIARES===========================*/
function extraerFecha(fecha)
{
    var date= new Date(fecha);
    var mes=date.getMonth()+1;
    return date.getDate()+"/"+mes+"/"+date.getFullYear();
}