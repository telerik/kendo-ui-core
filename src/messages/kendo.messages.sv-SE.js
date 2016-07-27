(function ($, undefined) {
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
  "sortAscending": "Sortera stigande",
  "sortDescending": "Sortera fallande",
  "settings": "Kolumninställningar",
  "done": "Klar",
  "lock": "Lås",
  "unlock": "Lås upp"
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
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
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
  "allPages": "All",
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
  "addColumnLeft": "Lägg till vänsterkolumn",
  "addColumnRight": "Lägg till högerkolumn",
  "addRowAbove": "Lägg till rad ovanför",
  "addRowBelow": "Lägg till rad under",
  "deleteColumn": "Ta bort kolumn",
  "deleteRow": "Ta bort rad",
  "formatting": "Format",
  "viewHtml": "Visa HTML",
  "dialogUpdate": "Uppdatera",
  "insertFile": "Ange fil"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Hela dagen",
  "cancel": "Avbryt",
  "editable": {
    "confirmation": "Är du säker på att du vill ta bort tillfället?"
  },
  "date": "Datum",
  "destroy": "Ta bort",
  "editor": {
    "allDayEvent": "Heldagstillfälle",
    "description": "Beskrivning",
    "editorTitle": "Tillfälle",
    "end": "Slut",
    "endTimezone": "Sluttidszon",
    "repeat": "Upprepa",
    "separateTimezones":  "Använd separata start och sluttidszoner",
    "start": "Start",
    "startTimezone": "Starttidszon",
    "timezone": " ",
    "timezoneEditorButton": "Tidszon",
    "timezoneEditorTitle": "Tidszoner",
    "title": "Titel",
    "noTimezone": "Ingen tidszon"
  },
  "event": "Tillfälle",
  "recurrenceMessages": {
    "deleteRecurring": "Vill du ta bort enbart detta tillfället eller hela serien?",
    "deleteWindowOccurrence": "Ta bort nuvarande upprepning",
    "deleteWindowSeries": "Ta bort serien",
    "deleteWindowTitle": "Ta bort återkommande objekt",
    "editRecurring": "Vill du redigera enbart detta tillfälle eller hela serien?",
    "editWindowOccurrence": "Redigera återkommade tillfälle",
    "editWindowSeries": "Redigera serie",
    "editWindowTitle": "Redigera återkommande objekt"
  },
  "save": "Spara",
  "time": "Tid",
  "today": "Idag",
  "views": {
    "agenda": "Agenda",
    "day": "Dag",
    "month": "Månad",
    "week": "Vecka",
    "workWeek": "Arbetsvecka"
  },
  "deleteWindowTitle": "Ta bort tillfälle",
  "showFullDay": "Visa heldag",
  "showWorkDay": "Visa arbetsdag"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Stänga"
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
  "cancel": "Avbryt"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Avbryt"
});
}

})(window.kendo.jQuery);
