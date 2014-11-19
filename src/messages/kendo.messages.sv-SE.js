

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Är lika med",
    "gt": "Är senare än",
    "gte": "Är lika eller senare än",
    "lt": "Är tidigare än",
    "lte": "Är lika eller tidigare än",
    "neq": "Är inte lika med"
  },
  "number": {
    "eq": "Är lika med",
    "gt": "Är större än",
    "gte": "Är lika eller större än",
    "lt": "Är mindre än",
    "lte": "Är lika eller mindre än",
    "neq": "Är inte lika med"
  },
  "string": {
    "contains": "Innehåller",
    "doesnotcontain": "Innehåller inte",
    "endswith": "Slutar med",
    "eq": "Är lika med",
    "neq": "Är inte lika med",
    "startswith": "Börjar med"
  },
  "enums": {
    "eq": "Är lika med",
    "neq": "Är inte lika med"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Är lika med",
    "gt": "Är senare än",
    "gte": "Är lika eller senare än",
    "lt": "Är tidigare än",
    "lte": "Är lika eller tidigare än",
    "neq": "Är inte lika med"
  },
  "number": {
    "eq": "Är lika med",
    "gt": "Är större än",
    "gte": "Är lika eller större än",
    "lt": "Är mindre än",
    "lte": "Är lika eller mindre än",
    "neq": "Är inte lika med"
  },
  "string": {
    "contains": "Innehåller",
    "doesnotcontain": "Innehåller inte",
    "endswith": "Slutar med",
    "eq": "Är lika med",
    "neq": "Är inte lika med",
    "startswith": "Börjar med"
  },
  "enums": {
    "eq": "Är lika med",
    "neq": "Är inte lika med"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Kolumner",
  "sortAscending": "Sortera fallande",
  "sortDescending": "Sortera stigande",
  "settings": "Kolumninställningar",
  "done": "Klar",
  "lock": "Закључати",
  "unlock": "Откључати"
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

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Rensa",
  "filter": "Filtrera",
  "isFalse": "är falskt",
  "isTrue": "är sant",
  "operator": "Operatör"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Och",
  "clear": "Rensa",
  "filter": "Filtrera",
  "info": "Visa poster med värde:",
  "isFalse": "är falskt",
  "isTrue": "är sant",
  "or": "Eller",
  "selectValue": "-Välj-",
  "cancel": "Avbryt",
  "operator": "Operatör",
  "value": "Värde"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Avbryt",
    "cancel": "Avbryt ändringar",
    "create": "Lägg till post",
    "destroy": "Radera",
    "edit": "Ändra",
    "save": "Spara ändringar",
    "select": "Välj",
    "update": "Spara"
  },
  "editable": {
    "confirmation": "Är du säker på att du vill radera denna post?",
    "cancelDelete": "Avbryt",
    "confirmDelete": "Radera"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Dra en kolumnrubrik hit för att sortera på den kolumnen"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "display": "{0} - {1} av {2} poster",
  "empty": "Det finns inga poster",
  "first": "Gå till första sidan",
  "itemsPerPage": "poster per sida",
  "last": "Gå till sista sidan",
  "next": "Gå till nästa sida",
  "of": "av {0}",
  "page": "Sida",
  "previous": "Gå till föregående sida",
  "refresh": "Uppdatera",
  "morePages": "Fler sidor"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Avbryt",
  "retry": "Försök igen",
  "select": "Välj...",
  "remove": "Ta bort",
  "uploadSelectedFiles": "Ladda upp filer",
  "dropFilesHere": "släpp filer här för att ladda upp",
  "statusFailed": "misslyckades",
  "statusUploaded": "uppladdad",
  "statusUploading": "laddar upp",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Fet",
  "createLink": "Lägg till länk",
  "fontName": "Välj typsnitt",
  "fontNameInherit": "(ärvt typsnitt)",
  "fontSize": "Välj storlek",
  "fontSizeInherit": "(ärvd storlek)",
  "formatBlock": "Formatering",
  "indent": "Öka indrag",
  "insertHtml": "Lägg till HTML",
  "insertImage": "Lägg till bild",
  "insertOrderedList": "Lägg till numrerad lista",
  "insertUnorderedList": "Lägg till punktlista",
  "italic": "Kursiv",
  "justifyCenter": "Centrerad text",
  "justifyFull": "Marginaljusterad text",
  "justifyLeft": "Vänsterjusterad text",
  "justifyRight": "Högerjusterad text",
  "outdent": "Minska indrag",
  "strikethrough": "Genomstruken",
  "styles": "Stil",
  "subscript": "Nedsänkt",
  "superscript": "Upphöjd",
  "underline": "Understruken",
  "unlink": "Ta bort länk",
  "deleteFile": "Är du säker på att du vill radera \"{0}\"?",
  "directoryNotFound": "En mapp med detta namn hittades ej.",
  "emptyFolder": "Tom mapp",
  "invalidFileType": "Filen \"{0}\" är inte giltig. Tillåtna filtyper är {1}.",
  "orderBy": "Sortera på:",
  "orderByName": "Namn",
  "orderBySize": "Storlek",
  "overwriteFile": "'En fil med namn \"{0}\" finns redan i aktuell mapp. Vill du skriva över den?",
  "uploadFile": "Ladda upp",
  "backColor": "Bakgrundsfärg",
  "foreColor": "Färg",
  "dropFilesHere": "släpp filer här för att ladda upp",
  "dialogButtonSeparator": "eller",
  "dialogCancel": "Avbryt",
  "dialogInsert": "Lägg till",
  "imageAltText": "Alternativ text",
  "imageWebAddress": "Webbadress",
  "linkOpenInNewWindow": "Öppna länk i ett nytt fönster",
  "linkText": "Text",
  "linkToolTip": "Skärmtips",
  "linkWebAddress": "Webbadress",
  "search": "Search",
  "createTable": "Skapa tabell",
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

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "Avbryt",
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
