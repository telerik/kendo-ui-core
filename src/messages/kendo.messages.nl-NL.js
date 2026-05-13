(function($, undefined) {

/* FilterCell operators */

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

/* FilterMenu operator messages */

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

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Upload",
  "orderBy": "Arrange by",
  "orderByName": "Name",
  "orderBySize": "Size",
  "directoryNotFound": "A directory with this name was not found.",
  "emptyFolder": "Empty Folder",
  "deleteFile": 'Are you sure you want to delete "{0}"?',
  "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
  "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
  "dropFilesHere": "Sleep bestanden hier naar toe om te uploaden",
  "search": "Zoek"
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
  "style": "Stijlen",
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
  "allPages": "Alle",
  "display": "items {0} - {1} van {2}",
  "empty": "Geen items om te tonen",
  "first": "Ga naar eerste pagina",
  "itemsPerPage": "items per pagina",
  "last": "Ga naar laatste pagina",
  "next": "Ga naar volgende pagina",
  "of": "van {0}",
  "page": "Pagina {0}",
  "previous": "Ga naar vorige pagina",
  "refresh": "Verversen",
  "morePages": "Meer pagina's"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "No records to display",
    "loading": "Loading...",
    "requestFailed": "Request failed.",
    "retry": "Opnieuw",
    "commands": {
        "edit": "Bewerken",
        "update": "Bijwerken",
        "canceledit": "Cancel",
        "create": "Item toevoegen",
        "createchild": "Add child record",
        "destroy": "Verwijderen",
        "excel": "Export to Excel",
        "pdf": "Export to PDF"
    }
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
  "search": "Zoek",
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
      "justifyLeft": "Links uitlijnen",
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
    "justifyLeft": "Links uitlijnen",
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

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Contrastverhouding:",
            "fail": "Mislukt",
            "pass": "Geslaagd",
            "hex": "HEX",
            "toggleFormat": "Formaat wisselen",
            "red": "Rood",
            "green": "Groen",
            "blue": "Blauw",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Toepassen",
            "cancel": "Annuleren",
            "noColor": "geen kleur",
            "clearColor": "Kleur verwijderen"
        });

}

/* ColorPicker messages */

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Toepassen",
            "cancel": "Annuleren",
            "noColor": "geen kleur",
            "clearColor": "Kleur verwijderen"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Begin",
            "endLabel": "Einde"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Nieuwe map",
                "upload": "Uploaden",
                "sortDirection": "Sorteervolgorde",
                "sortDirectionAsc": "Oplopend",
                "sortDirectionDesc": "Aflopend",
                "sortField": "Sorteren op",
                "nameField": "Naam",
                "sizeField": "Grootte",
                "typeField": "Type",
                "dateModifiedField": "Gewijzigd op",
                "dateCreatedField": "Gemaakt op",
                "listView": "Lijstweergave",
                "gridView": "Rasterweergave",
                "search": "Zoeken",
                "details": "Details",
                "detailsChecked": "Ja",
                "detailsUnchecked": "Nee",
                "Delete": "Verwijderen",
                "Rename": "Hernoemen"
            },
            "views": {
                "nameField": "Naam",
                "sizeField": "Grootte",
                "typeField": "Type",
                "dateModifiedField": "Gewijzigd op",
                "dateCreatedField": "Gemaakt op",
                "items": "items"
            },
            "dialogs": {
                "upload": {
                    "title": "Bestanden uploaden",
                    "clear": "Wissen",
                    "done": "Gereed"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Wilt u de geselecteerde bestanden verplaatsen of kopiëren?</p>",
                    "okText": "Kopiëren",
                    "cancel": "Verplaatsen",
                    "close": "Sluiten"
                },
                "deleteConfirm": {
                    "title": "Verwijdering bevestigen",
                    "content": "<p class='k-text-center'>Weet u zeker dat u de geselecteerde bestanden wilt verwijderen?<br/>Deze actie kan niet ongedaan worden gemaakt.</p>",
                    "okText": "Verwijderen",
                    "cancel": "Annuleren",
                    "close": "Sluiten"
                },
                "renamePrompt": {
                    "title": "Hernoemen",
                    "content": "<p class='k-text-center'>Voer een nieuwe bestandsnaam in</p>",
                    "okText": "Hernoemen",
                    "cancel": "Annuleren",
                    "close": "Sluiten"
                }
            },
            "previewPane": {
                "noFileSelected": "Geen bestand geselecteerd",
                "extension": "Type",
                "size": "Grootte",
                "created": "Gemaakt op",
                "createdUtc": "Gemaakt op (UTC)",
                "modified": "Gewijzigd op",
                "modifiedUtc": "Gewijzigd op (UTC)",
                "items": "items"
            }
        });

}

