

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Egal cu",
    "gt": "După",
    "gte": "După sau egal cu",
    "lt": "Inainte de",
    "lte": "Inainte sau egal cu",
    "neq": "Diferit de"
  },
  "enums": {
    "eq": "Egal cu",
    "neq": "Diferit de"
  },
  "number": {
    "eq": "Egal cu",
    "gt": "Mai mare decât",
    "gte": "Mai mare sau egal cu",
    "lt": "Mai mic decât",
    "lte": "Mai mic sau egal cu",
    "neq": "Diferit de"
  },
  "string": {
    "contains": "Conține",
    "doesnotcontain": "Nu conține",
    "endswith": "Se termină cu",
    "eq": "Egal cu",
    "neq": "Diferit de",
    "startswith": "Incepe cu"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Egal cu",
    "gt": "După",
    "gte": "După sau egal cu",
    "lt": "Inainte de",
    "lte": "Inainte sau egal cu",
    "neq": "Diferit de"
  },
  "enums": {
    "eq": "Egal cu",
    "neq": "Diferit de"
  },
  "number": {
    "eq": "Egal cu",
    "gt": "Mai mare decât",
    "gte": "Mai mare sau egal cu",
    "lt": "Mai mic decât",
    "lte": "Mai mic sau egal cu",
    "neq": "Diferit de"
  },
  "string": {
    "contains": "Conține",
    "doesnotcontain": "Nu conține",
    "endswith": "Se termină cu",
    "eq": "Egal cu",
    "neq": "Diferit de",
    "startswith": "Incepe cu"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Coloane",
  "sortAscending": "Sortare ascendentă",
  "sortDescending": "Sortare descendentă",
  "settings": "Setări coloana",
  "done": "Făcut",
  "lock": "Blocare",
  "unlock": "Descuia"
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

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "backColor": "Culoare fundal",
  "bold": "Bold",
  "createLink": "Inserează hyperlink",
  "deleteFile": "Sigur doriți să ștergeți \" {0} \" ?",
  "dialogButtonSeparator": "sau",
  "dialogCancel": "Anulează",
  "dialogInsert": "Inserează",
  "directoryNotFound": "Nu a fost găsit un director cu acest nume.",
  "dropFilesHere": "plasați fișierele aici pentru încărcare",
  "emptyFolder": "Dosar gol",
  "fontName": "Selectează familia de fonturi",
  "fontNameInherit": "(font moștenit)",
  "fontSize": "Selectează dimensiunea fontului",
  "fontSizeInherit": "(dimensiune moștenită)",
  "foreColor": "Culoare",
  "formatBlock": "Format",
  "imageAltText": "Text alternativ",
  "imageWebAddress": "Adresă Web",
  "indent": "Indentare",
  "insertHtml": "Inserează HTML",
  "insertImage": "Inserează imagine",
  "insertOrderedList": "Inserează listă ordonată",
  "insertUnorderedList": "Inserează listă neordonată",
  "invalidFileType": "Fișierul selectat \"{0}\" nu este valid. Tipurile de fișiere acceptate sunt {1}.",
  "italic": "Cursiv",
  "justifyCenter": "Centrează textul",
  "justifyFull": "Aliniază textul",
  "justifyLeft": "Aliniază textul la stânga",
  "justifyRight": "Aliniază textul la dreapta",
  "linkOpenInNewWindow": "Deschide link-ul într-o fereastră nouă",
  "linkText": "Text",
  "linkToolTip": "Indiciu",
  "linkWebAddress": "Adresă Web",
  "orderBy": "Ordonare după:",
  "orderByName": "Nume",
  "orderBySize": "Dimensiune",
  "outdent": "Anulare indentare",
  "overwriteFile": "Există deja un fișier cu numele \" {0} \" în directorul curent. Doriți să-l suprascrieți ?",
  "search": "Caută",
  "strikethrough": "Tăiat",
  "styles": "Stiluri",
  "subscript": "Indice",
  "superscript": "Exponent",
  "underline": "Subliniat",
  "unlink": "Elimină hyperlink",
  "uploadFile": "Upload fișier",
  "createTable": "Inserează tabelelor",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Șterge",
  "filter": "Filtrează",
  "isFalse": "este fals",
  "isTrue": "este adevărat",
  "operator": "Operator"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Și",
  "clear": "Șterge",
  "filter": "Filtrează",
  "info": "Criterii filtrare:",
  "isFalse": "este fals",
  "isTrue": "este adevărat",
  "or": "Sau",
  "selectValue": "- Selectează valoare -",
  "cancel": "Anulează",
  "operator": "Operator",
  "value": "Valoare"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Anulează",
    "cancel": "Anulează modificările",
    "create": "Adaugă element nou",
    "destroy": "Șterge",
    "edit": "Modifică",
    "save": "Salvează modificările",
    "select": "Selectează",
    "update": "Actualizează"
  },
  "editable": {
    "confirmation": "Sigur doriți să ștergeți acest element ?",
    "cancelDelete": "Anulează",
    "confirmDelete": "Șterge"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Trageți un antet de coloană și plasați-l aici pentru a grupa după acea coloană"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "display": "{0} - {1} din {2} elemente",
  "empty": "Nu există elemente pentru afișare",
  "first": "Prima pagină",
  "itemsPerPage": "elemente per pagină",
  "last": "Ultima pagină",
  "next": "Pagina următoare",
  "of": "din {0}",
  "page": "Pagina",
  "previous": "Pagina precedentă",
  "refresh": "Actualizează",
  "morePages": "Mai multe pagini"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "Anulează",
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
  "cancel": "Anulează",
  "dropFilesHere": "plasați fișierele aici pentru încărcare",
  "remove": "Elimină",
  "retry": "Incearcă din nou",
  "select": "Selectează...",
  "statusFailed": "eșuat",
  "statusUploaded": "încărcat",
  "statusUploading": "încarcă",
  "uploadSelectedFiles": "Încărcă fișierele",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}
