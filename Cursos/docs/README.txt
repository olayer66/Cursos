ATENCION!!!
-----------
- Para cambiar entre el servidor HTPP y el HTTPS solo hay que comentar y descomentar uno u otro.
- Si se usa el servior de https la direccion cambia de http://localhost:3000 a https://localhost:5555/

====================================
CREAR CURSO (POST)
====================================
//localhost:3000/curso
-------------------------------------
{"titulo":"cocina Basica",
"descripcion":"Curso de cocina basica",
"localidad":"Madrid",
"direccion":"Calle Preciados 4",
"plazas":20,
"fechaInicio":"2017/01/09",
"fechaFin":"2017/02/01",
"horarios":[{"dia":"lunes",
            "horaInicio":"19:00:00",
            "horaFin":"20:00:00"},
            {"dia":"Miercoles",
            "horaInicio":"19:00:00",
            "horaFin":"20:00:00"},
            {"dia":"Viernes",
            "horaInicio":"18:00:00",
            "horaFin":"19:00:00"}]
}
{"titulo":"cocina avanzada",
"descripcion":"Curso de cocina para chefs caseros",
"localidad":"Madrid",
"direccion":"Calle Preciados 4",
"plazas":20,
"fechaInicio":"2017/03/15",
"fechaFin":"2017/05/20",
"horarios":[{"dia":"Martes",
            "horaInicio":"17:00:00",
            "horaFin":"19:00:00"},
            {"dia":"Jueves",
            "horaInicio":"19:00:00",
            "horaFin":"21:00:00"}]
}
{"titulo":"Ganchillo",
"descripcion":"Curso de ganchillo como el que hacia tu abuela",
"localidad":"Madrid",
"direccion":"Calle Preciados 4",
"plazas":20,
"fechaInicio":"2016/09/03",
"fechaFin":"2017/05/25",
"horarios":[{"dia":"Martes",
            "horaInicio":"10:00:00",
            "horaFin":"12:00:00"},
            {"dia":"Miercoles",
            "horaInicio":"10:00:00",
            "horaFin":"12:00:00"}]
}
{"titulo":"cocina para noobs",
"descripcion":"Si eres tan inutil que no eres capaz de encender el microondas este es tu curso",
"localidad":"Barcelona",
"direccion":"la rambla 123",
"plazas":50,
"fechaInicio":"2017/06/01",
"fechaFin":"2017/09/01",
"horarios":[{"dia":"Martes",
            "horaInicio":"10:00:00",
            "horaFin":"13:00:00"},
            {"dia":"Jueves",
            "horaInicio":"10:00:00",
            "horaFin":"13:00:00"}]
}
{"titulo":"como cocinar puerros",
"descripcion":"Curso monografico sobre formas de cocinar este gran vegetal",
"localidad":"Barcelona",
"direccion":"la rambla 123",
"plazas":50,
"fechaInicio":"2017/03/01",
"fechaFin":"2017/04/01",
"horarios":[{"dia":"Jueves",
            "horaInicio":"15:30:00",
            "horaFin":"16:00:00"}]
}
{"titulo":"cocina de aprovechamiento",
"descripcion":"Este curso provemiente de las misteriosas islas del pacifico nos muestra como los nativos aprovechan a los turistas despistados",
"localidad":"Valencia",
"direccion":"Calle carnaza 3",
"plazas":10,
"fechaInicio":"2017/10/01",
"fechaFin":"2017/11/13",
"horarios":[{"dia":"lunes",
            "horaInicio":"19:00:00",
            "horaFin":"20:00:00"},
            {"dia":"Miercoles",
            "horaInicio":"19:00:00",
            "horaFin":"20:00:00"},
            {"dia":"Viernes",
            "horaInicio":"18:00:00",
            "horaFin":"19:00:00"}]
}
{"titulo":"cocina con mama",
"descripcion":"Dirigido a treintañeros que aun viven con su madre podran aprender las tecnicas de cocina junto a su madre harta de tenerle en casa",
"localidad":"Bilbao",
"direccion":"calle euskera",
"plazas":100,
"fechaInicio":"2017/06/01",
"fechaFin":"2017/09/01",
"horarios":[{"dia":"Sabado",
            "horaInicio":"11:00:00",
            "horaFin":"13:00:00"},
            {"dia":"Domingo",
            "horaInicio":"11:00:00",
            "horaFin":"13:00:00"}]
}
{"titulo":"Mi programa de cocina mañanera",
"descripcion":"Programa de cocina diseñado para establecer el gran gusto por el arte culinario a aquellas personas que desean aprender del mejor",
"localidad":"Madrid",
"direccion":"calle tejera",
"plazas":100,
"fechaInicio":"2017/01/01",
"fechaFin":"2017/09/01",
"horarios":[{"dia":"Sabado",
            "horaInicio":"11:00:00",
            "horaFin":"13:00:00"},
            {"dia":"Domingo",
            "horaInicio":"11:00:00",
            "horaFin":"13:00:00"}]
}
===========================================
ACTUALIZAR CURSO (PUT)
===========================================
//localhost:3000/curso/:IDCurso
----------------------------------
IDCurso : El ID del curso que se quiere eliminar
----------------------------------
{"titulo":"cocina con mama 4",
"descripcion":"Dirigido a cuarentones que aun viven con su madre podran aprender las tecnicas de cocina junto a su madre harta de tenerle en casa",
"localidad":"Bilbao",
"direccion":"calle euskera",
"plazas":80,
"fechaInicio":"2017/06/01",
"fechaFin":"2017/09/01",
"horarios":[{"IDHorario":34,
            "dia":"Miercoles",
            "horaInicio":"18:00:00",
            "horaFin":"20:00:00"}]
}
===========================================
ELIMINAR CURSO (DELETE)
===========================================
//localhost:3000/curso/:IDCurso
-------------------------------------------
IDCurso : El ID del curso que se quiere eliminar
===========================================
AÑADIR/MODIFICAR IMAGEN DE UN CURSO (PUT)
===========================================
//localhost:3000/curso/imagen/:IDCurso
-------------------------------------------
IDCurso : El ID del curso que se quiere eliminar
El nombre de parametro en el que tiene que ir la imagen debe de ser "imagen"

BUSCAR LA INFO DE UN CURSO (GET)
===========================================
//localhost:3000/curso/busqueda/:IDCurso
-------------------------------------------
IDCurso : El ID del curso que se quiere eliminar
===========================================
