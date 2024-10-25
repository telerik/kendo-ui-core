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
        "columns": "Columnas",
        "done": "Hecho",
        "settings": "Configuración de columnas",
        "lock": "Bloquear",
        "unlock": "Desbloquear"
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
        "deleteFile": '¿Está seguro que quiere eliminar "{0}"?',
        "overwriteFile": 'Un fichero con el nombre "{0}" ya existe en el directorio actual. ¿Desea reemplazarlo?',
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
        "createTable": "Crear tabla",
        "addColumnLeft": "Agregar columna a la izquierda",
        "addColumnRight": "Agregar columna a la derecha",
        "addRowAbove": "Agregar fila arriba",
        "addRowBelow": "Agregar fila abajo",
        "deleteRow": "Borrar fila",
        "deleteColumn": "Borrar columna"
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
        "deleteFile": '¿Está seguro que quiere eliminar "{0}"?',
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
          "isnotempty": "No está vacío"
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
        "cancel": "Cancelar"
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
          "isnotempty": "No está vacío"
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
        "clear": "Limpiar filtros",
        "filter": "Filtrar",
        "search": "Buscar",
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
          "percentComplete": "Completa",
          "resources": "Recursos",
          "resourcesEditorTitle": "Recursos",
          "resourcesHeader": "Recursos",
          "start": "Comienzo",
          "title": "Título",
          "unitsHeader": "Unidades"
        },
        "save": "Guardar",
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
          "update": "Actualizar"
        },
        "editable": {
          "cancelDelete": "Cancelar",
          "confirmation": "¿Confirma la eliminación de este registro?",
          "confirmDelete": "Eliminar"
        },
        "noRecords": "No hay datos disponibles."
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
        "morePages": "Más paginas"
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
          "editRecurring": "¿Quiere editar esta ocurrencia del evento o la serie completa?"
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
          "noTimezone": "Sin zona horaria",
          "editorTitle": "Evento"
        }
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

  if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
    kendo.spreadsheet.messages.dialogs =
      $.extend(true, kendo.spreadsheet.messages.dialogs, {
        "apply": "Aplicar",
        "save": "Guardar",
        "cancel": "Cancelar",
        "remove": "Eliminar",
        "retry": "Reintentar",
        "revert": "Revertir",
        "okText": "OK",
        "formatCellsDialog": {
          "title": "Formato",
          "categories": {
            "number": "Número",
            "currency": "Moneda",
            "date": "Fecha"
          }
        },
        "fontFamilyDialog": {
          "title": "Fuente"
        },
        "fontSizeDialog": {
          "title": "Tamaño de fuente"
        },
        "bordersDialog": {
          "title": "Bordes"
        },
        "alignmentDialog": {
          "title": "Alineación",
          "buttons": {
            "justifyLeft": "Alinear a la izquierda",
            "justifyCenter": "Alinear al centro",
            "justifyRight": "Alinear a la derecha	",
            "justifyFull": "Justificar",
            "alignTop": "Alinear arriba",
            "alignMiddle": "linear medio",
            "alignBottom": "linear fondo"
          }
        },
        "mergeDialog": {
          "title": "Combinar celdas",
          "buttons": {
            "mergeCells": "Combinar todo",
            "mergeHorizontally": "Combinar horizontalmente",
            "mergeVertically": "Combinar verticalmente",
            "unmerge": "Descombinar"
          }
        },
        "freezeDialog": {
          "title": "Congelar paneles",
          "buttons": {
            "freezePanes": "Congelar paneles",
            "freezeRows": "Congelar filas",
            "freezeColumns": "Congelar columnas",
            "unfreeze": "Desongelar paneles"
          }
        },
        "validationDialog": {
          "title": "Validación de datos",
          "hintMessage": "Por favor, ingrese un {0} valor {1} válido.",
          "hintTitle": "Validación {0}",
          "criteria": {
            "any": "Cualquer valor",
            "number": "Número",
            "text": "Texto",
            "date": "Fecha",
            "custom": "Fórmula personalizada",
            "list": "Lista"
          },
          "comparers": {
            "greaterThan": "mayor que",
            "lessThan": "menos que",
            "between": "entre",
            "notBetween": "fuera",
            "equalTo": "igual a",
            "notEqualTo": "diferente de",
            "greaterThanOrEqualTo": "mayor o igual que",
            "lessThanOrEqualTo": "menor o igual que"
          },
          "comparerMessages": {
            "greaterThan": "mayor que {0}",
            "lessThan": "menos que {0}",
            "between": "entre {0} y {1}",
            "notBetween": "no entre {0} y {1}",
            "equalTo": "igual a {0}",
            "notEqualTo": "no igual a {0}",
            "greaterThanOrEqualTo": "mayor que o igual a{0}",
            "lessThanOrEqualTo": "menor o igual a {0}",
            "custom": "que satisface la fórmula: {0}"
          },
          "labels": {
            "criteria": "Criterios",
            "comparer": "Comparer",
            "min": "Min",
            "max": "Max",
            "value": "Valor",
            "start": "Inicio",
            "end": "Fin",
            "onInvalidData": "En datos no válidos",
            "rejectInput": "Rechazar entrada",
            "showWarning": "Mostrar advertencia",
            "showHint": "Mostrar sugerencia",
            "hintTitle": "Título de la pista",
            "hintMessage": "Mensagen de sugerencia",
            "ignoreBlank": "Ignorar en blanco"
          },
          "placeholders": {
            "typeTitle": "Tipo de título",
            "typeMessage": "Escribir mensaje"
          }
        },
        "exportAsDialog": {
          "title": "Exportar...",
          "labels": {
            "fileName": "Nombre de archivo",
            "saveAsType": "Guardar como tipo",
            "exportArea": "Exportar",
            "paperSize": "Tamaño del papel",
            "margins": "Márgenes",
            "orientation": "Orientación",
            "print": "Imprimir",
            "guidelines": "Directrices",
            "center": "Centro",
            "horizontally": "Horizontalmente",
            "vertically": "Verticalmente"
          }
        },
        "modifyMergedDialog": {
          "errorMessage": "No se puede cambiar parte de una celda fusionada. "
        },
        "useKeyboardDialog": {
          "title": "Copiar y pegar",
          "errorMessage": "Estas acciones no se pueden invocar a través del menú. Utilice los métodos abreviados de teclado en su lugar:",
          "labels": {
            "forCopy": "para copiar",
            "forCut": "para cortar",
            "forPaste": "para pegar"
          }
        },
        "unsupportedSelectionDialog": {
          "errorMessage": "Esa acción no se puede realizar en la selección múltiple."
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
    kendo.spreadsheet.messages.filterMenu =
      $.extend(true, kendo.spreadsheet.messages.filterMenu, {
        "sortAscending": "Clasificar rango A a Z",
        "sortDescending": "Clasificar rango Z a A",
        "filterByValue": "Filter by value",
        "filterByCondition": "Filtrar por valor",
        "apply": "Aplicar",
        "search": "Buscar",
        "addToCurrent": "Añadir a la selección actual",
        "clear": "Limpar",
        "blanks": "(espacios en blanco)",
        "operatorNone": "Ninguno",
        "and": "Y",
        "or": "O",
        "operators": {
          "string": {
            "contains": "El texto contiene",
            "doesnotcontain": "El texto no contiene",
            "startswith": "El texto comienza con",
            "endswith": "El texto termina con"
          },
          "date": {
            "eq": "Fecha es",
            "neq": "Fecha no es",
            "lt": "La fecha es anterior",
            "gt": "La fecha es posterior al"
          },
          "number": {
            "eq": "Es igual a",
            "neq": "No es igual a",
            "gte": "Es mayor o igual que",
            "gt": "Es mayor que",
            "lte": "Es menor o igual que",
            "lt": "Es menor que"
          }
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
    kendo.spreadsheet.messages.toolbar =
      $.extend(true, kendo.spreadsheet.messages.toolbar, {
        "addColumnLeft": "Añadir columna izquierda",
        "addColumnRight": "Añadir columna derecha",
        "addRowAbove": "Agregar fila por encima",
        "addRowBelow": "Agregar fila debajo",
        "alignment": "Alineación",
        "alignmentButtons": {
          "justifyLeft": "Alinear a la izquierda",
          "justifyCenter": "Alinear al cenro",
          "justifyRight": "Alinear a la derecha",
          "justifyFull": "Justificar",
          "alignTop": "Alinear arriba",
          "alignMiddle": "Alinear medio",
          "alignBottom": "Alinear fondo"
        },
        "backgroundColor": "Fondo",
        "bold": "Negrita",
        "borders": "Bordes",
        "colorPicker": {
          "reset": "Restabelecer color",
          "customColor": "Color personalizado..."
        },
        "copy": "Copiar",
        "cut": "Corte",
        "deleteColumn": "Eliminar columna",
        "deleteRow": "Eliminar fila",
        "excelImport": "Importar desde Excel...",
        "filter": "Filtro",
        "fontFamily": "Fuente",
        "fontSize": "Tamaño de fuente",
        "format": "Personalizar formato...",
        "formatTypes": {
          "automatic": "Automático",
          "number": "Númbero",
          "percent": "Percentaje",
          "financial": "Financiero",
          "currency": "Moneda",
          "date": "Fecha",
          "time": "Tiempo",
          "dateTime": "Hora de la fecha",
          "duration": "Duración",
          "moreFormats": "Más formatos..."
        },
        "formatDecreaseDecimal": "Disminuir decimal",
        "formatIncreaseDecimal": "Aumentar decimal",
        "freeze": "Congelar paneles",
        "freezeButtons": {
          "freezePanes": "Congelar paneles",
          "freezeRows": "Congelar filas",
          "freezeColumns": "Congelar columnas",
          "unfreeze": "Descongelar paneles"
        },
        "italic": "Italic",
        "merge": "Combinar celdas",
        "mergeButtons": {
          "mergeCells": "Combinar todo",
          "mergeHorizontally": "Combinar horizontalmente'",
          "mergeVertically": "Combinar verticalmente",
          "unmerge": "Descombinar"
        },
        "open": "Abrir...",
        "paste": "Pegar",
        "quickAccess": {
          "redo": "Refacer",
          "undo": "Desfacer"
        },
        "saveAs": "Guardar como...",
        "sortAsc": "Ordenar ascendente",
        "sortDesc": "Ordenar descendente",
        "sortButtons": {
          "sortSheetAsc": "Ordenar hoja A a Z",
          "sortSheetDesc": "Ordenar hoja Z a A",
          "sortRangeAsc": "Ordenar rango de A a Z",
          "sortRangeDesc": "Ordenar rango de Z a A"
        },
        "textColor": "Color de texto",
        "textWrap": "Ajustar texto",
        "underline": "Subrayado",
        "validation": "Validación de datos..."
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
    kendo.spreadsheet.messages.view =
      $.extend(true, kendo.spreadsheet.messages.view, {
        "errors": {
          "shiftingNonblankCells": "No se pueden insertar las celdas debido a la posibilidad de pérdida de datos. Seleccione otra ubicación de inserción o borre los datos del final de su hoja de trabajo.",
          "filterRangeContainingMerges": "No se puede crear un filtro dentro de un intervalo que contenga fusiones",
          "validationError": "El valor que introdujo viola las reglas de validación establecidas en la celda."
        },
        "tabs": {
          "home": "Casa",
          "insert": "Insertar",
          "data": "Datos"
        }
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "No records to display",
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
        "headerStatusUploaded": "Completado"
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
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Cerca"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.messages =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.messages =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Cancelar"
      });
  }

  /* Prompt */
  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.messages =
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

})(window.kendo.jQuery);
