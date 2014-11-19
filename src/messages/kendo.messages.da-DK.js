

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Er lig med",
    "gte": "Er senere end eller lig med",
    "gt": "Er senere end",
    "lte": "Er før eller lig med",
    "lt": "Er før",
    "neq": "Er ikke lig med"
  },
  "number": {
    "eq": "Er lig med",
    "gte": "Er større end eller lig med",
    "gt": "Er større end",
    "lte": "Er mindre end eller lig med",
    "lt": "Er mindre end",
    "neq": "Er forskellig fra"
  },
  "string": {
    "endswith": "Slutter med",
    "eq": "Er lig med",
    "neq": "Er forskellig fra",
    "startswith": "Begynder med",
    "contains": "Indeholder",
    "doesnotcontain": "Does not contain"
  },
  "enums": {
    "eq": "Er lig med",
    "neq": "Er ikke lig med"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Er lig med",
    "gte": "Er senere end eller lig med",
    "gt": "Er senere end",
    "lte": "Er før eller lig med",
    "lt": "Er før",
    "neq": "Er ikke lig med"
  },
  "number": {
    "eq": "Er lig med",
    "gte": "Er større end eller lig med",
    "gt": "Er større end",
    "lte": "Er mindre end eller lig med",
    "lt": "Er mindre end",
    "neq": "Er forskellig fra"
  },
  "string": {
    "endswith": "Slutter med",
    "eq": "Er lig med",
    "neq": "Er forskellig fra",
    "startswith": "Begynder med",
    "contains": "Indeholder",
    "doesnotcontain": "Does not contain"
  },
  "enums": {
    "eq": "Er lig med",
    "neq": "Er ikke lig med"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Кolonner",
  "sortAscending": "Sorter Stigende",
  "sortDescending": "Sorter Faldende",
  "settings": "Kolonneindstillinger",
  "done": "Udført",
  "lock": "Lås",
  "unlock": "Låse"
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
    "create": "Indsæt",
    "destroy": "Slet",
    "canceledit": "Fortryd",
    "update": "Opdatér",
    "edit": "Redigér",
    "select": "Vælg",
    "cancel": "Fortryd ændringer",
    "save": "Gem ændringer"
  },
  "editable": {
    "confirmation": "Er du sikker på, at du ønsker at slette denne række?",
    "cancelDelete": "Annuller",
    "confirmDelete": "Slet"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "Side",
  "display": "Viser rækker {0} - {1} af {2}",
  "of": "af {0}",
  "empty": "Ingen rækker at vise.",
  "refresh": "Opdatér",
  "first": "Gå til første side",
  "itemsPerPage": "emner pr side",
  "last": "Gå til sidste side",
  "next": "Gå til næste side",
  "previous": "Gå til forrige side",
  "morePages": "Flere sider"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Filter",
  "clear": "Fjern filter",
  "isFalse": "er falskt",
  "isTrue": "er sandt",
  "operator": "Operatør"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filter",
  "and": "Og",
  "clear": "Fjern filter",
  "info": "Vis rækker med en værdi der",
  "selectValue": "-Vælg værdi-",
  "isFalse": "er falskt",
  "isTrue": "er sandt",
  "cancel": "Annuller",
  "operator": "Operatør",
  "value": "Value",
  "or": "Or"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Træk en kolonneoverskrift herover for at gruppére på den kolonne"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Fed",
  "createLink": "Indsæt link",
  "fontName": "Vælg font",
  "fontNameInherit": "(nedarvet font)",
  "fontSize": "Vælg font størrelse",
  "fontSizeInherit": "(nedarvet størrelse)",
  "formatBlock": "Vælg blok type",
  "indent": "Indryk",
  "insertHtml": "Indsæt HTML",
  "insertImage": "Indsæt billede",
  "insertOrderedList": "Indsæt ordnet liste",
  "insertUnorderedList": "Indsæt uordnet liste",
  "italic": "Kursiv",
  "justifyCenter": "Centrér tekst",
  "justifyFull": "Justér",
  "justifyLeft": "Venstrejustér tekst",
  "justifyRight": "Højrejustér tekst",
  "outdent": "Ryk ud",
  "strikethrough": "Gennemstreget",
  "styles": "Stilarter",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Understreget",
  "unlink": "Fjern link",
  "deleteFile": "Er du sikker på, at du ønsker at slette \"{0}\"?",
  "directoryNotFound": "En mappe med dette navn blev ikke fundet",
  "emptyFolder": "Tom mappe",
  "invalidFileType": "Den valgte fil \"{0}\" er ugyldig. Understøttede filtyper er {1}.",
  "orderBy": "Arrangér efter:",
  "orderByName": "Navn",
  "orderBySize": "Størrelse",
  "overwriteFile": "'En fil ved navn \"{0}\" eksisterer allerede i den aktuelle mappe. Ønsker du at overskrive den?",
  "uploadFile": "Upload",
  "backColor": "Baggrundsfarve",
  "foreColor": "Farve",
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
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "createTable": "Create table",
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
  "cancel": "Fortryd",
  "dropFilesHere": "Træk filer herover for at uploade dem",
  "remove": "Fjern",
  "retry": "Forsøg igen",
  "select": "Vælg...",
  "statusFailed": "fejlet",
  "statusUploaded": "uploadet",
  "statusUploading": "uploader",
  "uploadSelectedFiles": "Upload filer",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "Cancel",
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
