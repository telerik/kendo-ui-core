

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Igual",
    "gte": "Maior ou igual que",
    "gt": "Maior que",
    "lte": "Menor ou igual que",
    "lt": "Menor que",
    "neq": "Diferente"
  },
  "enum": {
    "eq": "Igual",
    "neq": "Diferente"
  },
  "number": {
    "eq": "Igual",
    "gte": "Maior ou igual que",
    "gt": "Maior que",
    "lte": "Menor ou igual que",
    "lt": "Menor que",
    "neq": "Diferente"
  },
  "string": {
    "endswith": "A acabar em",
    "eq": "Igual",
    "neq": "Diferente",
    "startswith": "A comecar com",
    "contains": "Contem",
    "doesnotcontain": "Does not contain"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colunas",
  "sortAscending": "Ordenar Ascendente",
  "sortDescending": "Ordenar Descendente",
  "settings": "Definições da Coluna",
  "done": "Feito",
  "lock": "Travar",
  "unlock": "Destravar"
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
    "create": "Inserir",
    "canceledit": "Cancelar",
    "destroy": "Apagar",
    "edit": "Editar",
    "select": "Seleccionar",
    "update": "Actualizar",
    "cancel": "Cancel Changes",
    "save": "Save Changes"
  },
  "editable": {
    "confirmation": "Pretende remover o registo?",
    "cancelDelete": "Cancelar",
    "confirmDelete": "Apagar"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "display": "Registos {0} - {1} de {2}",
  "empty": "No records to display.",
  "page": "Pagina",
  "of": "de {0}",
  "refresh": "Actualizar",
  "first": "Ir para a primeira página",
  "itemsPerPage": "itens por página",
  "last": "Ir para a última página",
  "next": "Ir para a próxima página",
  "previous": "Vá para a página anterior",
  "morePages": "Mais páginas"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filtro",
  "and": "e",
  "clear": "Limpar",
  "selectValue": "-Seleccione um item-",
  "info": "Motrar as linhas com o valor",
  "or": "Or",
  "cancel": "Cancelar",
  "operator": "Operador",
  "value": "Valor",
  "isFalse": "is false",
  "isTrue": "is true"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arraste uma coluna para este espaco para agrupar pelo valor da mesma..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Negrito",
  "createLink": "Inserir hyperlink",
  "fontName": "Tipo de Letra",
  "fontNameInherit": "(tipo de letra herdado)",
  "fontSize": "Tamanho do Tipo de Letra",
  "fontSizeInherit": "(tamanho herdado)",
  "formatBlock": "Tipo de Bloco",
  "indent": "Aumentar Avanço",
  "insertHtml": "Inserir HTML",
  "insertImage": "Inserir Imagem",
  "insertOrderedList": "Inserir lista ordenada",
  "insertUnorderedList": "Inserir lista com marcas",
  "italic": "Itálico",
  "justifyCenter": "Centrar o texto",
  "justifyFull": "Justificar",
  "justifyLeft": "Alinhar o texto à esquerda",
  "justifyRight": "Alimhar o texto à direita",
  "outdent": "Diminuir Avanço",
  "strikethrough": "Rasurado",
  "styles": "Estilos",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Sublinhado",
  "unlink": "Remover hyperlink",
  "deleteFile": "Tem a certeza que deseja eliminar \"{0}\"?",
  "directoryNotFound": "Não foi encontrada nenhuma directoria com este nome.",
  "emptyFolder": "Pasta vazia",
  "invalidFileType": "O ficheiro seleccionado \"{0}\" não é válido. Os tipos de ficheiro suportados são {1}.",
  "orderBy": "Ordenar por:",
  "orderByName": "Nome",
  "orderBySize": "Tamanho",
  "overwriteFile": "Já existe um ficheiro com o nome \"{0}\"nesta localização. Deseja substituir o ficheiro existente?",
  "uploadFile": "Enviar",
  "backColor": "Cor de Fundo",
  "foreColor": "Cor",
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
  "createTable": "Criar a tabela",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "dropFilesHere": "drop files here to upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Cancelar",
  "dropFilesHere": "arrastar para aqui os ficheiros a enviar",
  "remove": "Remover",
  "retry": "Repetir",
  "select": "Seleccionar...",
  "statusFailed": "falhou",
  "statusUploaded": "enviado",
  "statusUploading": "enviando",
  "uploadSelectedFiles": "Enviar ficheiros",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
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