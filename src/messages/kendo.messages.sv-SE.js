(function($, undefined) {

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

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
  kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
          "checkAll": "Markera alla",
          "clear": "Rensa",
          "filter": "Filtrera",
          "search": "Sök",
          "selectedItemsFormat": "{0} alternativ valt"
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
    "interval": "dag(ar)",
    "repeatEvery": "Återkommer varje:"
  },
  "end": {
    "after": "Efter",
    "occurrence": "förekomst(er)",
    "label": "Slut:",
    "never": "Aldrig",
    "on": "På",
    "mobileLabel": "Slutar"
  },
  "frequencies": {
    "daily": "Daglig",
    "monthly": "Månatlig",
    "never": "Aldrig",
    "weekly": "Veckovis",
    "yearly": "Årlig"
  },
  "monthly": {
    "day": "Dag",
    "interval": "månad(er)",
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:"
  },
  "offsetPositions": {
    "first": "första",
    "fourth": "fjärde",
    "last": "sista",
    "second": "andra",
    "third": "tredje"
  },
  "weekly": {
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:",
    "interval": "vecka(or)"
  },
  "yearly": {
    "of": "av",
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:",
    "interval": "år"
  },
  "weekdays": {
    "day": "dag",
    "weekday": "veckodag",
    "weekend": "helgdag"
  }
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Släpp data fält här",
  "columnFields": "Släpp kolumnfält här",
  "rowFields": "Släpp radfält här"
});
}

  /* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Visa objekt med värden som:",
  "filterFields": "Filtrera fält",
  "filter": "Filtrera",
  "include": "Inkludera fält...",
  "title": "Fält att inkludera",
  "clear": "Rensa",
  "ok": "Ok",
  "cancel": "Avbryt",
  "operators": {
    "contains": "Contains",
    "doesnotcontain": "Does not contain",
    "startswith": "Starts with",
    "endswith": "Ends with",
    "eq": "Is equal to",
    "neq": "Is not equal to"
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
  "title": "Visa poster med värde",
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
  "allPages": "Allt",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Alla",
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
  "headerStatusUploaded": "Uppladdad",
  "headerStatusUploading": "Laddar upp..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Fet",
  "search": "Sök",
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
  "style": "Stil",
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
  "search": "Sök...",
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
    "separateTimezones": "Använd separata start och sluttidszoner",
    "start": "Start",
    "startTimezone": "Starttidszon",
    "timezone": "Tidszon",
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
    "editWindowOccurrence": "Redigera återkommande tillfälle",
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
  "close": "Stäng"
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