/* FilterCell messages */

/* FilterCell messages */

if (kendo.ui.FilterCell) {

    kendo.ui.FilterCell.prototype.options.messages =
        $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
            "isTrue": "is waar",
            "isFalse": "is onwaar",
            "filter": "Filteren",
            "clear": "Wissen",
            "operator": "Operator"
        });

}

/* FilterCell operators */

/* FilterCell operators */

if (kendo.ui.FilterCell) {

    kendo.ui.FilterCell.prototype.options.operators =
        $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
            "string": {
                "contains": "Bevat",
                "startswith": "Begint met",
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "doesnotcontain": "Bevat niet",
                "endswith": "Eindigt met",
                "isnull": "Is null",
                "isnotnull": "Is niet null",
                "isempty": "Is leeg",
                "isnotempty": "Is niet leeg",
                "isnullorempty": "Heeft waarde",
                "isnotnullorempty": "Heeft geen waarde"
            },
            "number": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "gte": "Is groter dan of gelijk aan",
                "gt": "Is groter dan",
                "lte": "Is kleiner dan of gelijk aan",
                "lt": "Is kleiner dan",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            },
            "date": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "gte": "Is na of gelijk aan",
                "gt": "Is na",
                "lte": "Is voor of gelijk aan",
                "lt": "Is voor",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            },
            "enums": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            }
        });

}

/* FilterMenu operator messages */

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {

    kendo.ui.FilterMenu.prototype.options.operators =
        $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
            "string": {
                "contains": "Bevat",
                "startswith": "Begint met",
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "doesnotcontain": "Bevat niet",
                "endswith": "Eindigt met",
                "isnull": "Is null",
                "isnotnull": "Is niet null",
                "isempty": "Is leeg",
                "isnotempty": "Is niet leeg",
                "isnullorempty": "Heeft waarde",
                "isnotnullorempty": "Heeft geen waarde"
            },
            "number": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "gte": "Is groter dan of gelijk aan",
                "gt": "Is groter dan",
                "lte": "Is kleiner dan of gelijk aan",
                "lt": "Is kleiner dan",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            },
            "date": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "gte": "Is na of gelijk aan",
                "gt": "Is na",
                "lte": "Is voor of gelijk aan",
                "lt": "Is voor",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            },
            "enums": {
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan",
                "isnull": "Is null",
                "isnotnull": "Is niet null"
            }
        });

}

/* Gantt messages */

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Kind toevoegen",
                "append": "Taak toevoegen",
                "insertAfter": "Invoegen na",
                "insertBefore": "Invoegen voor",
                "pdf": "Exporteren naar PDF"
            },
            "cancel": "Annuleren",
            "deleteDependencyWindowTitle": "Afhankelijkheid verwijderen",
            "deleteTaskWindowTitle": "Taak verwijderen",
            "destroy": "Verwijderen",
            "editor": {
                "assignButton": "Toewijzen",
                "editorTitle": "Taak",
                "end": "Einde",
                "percentComplete": "Voltooiing",
                "resources": "Resources",
                "resourcesEditorTitle": "Resources",
                "resourcesHeader": "Resources",
                "start": "Begin",
                "title": "Titel",
                "unitsHeader": "Eenheden",
                "parent": "Bovenliggend",
                "addNew": "Toevoegen",
                "name": "Naam"
            },
            "save": "Opslaan",
            "selectView": "Weergave selecteren",
            "views": {
                "day": "Dag",
                "end": "Einde",
                "month": "Maand",
                "start": "Begin",
                "week": "Week",
                "year": "Jaar"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Bewerken",
            "createNewCard": "Nieuwe kaart",
            "create": "Aanmaken",
            "search": "Zoeken",
            "previewCard": "Voorbeeldkaart",
            "addCard": "Kaart toevoegen",
            "editCard": "Kaart bewerken",
            "deleteCard": "Kaart verwijderen",
            "addColumn": "Kolom toevoegen",
            "editColumn": "Kolom bewerken",
            "deleteColumn": "Kolom verwijderen",
            "close": "Sluiten",
            "cancel": "Annuleren",
            "delete": "Verwijderen",
            "saveChanges": "Wijzigingen opslaan",
            "title": "Titel:",
            "description": "Beschrijving:",
            "newColumn": "Nieuwe kolom",
            "deleteColumnConfirm": "Weet u zeker dat u deze kolom wilt verwijderen?",
            "deleteCardConfirm": "Weet u zeker dat u deze kaart wilt verwijderen?"
        });

}

