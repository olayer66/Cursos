SELECT distinct cursos.titulo, horarios.* FROM cursos.cursos,cursos.horarios WHERE cursos.ID_Curso=horarios.ID_Curso ORDER BY Titulo ASC;