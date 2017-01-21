/*
 * Este modulo contiene las funciones se usuarios en jquery para el cliente
 */
/*======================FUNCIONES DE DATOS DEL USUARIO========================*/
//Carga los datos de cursos del usuario
function cargarDatosUsuario(IDUsuario)
{
    
}
//Inicia la sesion del usuario
function conectar(IDUsuario)
{
    
}
//Cierra la sesion del usuario
function desconectar()
{
    
}
/*======================FUNCIONES DEL FORM INSCRIPCION========================*/
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


