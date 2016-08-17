(function ($, undefined) {
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
    "doesnotcontain": "Ikke indeholder"
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
    "neq": "Er forskellig fra"
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
    "doesnotcontain": "Ikke indeholder"
  },
  "enums": {
    "eq": "Er lig med",
    "neq": "Er ikke lig med"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Søg"
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
  "unlock": "Lås op"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "days(s)",
    "repeatEvery": "Gentag hver:"
  },
  "end": {
    "after": "Efter",
    "occurrence": "forekomst(er)",
    "label": "Slut:",
    "never": "Aldrig",
    "on": "Den",
    "mobileLabel": "Slutter"
  },
  "frequencies": {
    "daily": "Daglig",
    "monthly": "Månedlig",
    "never": "Aldrig",
    "weekly": "Ugentlig",
    "yearly": "Årlig"
  },
  "monthly": {
    "day": "Dag",
    "interval": "måned(er)",
    "repeatEvery": "Gentag hver:",
    "repeatOn": "Gentag den:"
  },
  "offsetPositions": {
    "first": "første",
    "fourth": "fjerde",
    "last": "sidste",
    "second": "anden",
    "third": "tredje"
  },
  "weekly": {
    "repeatEvery": "Gentag hver:",
    "repeatOn": "Gentag den:",
    "interval": "uge(r)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Gentag hvert:",
    "repeatOn": "Gentag den:",
    "interval": "år"
  },
  "weekdays": {
    "day": "dag",
    "weekday": "ugedag",
    "weekend": "weekend dag"
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
    "excel": "Eksportér til Excel",
    "pdf": "Eksportér til PDF",
    "select": "Vælg",
    "cancel": "Fortryd ændringer",
    "save": "Gem ændringer"
  },
  "editable": {
    "confirmation": "Er du sikker på, at du ønsker at slette denne række?",
    "cancelDelete": "Annullér",
    "confirmDelete": "Slet"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
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
  "clear": "Nulstil",
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
  "clear": "Nulstil",
  "info": "Vis rækker som",
  "selectValue": "-Vælg værdi-",
  "isFalse": "er falskt",
  "isTrue": "er sandt",
  "cancel": "Annuller",
  "operator": "Operator",
  "value": "Value",
  "or": "Eller"
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
  "subscript": "Sænket skrift",
  "superscript": "Hævet skrift",
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
  "dialogButtonSeparator": "eller",
  "dialogCancel": "Fortryd",
  "dialogInsert": "Insæt",
  "imageAltText": "Alternativ tekst",
  "imageWebAddress": "Web adresse",
  "linkOpenInNewWindow": "Åben link i nyt vindue",
  "linkText": "Tekst",
  "linkToolTip": "Tooltip",
  "linkWebAddress": "Web adresse",
  "search": "Søg",
  "addColumnLeft": "Tilføj kolonne til venstre",
  "addColumnRight": "Tilføj kolonne til højre",
  "addRowAbove": "Tilføj kolonne over",
  "addRowBelow": "Tilføj kolonne under",
  "deleteColumn": "Slet kolonne",
  "deleteRow": "Slet række",
  "createTable": "Opret tabel",
  "dropFilesHere": "træk og slip filer for at uploade",
  "formatting": "Formatér",
  "viewHtml": "Vis HTML",
  "dialogUpdate": "Opdater",
  "insertFile": "Indsæt fil"
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
  "headerStatusUploaded": "Færdig",
  "headerStatusUploading": "Uploader..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "hele dagen",
  "cancel": "Fortryd",
  "editable": {
    "confirmation": "Er du sikker på at du vil slette denne begivenhed?"
  },
  "date": "Dato",
  "destroy": "Slet",
  "editor": {
    "allDayEvent": "Hele dagen",
    "description": "Beskrivelse",
    "editorTitle": "Begivenhed",
    "end": "Slut",
    "endTimezone": "Slut tidszone",
    "repeat": "Gentag",
    "separateTimezones": "Brug forskellige start og slut tidszoner",
    "start": "Start",
    "startTimezone": "Start tidszone",
    "timezone": " ",
    "timezoneEditorButton": "Tidszone",
    "timezoneEditorTitle": "Tidszoner",
    "title": "Titel",
    "noTimezone": "Ingen tidszone"
  },
  "event": "Begivenhed",
  "recurrenceMessages": {
    "deleteRecurring": "Vil du kun slette denne hændelse eller hele serien?",
    "deleteWindowOccurrence": "Slet denne hændelse",
    "deleteWindowSeries": "Slet hele serien",
    "deleteWindowTitle": "Slet tilbagevendende hændelse",
    "editRecurring": "Vil du kun redigere denne hændelse eller hele serien?",
    "editWindowOccurrence": "Rediger denne hændelse",
    "editWindowSeries": "Rediger hele serien",
    "editWindowTitle": "Rediger tilbagevendende hændelse"
  },
  "save": "Gem",
  "time": "Tid",
  "today": "I dag",
  "views": {
    "agenda": "Agenda",
    "day": "Dag",
    "month": "Måned",
    "week": "Uge",
    "workWeek": "Arbejdsuge",
    "timeline": "Tidslinie"
  },
  "deleteWindowTitle": "Slet begivenhed",
  "showFullDay": "Vis hel dag",
  "showWorkDay": "Vis arbejdsdag"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization,{
  "close": "Lukke"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization,{
  "okText": "Okay"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization,{
  "okText": "Okay",
  "cancel": "Annuller"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization,{
  "okText": "Okay",
  "cancel": "Annuller"
});
}

})(window.kendo.jQuery);
