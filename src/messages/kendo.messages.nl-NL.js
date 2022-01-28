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
  "title": "Toon items met waarde",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
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

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Alle grenzen",
  "insideBorders": "Binnen grenzen",
  "insideHorizontalBorders": "Binnen horizontale randen",
  "insideVerticalBorders": "Binnen verticale randen",    
  "outsideBorders": "buiten grenzen",
  "leftBorder": "Linkerrand",
  "topBorder": "Bovenrand",
  "rightBorder": "rechterrand",
  "bottomBorder": "Onderrand",
  "noBorders": "Geen grens",
  "reset": "Kleur resetten",
  "customColor": "Aangepaste kleur...",
  "apply": "Van toepassing zijn",
  "cancel": "Annuleren"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Van toepassing zijn",
  "save": "Sparen",
  "cancel": "Annuleren",
  "remove": "Verwijderen",
  "retry": "Opnieuw proberen",
  "revert": "Terugdraaien",
  "okText": "oke",
  "formatCellsDialog": {
    "title": "Formaat",
    "categories": {
      "number": "Nummer",
      "currency": "Munteenheid",
      "date": "Datum"
    }
  },
  "fontFamilyDialog": {
    "title": "Lettertype"
  },
  "fontSizeDialog": {
    "title": "Lettertypegrootte"
  },
  "bordersDialog": {
    "title": "grenzen"
  },
  "alignmentDialog": {
    "title": "Uitlijning",
    "buttons": {
      "justtifyLeft": "Links uitlijnen",
      "justifyCenter": "Centrum",
      "justifyRight": "Rechts uitlijnen",
      "justifyFull": "Verantwoorden",
      "alignTop": "Boven uitlijnen",
      "alignMiddle": "Midden uitlijnen",
      "alignBottom": "Onderuit uitlijnen"
    }
  },
  "mergeDialog": {
    "title": "Cellen samenvoegen",
    "buttons": {
      "mergeCells": "Alles samenvoegen",
      "mergeHorizontally": "Horizontaal samenvoegen",
      "mergeVertically": "Verticaal samenvoegen",
      "unmerge": "Samenvoegen opheffen"
    }
  },
  "freezeDialog": {
    "title": "Ruiten bevriezen",
    "buttons": {
      "freezePanes": "Ruiten bevriezen",
      "freezeRows": "Rijen bevriezen",
      "freezeColumns": "Kolommen bevriezen",
      "unfreeze": "Ruiten deblokkeren"
    }
  },
  "confirmationDialog": {
    "text": "Weet u zeker dat u dit blad wilt verwijderen?",
    "title": "Blad verwijderen"
  },
  "validationDialog": {
    "title": "Gegevensvalidatie",
    "hintMessage": "Voer een geldige {0}-waarde {1} in.",
    "hintTitle": "Validatie {0}",
    "criteria": {
      "any": "Elke waarde",
      "number": "Nummer",
      "text": "Tekst",
      "date": "Datum",
      "custom": "Aangepaste formule",
      "list": "Lijst"
    },
    "comparers": {
      "greaterThan": "groter dan",
      "lessThan": "minder dan",
      "between": "tussen",
      "notBetween": "niet tussen",
      "equalTo": "gelijk aan",
      "notEqualTo": "niet gelijk aan",
      "greaterThanOrEqualTo": "groter dan of gelijk aan",
      "lessThanOrEqualTo": "minder dan of gelijk aan"
    },
    "comparerMessages": {
      "greaterThan": "groter dan {0}",
      "lessThan": "minder dan {0}",
      "between": "tussen {0} en {1}",
      "notBetween": "niet tussen {0} en {1}",
      "equalTo": "gelijk aan {0}",
      "notEqualTo": "niet gelijk aan {0}",
      "greaterThanOrEqualTo": "groter dan of gelijk aan {0}",
      "lessThanOrEqualTo": "kleiner dan of gelijk aan {0}",
      "custom": "die voldoet aan de formule: {0}"
    },
    "labels": {
      "criteria": "criteria",
      "comparer": "vergelijker",
      "min": "min",
      "max": "Max",
      "value": "Waarde",
      "start": "Begin",
      "end": "Einde",
      "onInvalidData": "Op ongeldige gegevens",
      "rejectInput": "Invoer weigeren",
      "showWarning": "Toon waarschuwing",
      "showHint": "Toon hint",
      "hintTitle": "Tip titel",
      "hintMessage": "hint bericht",
      "ignoreBlank": "Negeer leeg"
    },
    "placeholders": {
      "typeTitle": "Typ titel",
      "typeMessage": "Typ bericht"
    }
  },
  "exportAsDialog": {
    "title": "Exporteren...",
    "labels": {
      "fileName": "Bestandsnaam",
      "saveAsType": "Opslaan als type",
      "exportArea": "Exporteren",
      "paperSize": "Papiergrootte",
      "margins": "Marges",
      "orientation": "Oriëntatie",
      "print": "Afdrukken",
      "guidelines": "Richtlijnen",
      "center": "Centrum",
      "horizontally": "horizontaal",
      "vertically": "Verticaal"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Kan een deel van een samengevoegde cel niet wijzigen."
  },
  "useKeyboardDialog": {
    "title": "Kopiëren en plakken",
    "errorMessage": "Deze acties kunnen niet via het menu worden aangeroepen. Gebruik in plaats daarvan de sneltoetsen:",
    "labels": {
      "forCopy": "voor kopiëren",
      "forCut": "voor knippen",
      "forPaste": "voor plakken"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Die actie kan niet worden uitgevoerd op meervoudige selectie."     
  },
  "insertCommentDialog": {
    "title": "Opmerking invoegen",
    "labels": {
      "comment": "Commentaar",
      "removeComment": "Reactie verwijderen"
    }
  },
  "insertImageDialog": {
    "title": "Voeg afbeelding in",
    "info": "Sleep een afbeelding hierheen, of klik om te selecteren",
    "typeError": "Selecteer een JPEG-, PNG- of GIF-afbeelding"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sorteerbereik A tot Z",
  "sortDescending": "Sorteerbereik Z tot A",
  "filterByValue": "Filteren op waarde",
  "filterByCondition": "Filteren op voorwaarde",
  "apply": "Van toepassing zijn",
  "search": "Zoekopdracht",
  "addToCurrent": "Toevoegen aan huidige selectie",
  "clear": "Duidelijk",
  "blanks": "(blanco)",
  "operatorNone": "Geen",
  "and": "EN",
  "or": "OF",
  "operators": {
    "string": {
      "contains": "Tekst bevat",
      "doesnotcontain": "Tekst bevat geen",
      "startswith": "Tekst begint met",
      "endswith": "Tekst eindigt met"
    },
    "date": {
      "eq": "Datum is",
      "neq": "Datum is niet",
      "lt": "Datum is voor",
      "gt": "Datum is na"
    },
    "number": {
      "eq": "Is gelijk aan",
      "neq": "Is niet gelijk aan",
      "gte": "Is groter dan of gelijk aan",
      "gt": "Is groter dan",
      "lte": "Is kleiner dan of gelijk aan",
      "lt": "Is minder dan"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Kleur resetten",
  "customColor": "Aangepaste kleur...",
  "apply": "Van toepassing zijn",
  "cancel": "Annuleren"
});
}
  
if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Kolom links toevoegen",
  "addColumnRight": "Kolom rechts toevoegen",
  "addRowAbove": "Rij hierboven toevoegen",
  "addRowBelow": "Rij hieronder toevoegen",
  "alignment": "Uitlijning",
  "alignmentButtons": {
    "justtifyLeft": "Links uitlijnen",
    "justifyCenter": "Centrum",
    "justifyRight": "Rechts uitlijnen",
    "justifyFull": "Verantwoorden",
    "alignTop": "Boven uitlijnen",
    "alignMiddle": "Midden uitlijnen",
    "alignBottom": "Onderuit uitlijnen"
  },
  "backgroundColor": "Achtergrond",
  "bold": "Stoutmoedig",
  "borders": "grenzen",
  "colorPicker": {
    "reset": "Kleur resetten",
    "customColor": "Aangepaste kleur..."
  },
  "copy": "Kopiëren",
  "cut": "Snee",
  "deleteColumn": "Kolom verwijderen",
  "deleteRow": "Verwijder rij",
  "excelImport": "Importeren uit Excel...",
  "filter": "Filter",
  "fontFamily": "Lettertype",
  "fontSize": "Lettertypegrootte",
  "format": "Aangepast formaat...",
  "formatTypes": {
    "automatic": "automatisch",
    "number": "Nummer",
    "percent": "procent",
    "financial": "financieel",
    "currency": "Munteenheid",
    "date": "Datum",
    "time": "Tijd",
    "dateTime": "Datum Tijd",
    "duration": "Looptijd",
    "moreFormats": "Meer formaten..."
  },
  "formatDecreaseDecimal": "Decimaal verlagen",
  "formatIncreaseDecimal": "Verhoog decimaal",
  "freeze": "Ruiten bevriezen",
  "freezeButtons": {
    "freezePanes": "Ruiten bevriezen",
    "freezeRows": "Rijen bevriezen",
    "freezeColumns": "Kolommen bevriezen",
    "unfreeze": "Ruiten deblokkeren"
  },
  "insertComment": "Opmerking invoegen",
  "insertImage": "Voeg afbeelding in",
  "italic": "Cursief",
  "merge": "Cellen samenvoegen",
  "mergeButtons": {
    "mergeCells": "Alles samenvoegen",
    "mergeHorizontally": "Horizontaal samenvoegen",
    "mergeVertically": "Verticaal samenvoegen",
    "unmerge": "Samenvoegen opheffen"
  },
  "open": "Open...",
  "paste": "Plakken",
  "quickAccess": {
    "redo": "Opnieuw doen",
    "undo": "ongedaan maken"
  },
  "saveAs": "Opslaan als...",
  "sortAsc": "Oplopend sorteren",
  "sortDesc": "Aflopend sorteren",
  "sortButtons": {
    "sortSheetAsc": "Sorteerblad A tot Z",
    "sortSheetDesc": "Sorteerblad Z t/m A",
    "sortRangeAsc": "Sorteerbereik A tot Z",
    "sortRangeDesc": "Sorteerbereik Z tot A"
  },
  "textColor": "Tekst kleur",
  "textWrap": "Tekstterugloop",
  "underline": "Onderstrepen",
  "validation": "Gegevensvalidatie..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Kan geen cellen invoegen vanwege de mogelijkheid van gegevensverlies. Selecteer een andere invoeglocatie of verwijder de gegevens aan het einde van uw werkblad.",
    "filterRangeContainingMerges": "Kan geen filter maken binnen een bereik dat samenvoegingen bevat",
    "validationError": "De waarde die u hebt ingevoerd, is in strijd met de validatieregels die in de cel zijn ingesteld."
  },
  "tabs": {
    "home": "Huis",
    "insert": "Invoegen",
    "data": "Gegevens"
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

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} is verplicht",
  "pattern": "{0} is niet correct",
  "min": "{0} moet groter of gelijk zijn aan {1}",
  "max": "{0} moet kleiner of gelijk zijn aan {1}",
  "step": "{0} is niet correct",
  "email": "{0} is geen correct email adres",
  "url": "{0} is geen correcte URL",
  "date": "{0} is geen correcte datum",
  "dateCompare": "Eind datum moet groter of gelijk zijn aan begindatum"
});
}

})(window.kendo.jQuery);
