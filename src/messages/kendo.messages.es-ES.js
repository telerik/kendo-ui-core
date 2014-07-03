

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
  "enum": {
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
  "sortDescending": "Orden descendiente",
  "settings": "Configuración de columnas",
  "done": "Hecho",
  "lock": "Cerrar",
  "unlock": "Descubrir"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "days(s)",
    "repeatEvery": "Repeat every:"
  },
  "end": {
    "after": "After",
    "occurrence": "occurrence(s)",
    "label": "End:",
    "never": "Never",
    "on": "On",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Daily",
    "monthly": "Monthly",
    "never": "Never",
    "weekly": "Weekly",
    "yearly": "Yearly"
  },
  "monthly": {
    "day": "Day",
    "interval": "month(s)",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:"
  },
  "offsetPositions": {
    "first": "first",
    "fourth": "fourth",
    "last": "last",
    "second": "second",
    "third": "third"
  },
  "weekly": {
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "week(s)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "year(s)"
  },
  "weekdays": {
    "day": "day",
    "weekday": "weekday",
    "weekend": "weekend day"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Añadir",
    "destroy": "Eliminar",
    "canceledit": "Cancelar",
    "update": "Actualizar",
    "edit": "Editar",
    "select": "Seleccionar",
    "cancel": "Cancelar Cambios",
    "save": "Salvar Cambios"
  },
  "editable": {
    "confirmation": "¿Está seguro de que quiere eliminar este registro?",
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
  "empty": "No hay datos.",
  "refresh": "Actualizar",
  "first": "Ir a la primera página",
  "itemsPerPage": "artículos por página",
  "last": "Ir a la última página",
  "next": "Ir a la página siguiente",
  "previous": "Ir a la página anterior",
  "morePages": "Mas paginas"
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
  "selectValue": "-Select value-"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arrastre un encabezado de columna y póngalo aquí para agrupar por ella"
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
  "allDay": "all day",
  "cancel": "Cancelar",
  "confirmation": "Are you sure you want to delete this event?",
  "date": "Date",
  "destroy": "Delete",
  "editor": {
    "allDayEvent": "All day event",
    "description": "Description",
    "editorTitle": "Event",
    "end": "End",
    "endTimezone": "End timezone",
    "repeat": "Repeat",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Start",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Time zone",
    "timezoneEditorTitle": "Timezones",
    "title": "Title",
    "noTimezone": "No timezone"
  },
  "event": "Event",
  "recurrenceMessages": {
    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
    "deleteWindowOccurrence": "Delete current occurrence",
    "deleteWindowSeries": "Delete the series",
    "deleteWindowTitle": "Delete Recurring Item",
    "editRecurring": "Do you want to edit only this event occurrence or the whole series?",
    "editWindowOccurrence": "Edit current occurrence",
    "editWindowSeries": "Edit the series",
    "editWindowTitle": "Edit Recurring Item"
  },
  "save": "Save",
  "time": "Time",
  "today": "Today",
  "views": {
    "agenda": "Agenda",
    "day": "Day",
    "month": "Month",
    "week": "Week",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Delete event",
  "showFullDay": "Show full day",
  "showWorkDay": "Show business hours"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Cancel",
  "dropFilesHere": "drop files here to upload",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading...",
  "remove": "Remove",
  "retry": "Retry",
  "select": "Select...",
  "statusFailed": "failed",
  "statusUploaded": "uploaded",
  "statusUploading": "uploading",
  "uploadSelectedFiles": "Upload files"
});
}