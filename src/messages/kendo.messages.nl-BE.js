(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Is gelijk aan",
    "gt": "Is na",
    "gte": "Is op of na",
    "lt": "Is voor",
    "lte": "Is op of voor",
    "neq": "Is ongelijk aan"
  },
  "enums": {
    "eq": "Is gelijk aan",
    "neq": "Is ongelijk aan"
  },
  "number": {
    "eq": "Is gelijk aan",
    "gt": "Is groter dan",
    "gte": "Is groter of gelijk aan",
    "lt": "Is kleiner dan",
    "lte": "Is kleiner of gelijk aan",
    "neq": "Is ongelijk aan"
  },
  "string": {
    "contains": "Bevat",
    "doesnotcontain": "Bevat niet",
    "endswith": "Eindigt op",
    "eq": "Is gelijk aan",
    "neq": "Is ongelijk aan",
    "startswith": "Begint met"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Is gelijk aan",
    "gt": "Is na",
    "gte": "Is op of na",
    "lt": "Is voor",
    "lte": "Is op of voor",
    "neq": "Is ongelijk aan"
  },
  "enums": {
    "eq": "Is gelijk aan",
    "neq": "Is ongelijk aan"
  },
  "number": {
    "eq": "Is gelijk aan",
    "gt": "Is groter dan",
    "gte": "Is groter of gelijk aan",
    "lt": "Is kleiner dan",
    "lte": "Is kleiner of gelijk aan",
    "neq": "Is ongelijk aan"
  },
  "string": {
    "contains": "Bevat",
    "doesnotcontain": "Bevat niet",
    "endswith": "Eindigt op",
    "eq": "Is gelijk aan",
    "neq": "Is ongelijk aan",
    "startswith": "Begint met"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Kolommen",
  "settings": "Kolom instellingen",
  "done": "Gereed",
  "sortAscending": "Sorteer Oplopend",
  "sortDescending": "Sorteer Aflopend",
  "lock": "Slot",
  "unlock": "Ontsluiten"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "dag(en)",
    "repeatEvery": "Herhaal elke"
  },
  "end": {
    "after": "Na",
    "label": "Eind:",
    "never": "Nooit",
    "occurrence": "gebeurtenis(sen)",
    "on": "Op",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Dagelijks",
    "monthly": "Maandelijks",
    "never": "Nooit",
    "weekly": "Wekelijks",
    "yearly": "Jaarlijks"
  },
  "monthly": {
    "day": "Dag",
    "interval": "maand(en)",
    "repeatEvery": "Herhaal elke:",
    "repeatOn": "Herhaal op:"
  },
  "offsetPositions": {
    "first": "eerste",
    "fourth": "vierde",
    "last": "laatste",
    "second": "tweede",
    "third": "derde"
  },
  "weekdays": {
    "day": "dag",
    "weekday": "doordeweekse dag",
    "weekend": "weekend dag"
  },
  "weekly": {
    "interval": "week/weken",
    "repeatEvery": "Herhaal elke:",
    "repeatOn": "Herhaal op:"
  },
  "yearly": {
    "interval": "jaar/jaren",
    "of": "van",
    "repeatEvery": "Herhaal elke:",
    "repeatOn": "Herhaal op:"
  }
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "addColumnLeft": "Voeg links kolom toe",
  "addColumnRight": "Voeg rechts kolom toe",
  "addRowAbove": "Rij boven toevoegen",
  "addRowBelow": "Rij onder toevoegen",
  "backColor": "Achtergrondkleur",
  "bold": "Vet",
  "createLink": "Hyperlink invoegen",
  "createTable": "Tabel maken",
  "deleteColumn": "Kolom verwijderen",
  "deleteFile": "Weet u zeker dat u het bestand \"{0}\" wilt verwijderen?",
  "deleteRow": "Rij verwijderen",
  "dialogButtonSeparator": "of",
  "dialogCancel": "Annuleren",
  "dialogInsert": "Invoegen",
  "directoryNotFound": "De map met deze naam is niet gevonden.",
  "dropFilesHere": "Sleep bestanden hier naar toe om te uploaden",
  "emptyFolder": "Lege map",
  "fontName": "Selecteer lettertype",
  "fontNameInherit": "(geërfd lettertype)",
  "fontSize": "Selecteer lettergrootte",
  "fontSizeInherit": "(geërfde lettergrootte)",
  "foreColor": "Kleur",
  "formatBlock": "Formaat",
  "formatting": "Formaat",
  "imageAltText": "Vervangende tekst",
  "imageWebAddress": "Webadres",
  "indent": "Inspringen",
  "insertHtml": "HTML toevoegen",
  "insertImage": "Afbeelding toevoegen",
  "insertOrderedList": "Georderde lijst toevoegen",
  "insertUnorderedList": "Ongeorderde lijst toevoegen",
  "invalidFileType": "Het geseleteceerde bestand \"{0}\" is niet geldig. De volgende bestandstypen worden ondersteund {1}.",
  "italic": "Cursief",
  "justifyCenter": "Tekst centreren",
  "justifyFull": "Uitvullen",
  "justifyLeft": "Tekst links uitlijnen",
  "justifyRight": "Tekst rechts uitlijnen",
  "linkOpenInNewWindow": "Open link in nieuw venster",
  "linkText": "Tekst",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Webadres",
  "orderBy": "Sorteer op:",
  "orderByName": "Naam",
  "orderBySize": "Grootte",
  "outdent": "Negatief inspringen",
  "overwriteFile": "Het bestand met naam \"{0}\" bestaat reeds in deze map. Wilt u het bestand overschrijven?",
  "search": "Zoek",
  "strikethrough": "Doorhalen",
  "styles": "Stijlen",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Onderstrepen",
  "unlink": "Hyperlink verwijderen",
  "uploadFile": "Upload bestand",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* Filter cell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Filter wissen",
  "filter": "Filter",
  "isFalse": "is niet waar",
  "isTrue": "is waar",
  "operator": "Operator"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "En",
  "cancel": "Annuleren",
  "clear": "Filter wissen",
  "filter": "Filter",
  "info": "Toon items met waarde:",
  "isFalse": "is niet waar",
  "isTrue": "is waar",
  "operator": "Operator",
  "or": "Of",
  "selectValue": "-Selecteer waarde-",
  "value": "Waarde"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Zoek"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Annuleren",
    "cancel": "Wijzigingen annuleren",
    "create": "Item toevoegen",
    "destroy": "Verwijderen",
    "edit": "Bewerken",
    "excel": "Export naar Excel",
    "pdf": "Export naar PDF",
    "save": "Wijzigingen opslaan",
    "select": "Selecteren",
    "update": "Bijwerken"
  },
  "editable": {
    "cancelDelete": "Annuleren",
    "confirmation": "Weet u zeker dat u dit item wilt verwijderen?",
    "confirmDelete": "Verwijderen"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Sleep een kolomtitel in dit vak om de kolom te groeperen."
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "items {0} - {1} van {2}",
  "empty": "Geen items om te tonen",
  "first": "Ga naar eerste pagina",
  "itemsPerPage": "items per pagina",
  "last": "Ga naar laatste pagina",
  "next": "Ga naar volgende pagina",
  "of": "van {0}",
  "page": "Pagina",
  "previous": "Ga naar vorige pagina",
  "refresh": "Verversen",
  "morePages": "Meer pagina"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Toon hele dag",
  "cancel": "Annuleren",
  "editable": {
    "confirmation": "Weet u zeker dat u deze afspraak wilt verwijderen?"
  },
  "date": "Datum",
  "deleteWindowTitle": "Afspraak verwijderen",
  "destroy": "Verwijderen",
  "editor": {
    "allDayEvent": "Duurt hele dag",
    "description": "Omschrijving",
    "editorTitle": "Afspraak",
    "end": "Eind",
    "endTimezone": "Eindtijd",
    "repeat": "Terugkeerpatroon",
    "separateTimezones": "Gebruik verschillende begin- en eindtijd",
    "start": "Start",
    "startTimezone": "Begintijd",
    "timezone": "Pas tijdschema aan",
    "timezoneEditorButton": "Tijdschema",
    "timezoneEditorTitle": "Tijdschema's",
    "title": "Onderwerp",
    "noTimezone": "No timezone"
  },
  "event": "Afspraak",
  "recurrenceMessages": {
    "deleteRecurring": "Wilt u alleen dit exemplaar uit de reeks verwijderen of wilt u de hele reeks verwijderen?",
    "deleteWindowOccurrence": "Verwijder exemplaar",
    "deleteWindowSeries": "Verwijder reeks",
    "deleteWindowTitle": "Verwijder terugkeerpatroon",
    "editRecurring": "Wilt u alleen dit exemplaar uit de reeks bewerken of wilt u de hele reeks bewerken?",
    "editWindowOccurrence": "Bewerken exemplaar",
    "editWindowSeries": "Bewerken reeks",
    "editWindowTitle": "Bewerken terugkeerpatroon"
  },
  "save": "Bewaren",
  "showFullDay": "Toon hele dag",
  "showWorkDay": "Toon werktijden",
  "time": "Tijd",
  "today": "Vandaag",
  "views": {
    "agenda": "Agenda",
    "day": "Dag",
    "month": "Maand",
    "week": "Week",
    "workWeek": "Work Week",
    "timeline": "Tijdlijn"
  }
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Annuleren",
  "dropFilesHere": "Sleep bestanden hier naartoe",
  "headerStatusUploaded": "Gereed",
  "headerStatusUploading": "Uploaden...",
  "remove": "Verwijderen",
  "retry": "Opnieuw",
  "select": "Selecteer",
  "statusFailed": "mislukt",
  "statusUploaded": "gelukt",
  "statusUploading": "bezig met uploaden",
  "uploadSelectedFiles": "Bestanden uploaden"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Sluiten"
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
  "cancel": "Annuleren"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annuleren"
});
}

})(window.kendo.jQuery);
