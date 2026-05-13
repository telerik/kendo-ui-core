(function($, undefined) {

  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
        "apply": "Aplicar",
        "cancel": "Cancelar"
      });
  }

  /* ColorPicker messages */

  if (kendo.ui.ColorPicker) {
    kendo.ui.ColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
        "apply": "Aplicar",
        "cancel": "Cancelar"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "sortAscending": "Orden ascendente",
        "sortDescending": "Orden descendente",
        "filter": "Filtros",
        "clear": "Limpiar",
        "clearAllFilters": "Limpiar todos los filtros",
        "columns": "Columnas",
        "column": "Columna",
        "columnVisibility": "Visibilidad de columna",
        "done": "Hecho",
        "settings": "Configuración de columnas",
        "lock": "Bloquear",
        "unlock": "Desbloquear",
        "stick": "Fijar columna",
        "unstick": "Desfijar columna",
        "setColumnPosition": "Establecer posición de columna",
        "cancel": "Cancelar",
        "apply": "Aplicar",
        "reset": "Reiniciar",
        "buttonTitle": "{0} editar configuración de columna",
        "movePrev": "Mover anterior",
        "moveNext": "Mover siguiente",
        "groupColumn": "Agrupar columna",
        "ungroupColumn": "Desagrupar columna"
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "bold": "Negrita",
        "italic": "Itálica",
        "underline": "Subrayado",
        "strikethrough": "Tachado",
        "superscript": "Superíndice",
        "subscript": "Subíndice",
        "justifyCenter": "Texto centrado",
        "justifyLeft": "Alinear texto a la izquierda",
        "justifyRight": "Alinear texto a la derecha",
        "justifyFull": "Justificar",
        "insertUnorderedList": "Insertar lista desordenada",
        "insertOrderedList": "Insertar lista ordenada",
        "indent": "Poner sangría",
        "outdent": "Quitar sangría",
        "createLink": "Insert enlace",
        "unlink": "Eliminar enlace",
        "insertImage": "Insertar imagen",
        "insertFile": "Insertar fichero",
        "insertHtml": "Insertar HTML",
        "viewHtml": "Ver HTML",
        "fontName": "Seleccionar familia de fuentes",
        "fontNameInherit": "(fuente heredada)",
        "fontSize": "Seleccionar tamaño de fuente",
        "fontSizeInherit": "(tamaño heredado)",
        "formatBlock": "Formato",
        "formatting": "Formato",
        "foreColor": "Color",
        "backColor": "Color de fondo",
        "style": "Estilos",
        "emptyFolder": "Carpeta vacía",
        "uploadFile": "Subir",
        "orderBy": "Ordenados por:",
        "orderBySize": "Tamaño",
        "orderByName": "Nombre",
        "invalidFileType": "El fichero seleccionado \"{0}\" no es válido. Los tipos de ficheros soportados son {1}.",
        "deleteFile": "¿Está seguro que quiere eliminar \"{0}\"?",
        "overwriteFile": "Un fichero con el nombre \"{0}\" ya existe en el directorio actual. ¿Desea reemplazarlo?",
        "directoryNotFound": "Un directorio con este nombre no fue encontrado.",
        "imageWebAddress": "Dirección Web",
        "imageAltText": "Texto alternativo",
        "imageWidth": "Ancho (px)",
        "imageHeight": "Alto (px)",
        "fileWebAddress": "Dirección Web",
        "fileTitle": "Título",
        "linkWebAddress": "Dirección Web",
        "linkText": "Texto",
        "linkToolTip": "ToolTip",
        "linkOpenInNewWindow": "Abrir enlace en nueva ventana",
        "dialogUpdate": "Actualizar",
        "dialogInsert": "Insertar",
        "dialogButtonSeparator": "o",
        "dialogCancel": "Cancelar",
        "dialogOk": "Confirmar",
        "createTable": "Crear tabla",
        "createTableHint": "Crear una tabla de {0} x {1}",
        "addColumnLeft": "Agregar columna a la izquierda",
        "addColumnRight": "Agregar columna a la derecha",
        "addRowAbove": "Agregar fila arriba",
        "addRowBelow": "Agregar fila abajo",
        "deleteRow": "Borrar fila",
        "deleteColumn": "Borrar columna",
        "auto": "Auto",
        "search": "Buscar",
        "dropFilesHere": "Arrastre los archivos aquí.",
        "overflowAnchor": "Más herramientas",
        "cleanFormatting": "Limpiar formato",
        "tableBackground": "Fondo de tabla",
        "tableCellProperties": "Propiedades de celda",
        "tableProperties": "Propiedades de tabla",
        "tableWizard": "Asistente de tabla",
        "tableTab": "General",
        "cellTab": "Celda",
        "accessibilityTab": "Avanzado",
        "caption": "Título",
        "captionAlignment": "Alineación del título",
        "summary": "Resumen",
        "width": "Ancho",
        "height": "Alto",
        "units": "Unidades",
        "cellSpacing": "Espacio entre celdas",
        "cellPadding": "Relleno de celda",
        "cellMargin": "Margen de celda",
        "alignment": "Alineación",
        "background": "Fondo",
        "cssClass": "Clase CSS",
        "id": "ID",
        "border": "Borde",
        "borderColor": "Color de borde",
        "borderWidth": "Ancho de borde",
        "borderStyle": "Estilo de borde",
        "collapseBorders": "Colapsar bordes",
        "wrapText": "Ajustar texto",
        "fitToCell": "Ajustar a celda",
        "associateCellsWithHeaders": "Asociar encabezados",
        "alignLeft": "Alinear a la izquierda",
        "alignCenter": "Alinear al centro",
        "alignRight": "Alinear a la derecha",
        "alignLeftTop": "Alinear izquierda arriba",
        "alignCenterTop": "Alinear centro arriba",
        "alignRightTop": "Alinear derecha arriba",
        "alignLeftMiddle": "Alinear izquierda medio",
        "alignCenterMiddle": "Alinear centro medio",
        "alignRightMiddle": "Alinear derecha medio",
        "alignLeftBottom": "Alinear izquierda abajo",
        "alignCenterBottom": "Alinear centro abajo",
        "alignRightBottom": "Alinear derecha abajo",
        "alignRemove": "Quitar alineación",
        "columns": "Columnas",
        "rows": "Filas",
        "selectAllCells": "Aplicar a todas las celdas",
        "applyToColumn": "aplicar a columna",
        "applyToRow": "aplicar a fila",
        "print": "Imprimir",
        "headerRows": "Filas de encabezado",
        "headerColumns": "Columnas de encabezado",
        "tableSummaryPlaceholder": "El atributo resumen no es compatible con HTML5.",
        "associateNone": "Ninguno",
        "associateScope": "Asociar usando atributo 'scope'",
        "associateIds": "Asociar usando IDs",
        "copyFormat": "Copiar formato",
        "applyFormat": "Aplicar formato",
        "borderNone": "Ninguno",
        "undo": "Deshacer",
        "redo": "Rehacer"
      });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
        "uploadFile": "Subir fichero",
        "orderBy": "Ordenar por",
        "orderByName": "Nombre",
        "orderBySize": "Tamaño",
        "directoryNotFound": "Un directorio con este nombre no fue encontrado.",
        "emptyFolder": "Carpeta vacía",
        "deleteFile": "¿Está seguro que quiere eliminar \"{0}\"?",
        "invalidFileType": "El fichero seleccionado \"{0}\" no es válido. Los tipos de ficheros soportados son {1}.",
        "overwriteFile": "Un fichero con el nombre \"{0}\" ya existe en el directorio actual. ¿Desea reemplazarlo?",
        "dropFilesHere": "arrastre un fichero aquí para subir",
        "search": "Buscar"
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "isTrue": "Sí",
        "isFalse": "No",
        "filter": "Filtrar",
        "clear": "Limpiar filtro",
        "operator": "Operador"
      });
  }

  /* FilterCell operators */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "startswith": "Comienza con",
          "contains": "Contiene",
          "doesnotcontain": "No contiene",
          "endswith": "Termina en",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo",
          "isempty": "Está vacío",
          "isnotempty": "No está vacío",
          "isnullorempty": "No tiene valor",
          "isnotnullorempty": "Tiene valor"
        },
        "number": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "gte": "Es mayor o igual que",
          "gt": "Es mayor que",
          "lte": "Es menor o igual que",
          "lt": "Es menor que",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        },
        "date": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "gte": "Es posterior o igual a",
          "gt": "Es posterior",
          "lte": "Es anterior o igual a",
          "lt": "Es anterior",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        },
        "enums": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        }
      });
  }

  /* FilterMenu messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "info": "Mostrar filas con valor que:",
        "title": "Mostrar filas con valor que",
        "isTrue": "Sí",
        "isFalse": "No",
        "filter": "Filtrar",
        "clear": "Limpiar filtros",
        "and": "Y",
        "or": "O",
        "selectValue": "-Seleccionar valor -",
        "operator": "Operador",
        "value": "Valor",
        "cancel": "Cancelar",
        "done": "Hecho",
        "into": "en",
        "buttonTitle": "{0} configuración de filtro de columna",
        "logic": "Lógica de filtros",
        "additionalOperator": "Operador adicional",
        "additionalValue": "Valor adicional"
      });
  }

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "string": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "startswith": "Comienza con",
          "contains": "Contiene",
          "doesnotcontain": "No contiene",
          "endswith": "Termina en",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo",
          "isempty": "Está vacío",
          "isnotempty": "No está vacío",
          "isnullorempty": "No tiene valor",
          "isnotnullorempty": "Tiene valor"
        },
        "number": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "gte": "Es mayor o igual que",
          "gt": "Es mayor que",
          "lte": "Es menor o igual que",
          "lt": "Es menor que",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        },
        "date": {
          "eq": "Es igual a",
          "neq": "Es diferente a",
          "gte": "Es posterior o igual a",
          "gt": "Es posterior",
          "lte": "Es anterior o igual a",
          "lt": "Es anterior",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        },
        "enums": {
          "eq": "Es igual a",
          "neq": "No es igual a",
          "isnull": "Es nulo",
          "isnotnull": "No es nulo"
        }
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Seleccionar todo",
        "clearAll": "Limpiar todo",
        "clear": "Limpiar filtros",
        "filter": "Filtrar",
        "search": "Buscar",
        "cancel": "Cancelar",
        "done": "Hecho",
        "into": "en",
        "selectedItemsFormat": "{0} articulos seleccionados"
      });
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Agregar sub-tarea",
          "append": "Agregar tarea",
          "insertAfter": "Insertar abajo",
          "insertBefore": "Insertar arriba",
          "pdf": "Exportar a PDF"
        },
        "cancel": "Cancelar",
        "deleteDependencyWindowTitle": "Borrar dependencia",
        "deleteTaskWindowTitle": "Borrar tarea",
        "destroy": "Borrar",
        "editor": {
          "assingButton": "Asignar",
          "editorTitle": "Tarea",
          "end": "Fin",
          "plannedStart": "Inicio planificado",
          "plannedEnd": "Fin planificado",
          "percentComplete": "Completa",
          "percentCompleteHint": "valor de 0 a 1",
          "resources": "Recursos",
          "resourcesEditorTitle": "Recursos",
          "resourcesHeader": "Recursos",
          "start": "Comienzo",
          "title": "Título",
          "unitsHeader": "Unidades",
          "parent": "Superior",
          "addNew": "Agregar",
          "name": "Nombre",
          "remove": "Eliminar",
          "actualStart": "Inicio real",
          "actualEnd": "Fin real",
          "parentOptionLabel": "-Ninguno-",
          "general": "General",
          "predecessors": "Predecesores",
          "successors": "Sucesores",
          "other": "Otro",
          "dependencyType": "Tipo"
        },
        "save": "Guardar",
        "selectView": "Seleccionar vista",
        "plannedTasks": {
          "switchText": "Tareas planificadas",
          "offsetTooltipAdvanced": "Cumplió la fecha límite antes",
          "offsetTooltipDelay": "Retraso",
          "seconds": "segundos",
          "minutes": "minutos",
          "hours": "horas",
          "days": "días"
        },
        "views": {
          "day": "Día",
          "end": "Fin",
          "month": "Mes",
          "start": "Comienzo",
          "week": "Semana",
          "year": "Año"
        }
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "cancel": "Cancelar Cambios",
          "canceledit": "Cancelar",
          "create": "Agregar",
          "destroy": "Eliminar",
          "edit": "Editar",
          "excel": "Exportar a Excel",
          "pdf": "Exportar a PDF",
          "save": "Guardar Cambios",
          "select": "Seleccionar",
          "update": "Actualizar",
          "columns": "Columnas",
          "search": "Buscar...",
          "selectRow": "Seleccionar fila",
          "selectAllRows": "Todas las filas",
          "clearSelection": "Limpiar selección",
          "copySelection": "Copiar selección",
          "copySelectionNoHeaders": "Copiar selección (sin encabezados)",
          "reorderRow": "Reordenar fila",
          "reorderRowUp": "Arriba",
          "reorderRowDown": "Abajo",
          "reorderRowTop": "Inicio",
          "reorderRowBottom": "Final",
          "exportPdf": "Exportar a PDF",
          "exportExcel": "Exportar a Excel",
          "exportToExcelAll": "Todos",
          "exportToExcelSelection": "Selección",
          "exportToExcelSelectionNoHeaders": "Selección (sin encabezados)",
          "sortAsc": "Orden ascendente",
          "sortDesc": "Orden descendente",
          "moveGroupPrevious": "Mover anterior",
          "moveGroupNext": "Mover siguiente",
          "selectall": "Seleccionar todo"
        },
        "editable": {
          "cancelDelete": "Cancelar",
          "confirmation": "¿Confirma la eliminación de este registro?",
          "confirmDelete": "Eliminar"
        },
        "noRecords": "No hay datos disponibles.",
        "loader": {
          "loading": "Cargando...",
          "exporting": "Exportando..."
        },
        "details": {
          "expand": "Expandir",
          "collapse": "Contraer"
        },
        "expandCollapseColumnHeader": "",
        "groupHeader": "Presione ctrl + espacio para agrupar",
        "ungroupHeader": "Presione ctrl + espacio para desagrupar",
        "toolbarLabel": "barra de herramientas de cuadrícula",
        "groupingHeaderLabel": "encabezado de agrupación de cuadrícula",
        "filterCellTitle": "celda de filtro",
        "clearButtons": {
          "clearFiltering": "Limpiar todos los filtros",
          "clearSorting": "Limpiar orden",
          "clearGrouping": "Limpiar agrupación",
          "columnChooserReset": "Reiniciar"
        },
        "applyButtons": {
          "applyGrouping": "Hecho",
          "applySorting": "Hecho",
          "columnChooserApply": "Aplicar"
        },
        "ai": {
          "outputPlaceholder": "No hay salida de IA disponible",
          "success": "Los datos son:",
          "error": "La operación no fue exitosa. Error:",
          "invalidSelection": "Este modo de selección no está habilitado actualmente...",
          "promptPlaceholder": "Ingrese su solicitud de IA aquí..."
        }
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Arrastre el título de una columna y suéltelo aquí para agrupar por ese criterio"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Pausar",
        "play": "Comezar",
        "mute": "Silenciar",
        "unmute": "Tocar",
        "quality": "Calidad",
        "fullscreen": "Pentalla completa"
      });
  }

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Incrementar valor",
        "downArrowText": "Disminuir valor"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Todas",
        "display": "Elementos mostrados {0} - {1} de {2}",
        "empty": "No hay registros.",
        "page": "Página",
        "of": "de {0}",
        "itemsPerPage": "ítems por página",
        "first": "Ir a la primera página",
        "previous": "Ir a la página anterior",
        "next": "Ir a la página siguiente",
        "last": "Ir a la última página",
        "refresh": "Actualizar",
        "morePages": "Más paginas",
        "pageButtonLabel": "Página {0}",
        "pageSizeDropDownLabel": "Menú desplegable de tamaños de página"
      });
  }

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "Todas",
        "display": "Elementos mostrados {0} - {1} de {2}",
        "empty": "No hay registros.",
        "page": "Página",
        "of": "de {0}",
        "itemsPerPage": "ítems por página",
        "first": "Ir a la primera página",
        "previous": "Ir a la página anterior",
        "next": "Ir a la página siguiente",
        "last": "Ir a la última página",
        "refresh": "Actualizar",
        "morePages": "Más paginas"
      });
  }

  /* PivotGrid messages */

  if (kendo.ui.PivotGrid) {
    kendo.ui.PivotGrid.prototype.options.messages =
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "Colocar campos de datos aquí",
        "columnFields": "Colocar campos de columna aquí",
        "rowFields": "Colocar campos de filas aquí"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "Mostrar elementos con valor que:",
        "filterFields": "Filtro de campos",
        "filter": "Filtrar",
        "include": "Incluir campos...",
        "title": "Campos a incluir",
        "clear": "Limpiar",
        "ok": "Ok",
        "cancel": "Cancelar",
        "operators": {
          "contains": "Contiene",
          "doesnotcontain": "No contiene",
          "startswith": "Comienza con",
          "endswith": "Termina con",
          "eq": "Es ugual a",
          "neq": "No es igual a"
        }
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "frequencies": {
          "never": "Nunca",
          "hourly": "Por hora",
          "daily": "Diariamente",
          "weekly": "Semanalmente",
          "monthly": "Mensualmente",
          "yearly": "Anualmente"
        },
        "hourly": {
          "repeatEvery": "Repetir cada: ",
          "interval": " hora(s)"
        },
        "daily": {
          "repeatEvery": "Repetir cada: ",
          "interval": " día(s)"
        },
        "weekly": {
          "interval": " semana(s)",
          "repeatEvery": "Repetir cada: ",
          "repeatOn": "Repetir en: "
        },
        "monthly": {
          "repeatEvery": "Repetir cada: ",
          "repeatOn": "Repetir en: ",
          "interval": " mes(es)",
          "day": "Día "
        },
        "yearly": {
          "repeatEvery": "Repetir cada: ",
          "repeatOn": "Repetir en: ",
          "interval": " año(s)",
          "of": " de "
        },
        "end": {
          "label": "Fin:",
          "mobileLabel": "Fin",
          "never": "Nunca",
          "after": "Después",
          "occurrence": " ocurrencia(s)",
          "on": "En "
        },
        "offsetPositions": {
          "first": "primero",
          "second": "segundo",
          "third": "tercero",
          "fourth": "cuarto",
          "last": "último"
        },
        "weekdays": {
          "day": "día",
          "weekday": "día de semana",
          "weekend": "día de fin de semana"
        }
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "todo el día",
        "date": "Fecha",
        "event": "Evento",
        "time": "Hora",
        "showFullDay": "Mostrar día completo",
        "showWorkDay": "Mostrar horas laborables",
        "today": "Hoy",
        "save": "Guardar",
        "cancel": "Cancelar",
        "destroy": "Eliminar",
        "deleteWindowTitle": "Eliminar evento",
        "ariaSlotLabel": "Seleccionado desde {0:t} hasta {1:t}",
        "ariaEventLabel": "{0} en {1:D} al {2:t}",
        "editable": {
          "confirmation": "¿Está seguro que quiere eliminar este evento?"
        },
        "views": {
          "day": "Día",
          "week": "Semana",
          "workWeek": "Semana laboral",
          "agenda": "Agenda",
          "month": "Mes"
        },
        "recurrenceMessages": {
          "deleteWindowTitle": "Eliminar elemento recurrente",
          "deleteWindowOccurrence": "Eliminar ocurrencia actual",
          "deleteWindowSeries": "Eliminar la serie",
          "editWindowTitle": "Editar elemento recurrente",
          "editWindowOccurrence": "Editar ocurrencia actual",
          "editWindowSeries": "Editar la serie",
          "deleteRecurring": "¿Quiere eliminar esta ocurrencia del evento o la serie completa?",
          "editRecurring": "¿Quiere editar esta ocurrencia del evento o la serie completa?",
          "resetSeriesWindowTitle": "Reiniciar serie",
          "deleteRecurringConfirmation": "¿Está seguro que desea eliminar esta ocurrencia del evento?",
          "deleteSeriesConfirmation": "¿Está seguro que desea eliminar toda la serie?"
        },
        "editor": {
          "title": "Título",
          "start": "Inicio",
          "end": "Fin",
          "allDayEvent": "Todo el día",
          "description": "Descripción",
          "repeat": "Repetir",
          "timezone": " ",
          "startTimezone": "Zona horaria de inicio",
          "endTimezone": "Zona horaria de fin",
          "separateTimezones": "Usar zonas horarias separadas para el inicio y el fin",
          "timezoneEditorTitle": "Zonas horarias",
          "timezoneEditorButton": "Zona horaria",
          "timezoneTitle": "Zonas horarias",
          "noTimezone": "Sin zona horaria",
          "editorTitle": "Evento"
        },
        "resetSeries": "Reiniciar serie",
        "refresh": "Actualizar",
        "selectView": "Seleccionar vista",
        "search": "Buscar..."
      });
  }

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "Aumentar",
        "decreaseButtonTitle": "Disminuir"
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
        "allBorders": "Todos los bordes",
        "insideBorders": "Dentro de los bordes",
        "insideHorizontalBorders": "Dentro de los bordes horizontales",
        "insideVerticalBorders": "Dentro de los bordes verticales",
        "outsideBorders": "Fuera de los bordes",
        "leftBorder": "Borde izquierdo",
        "topBorder": "Borde superior",
        "rightBorder": "Borde derecho",
        "bottomBorder": "Borde inferior",
        "noBorders": "Sin borde",
        "reset": "Restabelecer",
        "customColor": "Color personalizado",
        "apply": "Aplicar",
        "cancel": "Cancelar"
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "No hay registros para mostrar",
        "loading": "Cargando...",
        "requestFailed": "Error de la solicitud.",
        "retry": "Reintentar",
        "commands": {
          "edit": "Editar",
          "update": "Actualizar",
          "canceledit": "Cancelar",
          "create": "Añadir nuevo registro",
          "createchild": "Añadir registro hijo",
          "destroy": "Borrar",
          "excel": "Exportar a Excel",
          "pdf": "Exportar a PDF"
        }
      });
  }

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "Cargando...",
        "requestFailed": "Fallo en solicitud.",
        "retry": "Reintentar"
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Seleccione...",
        "cancel": "Cancelar",
        "retry": "Reintentar",
        "remove": "Quitar",
        "uploadSelectedFiles": "Subir archivos",
        "dropFilesHere": "Arrastre los archivos aquí para subirlos",
        "statusUploading": "subiendo",
        "statusUploaded": "Completado",
        "statusWarning": "advertencia",
        "statusFailed": "Error",
        "headerStatusUploading": "Subiendo...",
        "headerStatusUploaded": "Completado",
        "headerStatusPaused": "Pausado",
        "clearSelectedFiles": "Limpiar",
        "uploadSuccess": "Archivo(s) subido(s) exitosamente.",
        "uploadFail": "Error al subir archivo(s).",
        "invalidMaxFileSize": "El tamaño del archivo es demasiado grande.",
        "invalidMinFileSize": "El tamaño del archivo es demasiado pequeño.",
        "invalidFileExtension": "Tipo de archivo no permitido."
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} es requerido",
        "pattern": "{0} no es válido",
        "min": "{0} debe ser mayor o igual a {1}",
        "max": "{0} debe ser menor o igual a {1}",
        "step": "{0} no es válido",
        "email": "{0} no es un correo electrónico válido",
        "url": "{0} no es una URL válida",
        "date": "{0} no es una fecha válida",
        "dateCompare": "Fecha final debe ser mayor o igual a fecha inicial"
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.localization =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Cerca"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.localization =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.localization =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Cancelar"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.localization =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Cancelar"
      });
  }

  /* Wizard messages */

  if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
      $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
        "reset": "Reiniciar",
        "previous": "Anterior",
        "next": "Siguiente",
        "done": "Hecho",
        "step": "Paso",
        "of": "de"
      });
  }

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
      $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
        "contrastRatio": "Relación de contraste:",
        "fail": "Fallo",
        "pass": "Pasa",
        "hex": "HEX",
        "toggleFormat": "Cambiar formato",
        "red": "Rojo",
        "green": "Verde",
        "blue": "Azul",
        "alpha": "Alfa"
      });
  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
        "startLabel": "Inicio",
        "endLabel": "Fin"
      });
  }

  /* FileManager messages */

  if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages =
      $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
        "toolbar": {
          "createFolder": "Nueva carpeta",
          "upload": "Subir",
          "sortDirection": "Dirección de orden",
          "sortDirectionAsc": "Orden ascendente",
          "sortDirectionDesc": "Orden descendente",
          "sortField": "Ordenar por",
          "nameField": "Nombre",
          "sizeField": "Tamaño de archivo",
          "typeField": "Tipo",
          "dateModifiedField": "Fecha de modificación",
          "dateCreatedField": "Fecha de creación",
          "listView": "Vista de lista",
          "gridView": "Vista de cuadrícula",
          "search": "Buscar",
          "details": "Ver detalles",
          "detailsChecked": "Sí",
          "detailsUnchecked": "No",
          "delete": "Eliminar",
          "rename": "Renombrar"
        },
        "views": {
          "nameField": "Nombre",
          "sizeField": "Tamaño de archivo",
          "typeField": "Tipo",
          "dateModifiedField": "Fecha de modificación",
          "dateCreatedField": "Fecha de creación",
          "items": "elementos",
          "listLabel": "FileManager lista",
          "gridLabel": "FileManager cuadrícula",
          "treeLabel": "FileManager árbol"
        },
        "dialogs": {
          "upload": {
            "title": "Subir archivos",
            "clear": "Limpiar lista",
            "done": "Hecho"
          },
          "moveConfirm": {
            "title": "Confirmar",
            "content": "<p class='k-text-center'>¿Desea mover o copiar?</p>",
            "okText": "Copiar",
            "cancel": "Mover",
            "close": "cerrar"
          },
          "deleteConfirm": {
            "title": "Confirmar",
            "content": "<p class='k-text-center'>¿Está seguro que desea eliminar los archivos seleccionados?<br/>No puede deshacer esta acción.</p>",
            "okText": "Eliminar",
            "cancel": "Cancelar",
            "close": "cerrar"
          },
          "renamePrompt": {
            "title": "Solicitud",
            "content": "<p class='k-text-center'>Ingrese un nuevo nombre para el archivo.</p>",
            "okText": "Renombrar",
            "cancel": "Cancelar",
            "close": "cerrar"
          }
        },
        "previewPane": {
          "noFileSelected": "Ningún archivo seleccionado",
          "extension": "Tipo",
          "size": "Tamaño",
          "created": "Fecha de creación",
          "createdUtc": "Fecha de creación UTC",
          "modified": "Fecha de modificación",
          "modifiedUtc": "Fecha de modificación UTC",
          "items": "elementos"
        }
      });
  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {
    kendo.ui.TaskBoard.prototype.options.messages =
      $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
        "edit": "Editar",
        "createNewCard": "Crear nueva tarjeta",
        "create": "Crear",
        "search": "Buscar",
        "previewCard": "Vista previa de tarjeta",
        "addCard": "Agregar tarjeta",
        "editCard": "Editar tarjeta",
        "deleteCard": "Eliminar tarjeta",
        "addColumn": "Agregar columna",
        "editColumn": "Editar columna",
        "deleteColumn": "Eliminar columna",
        "close": "Cerrar",
        "cancel": "Cancelar",
        "delete": "Eliminar",
        "saveChanges": "Guardar cambios",
        "title": "Título:",
        "description": "Descripción:",
        "newColumn": "Nueva columna",
        "deleteColumnConfirm": "¿Está seguro que desea eliminar esta columna?",
        "deleteCardConfirm": "¿Está seguro que desea eliminar esta tarjeta?"
      });
  }

  /* ListBox messaages */

  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
        "tools": {
          "remove": "Eliminar",
          "moveUp": "Mover arriba",
          "moveDown": "Mover abajo",
          "transferTo": "Transferir a",
          "transferFrom": "Transferir desde",
          "transferAllTo": "Transferir todo a",
          "transferAllFrom": "Transferir todo desde"
        }
      });
  }

  /* DateInput messages */

  if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
      $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "año",
        "month": "mes",
        "day": "día",
        "weekday": "día de la semana",
        "hour": "horas",
        "minute": "minutos",
        "second": "segundos",
        "dayperiod": "AM/PM"
      });
  }

  /* List messages */

  if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
      $.extend(true, kendo.ui.List.prototype.options.messages, {
        "clear": "limpiar",
        "noData": "No se encontraron datos.",
        "filterInputPlaceholder": "Filtrar"
      });
  }

  /* DropDownList messages */

  if (kendo.ui.DropDownList) {
    kendo.ui.DropDownList.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* ComboBox messages */

  if (kendo.ui.ComboBox) {
    kendo.ui.ComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* AutoComplete messages */

  if (kendo.ui.AutoComplete) {
    kendo.ui.AutoComplete.prototype.options.messages =
      $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* MultiColumnComboBox messages */

  if (kendo.ui.MultiColumnComboBox) {
    kendo.ui.MultiColumnComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* DropDownTree messages */

  if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
        "singleTag": "elemento(s) seleccionado(s)",
        "clear": "limpiar",
        "deleteTag": "eliminar",
        "noData": "No se encontraron datos.",
        "filterInputPlaceholder": "Filtrar"
      });
  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
      $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
        "singleTag": "elemento(s) seleccionado(s)",
        "clear": "limpiar",
        "deleteTag": "eliminar",
        "noData": "No se encontraron datos.",
        "downArrow": "seleccionar"
      });
  }

  /* Chat messages */

  if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
      $.extend(true, kendo.ui.Chat.prototype.options.messages, {
        "messageListLabel": "Lista de mensajes",
        "placeholder": "Escriba un mensaje...",
        "toggleButton": "Alternar barra de herramientas",
        "sendButton": "Enviar mensaje"
      });
  }

  /* TimePicker messages */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Establecer",
        "cancel": "Cancelar",
        "hour": "hora",
        "minute": "minuto",
        "second": "segundo",
        "millisecond": "milisegundo",
        "now": "Ahora"
      });
  }

  /* DateTimePicker messages */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Establecer",
        "cancel": "Cancelar",
        "hour": "hora",
        "minute": "minuto",
        "second": "segundo",
        "millisecond": "milisegundo",
        "now": "Ahora",
        "date": "Fecha",
        "time": "Hora",
        "today": "Hoy",
        "weekColumnHeader": ""
      });
  }

  /* Calendar messages */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "today": "Hoy",
        "weekColumnHeader": "",
        "navigateTo": "Navegar a ",
        "parentViews": {
          "month": "vista de año",
          "year": "vista de década",
          "decade": "vista de siglo"
        }
      });
  }

  /* kendo.ui.progress method */

  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        "loading": "Cargando..."
      });
  }

  /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
        "cancel": "Cancelar",
        "update": "Guardar",
        "endTitle": "Fin de la repetición",
        "repeatTitle": "Patrón de repetición",
        "headerTitle": "Repetir evento",
        "end": {
          "patterns": {
            "never": "Nunca",
            "after": "Después...",
            "on": "En..."
          },
          "never": "Nunca",
          "after": "Terminar repetición después de",
          "on": "Terminar repetición en"
        },
        "daily": {
          "interval": ""
        },
        "hourly": {
          "interval": ""
        },
        "weekly": {
          "interval": ""
        },
        "monthly": {
          "interval": "",
          "repeatBy": "Repetir por: ",
          "dayOfMonth": "Día del mes",
          "dayOfWeek": "Día de la semana",
          "repeatEvery": "Repetir cada",
          "every": "Cada",
          "day": "Día "
        },
        "yearly": {
          "interval": "",
          "repeatBy": "Repetir por: ",
          "dayOfMonth": "Día del mes",
          "dayOfWeek": "Día de la semana",
          "repeatEvery": "Repetir cada: ",
          "every": "Cada",
          "month": "Mes",
          "day": "Día"
        }
      });
  }

  /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
        "title": "Configuración",
        "cancelButtonText": "Cancelar",
        "applyButtonText": "Aplicar",
        "measures": "Seleccione campos para comenzar",
        "columns": "Seleccione campos para comenzar",
        "rows": "Seleccione campos para comenzar"
      });
  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
        "apply": "Aplicar",
        "sortAscending": "Orden ascendente",
        "sortDescending": "Orden descendente",
        "filterFields": "Filtro de campos",
        "filter": "Filtrar",
        "include": "Incluir campos...",
        "clear": "Limpiar",
        "reset": "Reiniciar",
        "moveToColumns": "Mover a Columnas",
        "moveToRows": "Mover a Filas",
        "movePrevious": "Mover anterior",
        "moveNext": "Mover siguiente",
        "filterOperatorsDropDownLabel": "Operadores de filtro de región",
        "filterValueTextBoxLabel": "Valor de filtro de región",
        "operators": {
          "contains": "Contiene",
          "doesnotcontain": "No contiene",
          "startswith": "Comienza con",
          "endswith": "Termina con",
          "eq": "Es igual a",
          "neq": "No es igual a"
        }
      });
  }

  /* PDFViewer messages */

  if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
      $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        "defaultFileName": "Documento",
        "toolbar": {
          "zoom": {
            "zoomLevel": "nivel de zoom",
            "zoomOut": "Alejar",
            "zoomIn": "Acercar",
            "actualWidth": "Ancho real",
            "autoWidth": "Ancho automático",
            "fitToWidth": "Ajustar al ancho",
            "fitToPage": "Ajustar a la página"
          },
          "open": "Abrir",
          "exportAs": "Exportar",
          "download": "Descargar",
          "pager": {
            "first": "Ir a la primera página",
            "previous": "Ir a la página anterior",
            "next": "Ir a la página siguiente",
            "last": "Ir a la última página",
            "of": "de",
            "page": "página",
            "pages": "páginas"
          },
          "print": "Imprimir",
          "toggleSelection": "Habilitar selección",
          "togglePan": "Habilitar desplazamiento",
          "search": "Buscar"
        },
        "errorMessages": {
          "notSupported": "Solo se permiten archivos PDF.",
          "parseError": "Error al procesar el archivo PDF.",
          "notFound": "Archivo no encontrado.",
          "popupBlocked": "La ventana emergente fue bloqueada."
        },
        "dialogs": {
          "exportAsDialog": {
            "title": "Exportar...",
            "defaultFileName": "Documento",
            "pdf": "Portable Document Format (.pdf)",
            "png": "Portable Network Graphics (.png)",
            "svg": "Scalable Vector Graphics (.svg)",
            "labels": {
              "fileName": "Nombre del archivo",
              "saveAsType": "Guardar como",
              "page": "Página"
            }
          },
          "okText": "OK",
          "save": "Guardar",
          "cancel": "Cancelar",
          "search": {
            "inputLabel": "Buscar texto",
            "matchCase": "Coincidir mayúsculas",
            "next": "Siguiente coincidencia",
            "previous": "Coincidencia anterior",
            "close": "Cerrar",
            "of": "de",
            "dragHandle": "Arrastrar búsqueda"
          }
        }
      });
  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
      $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
        "label": "Organigrama",
        "edit": "Editar",
        "create": "Crear",
        "destroy": "Eliminar",
        "destroyContent": "¿Está seguro que desea eliminar este elemento y todos sus hijos?",
        "destroyTitle": "Eliminar elemento",
        "cancel": "Cancelar",
        "save": "Guardar",
        "menuLabel": "Menú de edición",
        "uploadAvatar": "Subir nuevo avatar",
        "parent": "Superior",
        "name": "Nombre",
        "title": "Título",
        "none": "--Ninguno--",
        "expand": "expandir",
        "collapse": "contraer"
      });
  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
      $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
        "reset": "Reiniciar captcha",
        "audio": "Reproducir captcha",
        "imageAlt": "Escriba el código Captcha de la imagen",
        "success": "Verificación exitosa"
      });
  }

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "No hay búsquedas anteriores",
        "noPreviousPrompts": "No hay solicitudes anteriores",
        "previousSearches": "Búsquedas anteriores",
        "previousPrompts": "Solicitudes anteriores",
        "suggestedPrompts": "Solicitudes sugeridas",
        "searchModeLabel": "Buscar",
        "searchModeDescription": "Busca coincidencias exactas de palabras en sus datos",
        "searchPlaceholder": "Buscar",
        "semanticSearchModeLabel": "Búsqueda semántica",
        "semanticSearchModeDescription": "Entiende el contexto para mostrar los resultados más relevantes.",
        "semanticSearchPlaceholder": "Búsqueda semántica",
        "semanticSearchButtonText": "Buscar",
        "aiAssistantPlaceholder": "Ordenar, filtrar o agrupar con IA",
        "speechToText": "Voz a texto",
        "speechToTextAriaLabel": "Iniciar reconocimiento de voz",
        "cancel": "Cancelar",
        "send": "Enviar",
        "searchButtonText": "Buscar",
        "aiAssistantButtonText": "Asistente IA"
      });
  }

  /* ChartWizard messages */

  if (kendo.ui.ChartWizard) {
    kendo.ui.ChartWizard.prototype.options.messages =
      $.extend(true, kendo.ui.ChartWizard.prototype.options.messages, {
        "window": {
          "title": "Vista previa del gráfico"
        },
        "export": "Exportar",
        "exportPDF": "Archivo PDF",
        "exportSVG": "Archivo SVG",
        "exportPNG": "Archivo PNG",
        "tab": {
          "chart": "Gráfico",
          "data": "Datos",
          "format": "Formato"
        },
        "chart": {
          "bar": {
            "expandText": "Gráfico de barras",
            "bar": "Barras",
            "stackedBar": "Barras apiladas",
            "hundredStackedBar": "100% Barras apiladas"
          },
          "pie": {
            "expandText": "Gráfico circular",
            "pie": "Circular"
          },
          "column": {
            "expandText": "Gráfico de columnas",
            "column": "Columnas",
            "stackedColumn": "Columnas apiladas",
            "hundredStackedColumn": "100% Columnas apiladas"
          },
          "line": {
            "expandText": "Gráfico de líneas",
            "line": "Líneas",
            "stackedLine": "Líneas apiladas",
            "hundredStackedLine": "100% Líneas apiladas"
          },
          "scatter": {
            "expandText": "Gráfico de dispersión",
            "scatter": "Dispersión"
          }
        },
        "data": {
          "configuration": {
            "expandText": "Configuración",
            "series": {
              "title": "Serie",
              "add": "Agregar"
            },
            "valueAxis": "Eje de valores",
            "categoryAxis": "Eje de categorías",
            "xAxis": "Eje X"
          }
        },
        "format": {
          "chartArea": {
            "expandText": "Área del gráfico",
            "margins": {
              "default": "Márgenes",
              "auto": "Auto",
              "left": "Izquierda",
              "right": "Derecha",
              "top": "Arriba",
              "bottom": "Abajo"
            },
            "background": {
              "default": "Fondo",
              "color": "Color"
            }
          },
          "title": {
            "expandText": "Título",
            "applyTo": "Aplicar a",
            "chartTitle": "Título del gráfico",
            "chartSubtitle": "Subtítulo del gráfico",
            "label": "Título",
            "font": "Fuente",
            "fontPlaceholder": "(fuente heredada)",
            "size": "Tamaño",
            "sizePlaceholder": "px",
            "color": "Color"
          },
          "series": {
            "expandText": "Serie",
            "applyTo": "Aplicar a",
            "allSeries": "Todas las series",
            "color": "Color",
            "showLabels": "Mostrar etiquetas"
          },
          "legend": {
            "expandText": "Leyenda",
            "showLegend": "Mostrar leyenda",
            "font": "Fuente",
            "fontPlaceholder": "(fuente heredada)",
            "size": "Tamaño",
            "sizePlaceholder": "px",
            "color": "Color",
            "position": {
              "default": "Posición",
              "top": "Arriba",
              "bottom": "Abajo",
              "left": "Izquierda",
              "right": "Derecha"
            }
          },
          "categoryAxis": {
            "expandText": "Eje de categorías",
            "title": {
              "text": "Título",
              "placeholder": "Título del eje",
              "font": "Fuente",
              "fontPlaceholder": "(fuente heredada)",
              "size": "Tamaño",
              "sizePlaceholder": "px",
              "color": "Color"
            },
            "labels": {
              "text": "Etiquetas",
              "font": "Fuente",
              "fontPlaceholder": "(fuente heredada)",
              "size": "Tamaño",
              "sizePlaceholder": "px",
              "color": "Color",
              "rotation": {
                "text": "Rotación",
                "auto": "Auto"
              },
              "reverseOrder": "Orden inverso"
            }
          },
          "valueAxis": {
            "expandText": "Eje de valores",
            "title": {
              "text": "Título",
              "placeholder": "Título del eje",
              "font": "Fuente",
              "fontPlaceholder": "(fuente heredada)",
              "size": "Tamaño",
              "sizePlaceholder": "px",
              "color": "Color"
            },
            "labels": {
              "text": "Etiquetas",
              "labelFormat": {
                "default": "Formato de etiqueta",
                "text": "Texto",
                "number": "Número",
                "currency": "Moneda",
                "percent": "Porcentaje"
              },
              "font": "Fuente",
              "fontPlaceholder": "(fuente heredada)",
              "size": "Tamaño",
              "sizePlaceholder": "px",
              "color": "Color",
              "rotation": {
                "text": "Rotación",
                "auto": "Auto"
              }
            }
          },
          "xAxis": {
            "expandText": "Eje X"
          },
          "yAxis": {
            "expandText": "Eje Y"
          }
        }
      });
  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Título del mapa"
      });
  }

  /* Sankey messages */

  if (kendo.dataviz.ui.Sankey) {
    kendo.dataviz.ui.Sankey.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
        "tooltipUnits": "{0} Unidades"
      });
  }

  /* Chart messages */

  if (kendo.dataviz.ui.Chart) {
    kendo.dataviz.ui.Chart.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
        "noData": "No hay datos disponibles"
      });
  }

  /* TimePicker */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Establecer",
        "cancel": "Cancelar",
        "hour": "hora",
        "minute": "minuto",
        "second": "segundo",
        "millisecond": "milisegundo",
        "now": "Ahora"
      });
  }

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Establecer",
        "cancel": "Cancelar",
        "hour": "hora",
        "minute": "minuto",
        "second": "segundo",
        "millisecond": "milisegundo",
        "now": "Ahora",
        "date": "Fecha",
        "time": "Hora",
        "today": "Hoy",
        "weekColumnHeader": ""
      });
  }

  /* Calendar */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "weekColumnHeader": "",
        "today": "Hoy",
        "navigateTo": "Navegar a: ",
        "parentViews": {
          "month": "Vista anual",
          "year": "Vista de década",
          "decade": "Vista de siglo"
        }
      });
  }

  /* DateInput */

  if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
      $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "año",
        "month": "mes",
        "day": "día",
        "weekday": "día de la semana",
        "hour": "horas",
        "minute": "minutos",
        "second": "segundos",
        "dayperiod": "AM/PM"
      });
  }

})(window.kendo.jQuery);