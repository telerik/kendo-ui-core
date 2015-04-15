(function ($, undefined) {
    /* Filter cell operator messages */
    
    if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
    $.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
      "date": {
        "eq": "Es igual a",
        "gte": "Es posterior o igual a",
        "gt": "Es posterior",
        "lte": "Es anterior o igual a",
        "lt": "Es anterior",
        "neq": "No es igual a"
      },
      "number": {
        "eq": "Es igual a",
        "gte": "Es mayor o igual que",
        "gt": "Es mayor que",
        "lte": "Es menor o igual que",
        "lt": "Es menor que",
        "neq": "No es igual a"
      },
      "string": {
        "endswith": "Termina en",
        "eq": "Es igual a",
        "neq": "No es igual a",
        "startswith": "Comienza con",
        "contains": "Contiene",
        "doesnotcontain": "No contiene"
      },
      "enums": {
        "eq": "Es igual a",
        "neq": "No es igual a"
      }
    });
    }
    
    /* Filter menu operator messages */
    
    if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
      "date": {
        "eq": "Es igual a",
        "gte": "Es posterior o igual a",
        "gt": "Es posterior",
        "lte": "Es anterior o igual a",
        "lt": "Es anterior",
        "neq": "No es igual a"
      },
      "number": {
        "eq": "Es igual a",
        "gte": "Es mayor o igual que",
        "gt": "Es mayor que",
        "lte": "Es menor o igual que",
        "lt": "Es menor que",
        "neq": "No es igual a"
      },
      "string": {
        "endswith": "Termina en",
        "eq": "Es igual a",
        "neq": "No es igual a",
        "startswith": "Comienza con",
        "contains": "Contiene",
        "doesnotcontain": "No contiene"
      },
      "enums": {
        "eq": "Es igual a",
        "neq": "No es igual a"
      }
    });
    }
    
    /* ColumnMenu messages */
    
    if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
    $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
      "columns": "Columnas",
      "sortAscending": "Orden ascendente",
      "sortDescending": "Orden descendente",
      "settings": "Configuración de columnas",
      "done": "Hecho",
      "lock": "Bloquear",
      "unlock": "Desbloquear"
    });
    }
    
    /* RecurrenceEditor messages */
    
    if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
      "daily": {
        "interval": "día(s)",
        "repeatEvery": "Repetir cada:"
      },
      "end": {
        "after": "Después",
        "occurrence": "ocurrencia(s)",
        "label": "Fin:",
        "never": "Nunca",
        "on": "En",
        "mobileLabel": "Ends"
      },
      "frequencies": {
        "daily": "Diariamente",
        "monthly": "Mensualmente",
        "never": "Nunca",
        "weekly": "Semanalmente",
        "yearly": "Anualmente"
      },
      "monthly": {
        "day": "Día",
        "interval": "mes(es)",
        "repeatEvery": "Repetir cada:",
        "repeatOn": "Repetir en:"
      },
      "offsetPositions": {
        "first": "Primero",
        "fourth": "Cuarto",
        "last": "Último",
        "second": "Segundo",
        "third": "Tercero"
      },
      "weekly": {
        "repeatEvery": "Repetir cada:",
        "repeatOn": "Repetir en:",
        "interval": "semana(s)"
      },
      "yearly": {
        "of": "de",
        "repeatEvery": "Repetir cada:",
        "repeatOn": "Repetir en:",
        "interval": "año(s)"
      },
      "weekdays": {
        "day": "día",
        "weekday": "día de semana",
        "weekend": "día de fin de semana"
      }
    });
    }
    
    /* Grid messages */
    
    if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
    $.extend(true, kendo.ui.Grid.prototype.options.messages,{
      "commands": {
        "create": "Agregar",
        "destroy": "Eliminar",
        "canceledit": "Cancelar",
        "update": "Actualizar",
        "edit": "Editar",
        "select": "Seleccionar",
        "cancel": "Cancelar Cambios",
        "save": "Guardar Cambios"
      },
      "editable": {
        "confirmation": "¿Confirma la eliminación de este registro?",
        "cancelDelete": "Cancelar",
        "confirmDelete": "Eliminar"
      }
    });
    }
    
    /* Pager messages */
    
    if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
    $.extend(true, kendo.ui.Pager.prototype.options.messages,{
      "page": "Página",
      "display": "Elementos mostrados  {0} - {1} de {2}",
      "of": "de {0}",
      "empty": "No hay registros.",
      "refresh": "Actualizar",
      "first": "Ir a la primera página",
      "itemsPerPage": "ítems por página",
      "last": "Ir a la última página",
      "next": "Ir a la página siguiente",
      "previous": "Ir a la página anterior",
      "morePages": "Más paginas"
    });
    }
    
    /* FilterCell messages */
    
    if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
    $.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
      "filter": "Filtrar",
      "clear": "Limpiar filtro",
      "isFalse": "No",
      "isTrue": "Sí",
      "operator": "Operador"
    });
    }
    
    /* FilterMenu messages */
    
    if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
      "filter": "Filtrar",
      "and": "Y",
      "clear": "Limpiar filtro",
      "info": "Mostrar filas con valor que",
      "isFalse": "No",
      "isTrue": "Si",
      "or": "Or",
      "cancel": "Cancelar",
      "operator": "Operador",
      "value": "Valor",
      "selectValue": "-Seleccionar valor-"
    });
    }
    
    /* Groupable messages */
    
    if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
    $.extend(true, kendo.ui.Groupable.prototype.options.messages,{
      "empty": "Arrastre un encabezado de columna y suéltelo aquí para agrupar por dicho criterio"
    });
    }
    
    /* Editor messages */
    
    if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
    $.extend(true, kendo.ui.Editor.prototype.options.messages,{
      "dialogButtonSeparator": "or",
      "dialogCancel": "Cancel",
      "dialogInsert": "Insert",
      "imageAltText": "Alternate text",
      "imageWebAddress": "Web address",
      "linkOpenInNewWindow": "Open link in new window",
      "linkText": "Text",
      "linkToolTip": "ToolTip",
      "linkWebAddress": "Web address",
      "search": "Search",
      "createTable": "Crear una tabla",
      "addColumnLeft": "Add column on the left",
      "addColumnRight": "Add column on the right",
      "addRowAbove": "Add row above",
      "addRowBelow": "Add row below",
      "deleteColumn": "Delete column",
      "deleteRow": "Delete row",
      "backColor": "Background color",
      "bold": "Bold",
      "createLink": "Insert hyperlink",
      "deleteFile": "Are you sure you want to delete \"{0}\"?",
      "directoryNotFound": "A directory with this name was not found.",
      "dropFilesHere": "drop files here to upload",
      "emptyFolder": "Empty Folder",
      "fontName": "Select font family",
      "fontNameInherit": "(inherited font)",
      "fontSize": "Select font size",
      "fontSizeInherit": "(inherited size)",
      "foreColor": "Color",
      "formatBlock": "Format",
      "indent": "Indent",
      "insertHtml": "Insert HTML",
      "insertImage": "Insert image",
      "insertOrderedList": "Insert ordered list",
      "insertUnorderedList": "Insert unordered list",
      "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
      "italic": "Italic",
      "justifyCenter": "Center text",
      "justifyFull": "Justify",
      "justifyLeft": "Align text left",
      "justifyRight": "Align text right",
      "linkOpenInNewWindow1": "Open link in new window",
      "linkText1": "Text",
      "linkToolTip1": "ToolTip",
      "linkWebAddress1": "Web address",
      "orderBy": "Arrange by:",
      "orderByName": "Name",
      "orderBySize": "Size",
      "outdent": "Outdent",
      "overwriteFile": "'A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
      "search1": "Search",
      "strikethrough": "Strikethrough",
      "styles": "Styles",
      "subscript": "Subscript",
      "superscript": "Superscript",
      "underline": "Underline",
      "unlink": "Remove hyperlink",
      "uploadFile": "Upload",
      "formatting": "Format",
      "viewHtml": "View HTML",
      "dialogUpdate": "Update",
      "insertFile": "Insert file"
    });
    }
    
    /* Scheduler messages */
    
    if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
    $.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
      "allDay": "todo el día",
      "cancel": "Cancelar",
      "editable": {
        "confirmation": "¿Está seguro que quiere eliminar este evento?"
      },
      "date": "Fecha",
      "destroy": "Eliminar",
      "editor": {
        "allDayEvent": "Todo el día",
        "description": "Descripción",
        "editorTitle": "Evento",
        "end": "Fin",
        "endTimezone": "Zona horaria de fin",
        "repeat": "Repetir",
        "separateTimezones": "Usar zonas horarias separadas para el inicio y el fin",
        "start": "Inicio",
        "startTimezone": "Zona horaria de inicio",
        "timezone": " ",
        "timezoneEditorButton": "Zona horaria",
        "timezoneEditorTitle": "Zonas horarias",
        "title": "Título",
        "noTimezone": "Sin zona horaria"
      },
      "event": "Evento",
      "recurrenceMessages": {
        "deleteRecurring": "¿Quiere eliminar esta ocurrencia del evento o la serie completa?",
        "deleteWindowOccurrence": "Eliminar ocurrencia actual",
        "deleteWindowSeries": "Eliminar la serie",
        "deleteWindowTitle": "Eliminar elemento recurrente",
        "editRecurring": "¿Quiere editar esta ocurrencia del evento o la serie completa?",
        "editWindowOccurrence": "Editar ocurrencia actual",
        "editWindowSeries": "Editar la serie",
        "editWindowTitle": "Editar elemento recurrente"
      },
      "save": "Guardar",
      "time": "Hora",
      "today": "Hoy",
      "views": {
        "agenda": "Agenda",
        "day": "Día",
        "month": "Mes",
        "week": "Semana",
        "workWeek": "Semana laboral"
      },
      "deleteWindowTitle": "Eliminar evento",
      "showFullDay": "Mostrar día completo",
      "showWorkDay": "Mostrar horas laborables"
    });
    }
    
    /* Upload messages */
    
    if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
    $.extend(true, kendo.ui.Upload.prototype.options.localization,{
      "cancel": "Cancelar",
      "dropFilesHere": "Arrastre los archivos aquí para subirlos",
      "headerStatusUploaded": "Completado",
      "headerStatusUploading": "Subiendo...",
      "remove": "Quitar",
      "retry": "Reintentar",
      "select": "Seleccione...",
      "statusFailed": "Error",
      "statusUploaded": "Completado",
      "statusUploading": "subiendo",
      "uploadSelectedFiles": "Subir archivos"
    });
    }
})(window.kendo.jQuery);