/* NumericTextBox messages */

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Waarde verhogen",
            "downArrowText": "Waarde verlagen"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pauze",
            "play": "Afspelen",
            "mute": "Dempen",
            "unmute": "Dempen opheffen",
            "quality": "Kwaliteit",
            "fullscreen": "Volledig scherm"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Gegevensvelden hier neerzetten",
            "columnFields": "Kolomvelden hier neerzetten",
            "rowFields": "Rijvelden hier neerzetten"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Toon items met waarde die:",
            "sortAscending": "Oplopend sorteren",
            "sortDescending": "Aflopend sorteren",
            "filterFields": "Veldenfilter",
            "filter": "Filter",
            "include": "Velden opnemen...",
            "title": "Op te nemen velden",
            "clear": "Wissen",
            "ok": "Ok",
            "cancel": "Annuleren",
            "operators": {
                "contains": "Bevat",
                "doesnotcontain": "Bevat niet",
                "startswith": "Begint met",
                "endswith": "Eindigt met",
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Instellingen",
            "cancelButtonText": "Annuleren",
            "applyButtonText": "Toepassen",
            "measures": "Selecteer velden om te beginnen",
            "columns": "Selecteer velden om te beginnen",
            "rows": "Selecteer velden om te beginnen"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Toepassen",
            "sortAscending": "Oplopend sorteren",
            "sortDescending": "Aflopend sorteren",
            "filterFields": "Veldenfilter",
            "filter": "Filter",
            "include": "Velden opnemen...",
            "clear": "Wissen",
            "reset": "Herstellen",
            "moveToColumns": "Verplaatsen naar kolommen",
            "moveToRows": "Verplaatsen naar rijen",
            "movePrevious": "Vorige",
            "moveNext": "Volgende",
            "filterOperatorsDropDownLabel": "Filteroperatoren",
            "filterValueTextBoxLabel": "Filterwaarde",
            "operators": {
                "contains": "Bevat",
                "doesnotcontain": "Bevat niet",
                "startswith": "Begint met",
                "endswith": "Eindigt met",
                "eq": "Is gelijk aan",
                "neq": "Is niet gelijk aan"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Annuleren",
            "update": "Opslaan",
            "endTitle": "Herhaling beëindigen",
            "repeatTitle": "Herhalingspatroon",
            "headerTitle": "Gebeurtenis herhalen",
            "end": {
                "never": "Nooit",
                "after": "Na",
                "on": "Op"
            },
            "daily": {
                "interval": "dag(en)"
            },
            "weekly": {
                "interval": "we(e)k(en)"
            },
            "monthly": {
                "interval": "maand(en)",
                "repeatBy": "Herhalen op: ",
                "dayOfMonth": "Dag van de maand",
                "dayOfWeek": "Dag van de week"
            },
            "yearly": {
                "interval": "ja(a)r(en)",
                "repeatBy": "Herhalen op: ",
                "dayOfMonth": "Dag van de maand",
                "dayOfWeek": "Dag van de week",
                "of": " van "
            },
            "endRule": {
                "after": " gebeurtenis(sen)",
                "on": "Op "
            }
        });

}

/* Slider messages */

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Verhogen",
            "decreaseButtonTitle": "Verlagen",
            "dragHandleTitle": "Slepen"
        });

}

/* ListBox messaages */

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Verwijderen",
                "moveUp": "Omhoog",
                "moveDown": "Omlaag",
                "transferTo": "Overbrengen naar",
                "transferFrom": "Overbrengen van",
                "transferAllTo": "Alles overbrengen naar",
                "transferAllFrom": "Alles overbrengen van"
            }
        });

}

/* TreeView messages */

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Laden...",
            "requestFailed": "Aanvraag mislukt.",
            "retry": "Opnieuw"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Laden..."
        });

}

/* TimePicker */

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Instellen",
            "cancel": "Annuleren",
            "hour": "uur",
            "minute": "minuut",
            "second": "seconde",
            "millisecond": "milliseconde",
            "now": "Nu"
        });

}

/* DateTimePicker */

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Instellen",
            "cancel": "Annuleren",
            "hour": "uur",
            "minute": "minuut",
            "second": "seconde",
            "millisecond": "milliseconde",
            "now": "Nu",
            "date": "Datum",
            "time": "Tijd",
            "today": "Vandaag",
            "weekColumnHeader": ""
        });

}

/* Calendar */

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Vandaag",
            "navigateTo": "Navigeer naar: ",
            "parentViews": {
                "month": "Jaarweergave",
                "year": "Decenniumweergave",
                "decade": "Eeuwweergave"
            }
        });

}

/* DateInput */

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "jaar",
            "month": "maand",
            "day": "dag",
            "weekday": "dag van de week",
            "hour": "uren",
            "minute": "minuten",
            "second": "seconden",
            "dayperiod": "AM/PM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden."
        });

}

/* DropDownList messages */

if (kendo.ui.DropDownList) {

    kendo.ui.DropDownList.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownList.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden."
        });

}

/* ComboBox messages */

if (kendo.ui.ComboBox) {

    kendo.ui.ComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.ComboBox.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden."
        });

}

/* AutoComplete messages */

if (kendo.ui.AutoComplete) {

    kendo.ui.AutoComplete.prototype.options.messages =
        $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden."
        });

}

/* MultiColumnComboBox messages */

if (kendo.ui.MultiColumnComboBox) {

    kendo.ui.MultiColumnComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden.",
            "singleTag": "item(s) geselecteerd"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "wissen",
            "noData": "Geen gegevens gevonden.",
            "singleTag": "item(s) geselecteerd"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Typ een bericht...",
            "toggleButton": "Schakel werkbalk in/uit",
            "sendButton": "Verzenden"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Herstellen",
            "previous": "Vorige",
            "next": "Volgende",
            "done": "Gereed",
            "step": "Stap",
            "of": "van"
        });

}

/* PDFViewer messages */

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Document",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Zoomniveau",
                    "zoomOut": "Uitzoomen",
                    "zoomIn": "Inzoomen",
                    "actualWidth": "Werkelijke breedte",
                    "autoWidth": "Automatische breedte",
                    "fitToWidth": "Aanpassen aan breedte",
                    "fitToPage": "Aanpassen aan pagina"
                },
                "open": "Openen",
                "exportAs": "Exporteren",
                "download": "Downloaden",
                "pager": {
                    "first": "Ga naar eerste pagina",
                    "previous": "Ga naar vorige pagina",
                    "next": "Ga naar volgende pagina",
                    "last": "Ga naar laatste pagina",
                    "of": "van",
                    "page": "pagina",
                    "pages": "pagina's"
                },
                "print": "Afdrukken",
                "toggleSelection": "Selectie inschakelen",
                "togglePan": "Pannen inschakelen",
                "search": "Zoeken"
            },
            "errorMessages": {
                "notSupported": "Alleen PDF-bestanden worden ondersteund.",
                "parseError": "Het PDF-bestand kan niet worden verwerkt.",
                "notFound": "Bestand niet gevonden.",
                "popupBlocked": "De popup wordt geblokkeerd door de browser."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Captcha opnieuw genereren",
            "audio": "Captcha-audio afspelen",
            "imageAlt": "Voer de tekst in van de captcha-afbeelding",
            "success": "Verificatie geslaagd"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organigram",
            "edit": "Bewerken",
            "create": "Aanmaken",
            "destroy": "Verwijderen",
            "destroyContent": "Weet u zeker dat u dit item en de onderliggende items wilt verwijderen?",
            "destroyTitle": "Item verwijderen",
            "cancel": "Annuleren",
            "save": "Opslaan",
            "menuLabel": "Bewerkingsmenu",
            "uploadAvatar": "Nieuwe afbeelding uploaden",
            "parent": "Bovenliggend",
            "name": "Naam",
            "title": "Titel",
            "none": "--Geen--",
            "expand": "Uitvouwen",
            "collapse": "Samenvouwen"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Kaarttitel"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Eenheden"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Geen gegevens beschikbaar"
        });

}

})(window.kendo.jQuery);