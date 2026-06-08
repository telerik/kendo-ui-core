(function($, undefined) {

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
  kendo.ui.DropDownTree.prototype.options.messages =
  $.extend(true, kendo.ui.DropDownTree.prototype.options.messages,{
      "singleTag": "item(s) selected",
      "clear": "clear",
      "deleteTag": "obriši",
      "noData": "No data found."
  });
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "repeat": "Repeat",
  "recurrenceEditorTitle": "Recurrence editor",
  "frequencies": {
    "never": "Nikad",
    "hourly": "Hourly",
    "daily": "Dnevno",
    "weekly": "Tjedno",
    "monthly": "Mjesečno",
    "yearly": "Godišnje"
  },
  "hourly": {
    "repeatEvery": "Ponovi svaki: ",
    "interval": " hour(s)"
  },
  "daily": {
    "repeatEvery": "Ponovi svaki:",
    "interval": "dan(i)"
  },
  "weekly": {
    "interval": " tjedan(ni)",
    "repeatEvery": "Ponovi svaki: ",
    "repeatOn": "Ponovi na: "
  },
  "monthly": {
    "repeatEvery": "Ponovi svaki: ",
    "repeatOn": "Ponovi na: ",
    "interval": " mjesec(i)",
    "day": "Dan ",
    "date": "Date"
  },
  "yearly": {
    "repeatEvery": "Ponovi svaki: ",
    "repeatOn": "Ponovi na: ",
    "interval": " godina(e)",
    "of": " od ",
    "month": "month",
    "day": "day",
    "date": "Date"
  },
  "end": {
    "label": "Završi:",
    "mobileLabel": "Završava",
    "never": "Nikad",
    "after": "Nakon ",
    "occurrence": " ponavljanje(a)",
    "on": "Na "
  },
  "offsetPositions": {
    "first": "prvi",
    "second": "drugi",
    "third": "treći",
    "fourth": "četvrti",
    "last": "poslijednji"
  },
  "weekdays": {
    "day": "dan",
    "weekday": "radni dan",
    "weekend": "vikend"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "date": "Date",
  "event": "Event",
  "time": "Time",
  "showFullDay": "Show full day",
  "showWorkDay": "Show business hours",
  "today": "Today",
  "save": "Spremi",
  "cancel": "Cancel",
  "destroy": "Izbriši",
  "resetSeries": "Reset Series",
  "deleteWindowTitle": "Izbriši događaj",
  "ariaSlotLabel": "Selected from {0:t} to {1:t}",
  "ariaEventLabel": "{0} on {1:D} at {2:t}",
  "refresh": "Refresh",
  "selectView": "Select view",
  "editable": {
    "confirmation": "Jeste li sigurni da želite izbrisati ovaj događaj?"
  },
  "views": {
    "day": "Dan",
    "week": "Tjedan",
    "workWeek": "Radni tjedan",
    "agenda": "Dnevni pregled",
    "month": "Mjesec"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Izbriši ponavljajući događaj",
    "resetSeriesWindowTitle": "Reset Series",
    "deleteWindowOccurrence": "Izbriši ovaj događaj",
    "deleteWindowSeries": "Izbriši seriju",
    "deleteRecurringConfirmation": "Are you sure you want to delete this event occurrence?",
    "deleteSeriesConfirmation": "Are you sure you want to delete the whole series?",
    "editWindowTitle": "Uredi ponavljajuću stavku",
    "editWindowOccurrence": "Uredi trenutno pojavljivanje",
    "editWindowSeries": "Uredi niz događaja",
    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
    "editRecurring": "Do you want to edit only this event occurrence or the whole series?"
  },
  "editor": {
    "title": "Naslov",
    "start": "Početak",
    "end": "Kraj",
    "allDayEvent": "Cjelodnevni događaj",
    "description": "Opis",
    "repeat": "Ponovi",
    "timezone": "Vremenska zona",
    "startTimezone": "Početna vremenska zona",
    "endTimezone": "Kraj vremenske zone",
    "separateTimezones": "Koristi zasebne vremenske zone za početak i kraj",
    "timezoneEditorTitle": "Vremenske zone",
    "timezoneEditorButton": "Vremenska zona",
    "timezoneTitle": "Time zones",
    "noTimezone": "Nema vremenske zone",
    "editorTitle": "Event"
  },
  "search": "Search..."
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Ispusti podatkovna polja ovdje",
  "columnFields": "Ispusti polja stupca ovdje",
  "rowFields": "Ispusti polja retka ovdje"
});
}

  /* PivotFieldMenu messages */
  if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Prikaži stavke s vrijednosti koja:",
  "filterFields": "Filtriraj polja",
  "filter": "Filtriraj",
  "include": "Uključi polja...",
  "title": "Polja koja treba uključiti",
  "clear": "Očisti",
  "ok": "Uredu",
  "cancel": "Otkaži",
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

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} od {2} stavki",
  "empty": "Nema stavki za prikaz",
  "page": "Stranica",
  "pageButtonLabel": "Stranica {0}",
  "pageSizeDropDownLabel": "Padajući izbornik veličina stranice",
  "of": "od {0}",
  "itemsPerPage": "stavki po stranici",
  "first": "Idi na prvu stranicu",
  "previous": "Idi na prethodnu stranicu",
  "next": "Idi na sljedeću stranicu",
  "last": "Idi na zadnju stranicu",
  "refresh": "Osvježi",
  "morePages": "Više stranica"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pauza",
  "play": "Kreni",
  "mute": "Ugasi zvuk",
  "unmute": "Upali zvuk",
  "quality": "Kvaliteta",
  "fullscreen": "Cijeli ekran",
  "volume": "volume",
  "time": "time"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Povucite zaglavlje stupca i ispustite ga ovdje za grupiranje po tom stupcu"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Sortiraj Uzlazno",
  "sortDescending": "Sortiraj Silazno",
  "filter": "Filter",
  "column": "Column",
  "columns": "Stupci",
  "columnVisibility": "Column Visibility",
  "clear": "Clear",
  "cancel": "Otkaži",
  "done": "Done",
  "settings": "Postavke stupca",
  "lock": "Zaključaj",
  "unlock": "Otključaj",
  "stick": "Zalijepi stupac",
  "unstick": "Odlijepi stupac",
  "setColumnPosition": "Postavi poziciju stupca",
  "apply": "Primijeni",
  "reset": "Reset",
  "buttonTitle": "{0} edit column settings"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Otkaži promjene",
    "canceledit": "Otkaži",
    "create": "Dodaj",
    "add": "Dodaj",
    "destroy": "Izbriši",
    "edit": "Uredi",
    "excel": "Izvezi u Excel",
    "pdf": "Izvezi u PDF",
    "save": "Spremi promjene",
    "select": "Select",
    "update": "Ažuriraj",
    "done": "Gotovo",
    "search": "Pretraži..."
  },
  "editable": {
    "cancelDelete": "Otkaži",
    "confirmation": "Jeste li sigurni da želite izbrisati ovaj zapis?",
    "confirmDelete": "Izbriši"
  },
  "noRecords": "No records available.",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Press ctrl + space to group",
  "ungroupHeader": "Press ctrl + space to ungroup",
  "toolbarLabel": "grid toolbar",
  "groupingHeaderLabel": "grid grouping header",
  "filterCellTitle": "filter cell"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Označi sve",
  "clearAll": "Clear All",
  "clear": "Clear",
  "filter": "Filter",
  "search": "Search",
  "cancel": "Cancel",
  "selectedItemsFormat": "{0} items selected",
  "done": "Done",
  "into": "in"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Pokaži stavke s vrijednošću koja:",
  "title": "Pokaži stavke s vrijednosti:",
  "isTrue": "je istinita",
  "isFalse": "je lažna",
  "filter": "Filtriraj",
  "clear": "Očisti",
  "and": "I",
  "or": "Ili",
  "selectValue": "-Izaberi vrijednost-",
  "operator": "Operator",
  "selectedItemsFormat": "{0} označenih stavki",
  "value": "Vrijednost",
  "cancel": "Otkaži",
  "done": "Done",
  "search": "Pretraži",
  "into": "in",
  "buttonTitle": "{0} izmijeni postavke stupca"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Podebljano",
  "italic": "Kurziv",
  "search": "Pretraga",
  "underline": "Podvuci",
  "strikethrough": "Precrtano",
  "superscript": "Natpisan znak",
  "subscript": "Potpisan znak",
  "justifyCenter": "Centriraj tekst",
  "justifyLeft": "Lijevo poravnanje",
  "justifyRight": "Desno poravnanje",
  "justifyFull": "Obostrano poravnanje",
  "insertUnorderedList": "Umetni neuređenu listu",
  "insertOrderedList": "Umetni uređenu listu",
  "indent": "Uvlaka",
  "outdent": "Izvuci",
  "createLink": "Umetni poveznicu",
  "unlink": "Ukloni hyperlink",
  "insertImage": "Umetni sliku",
  "insertFile": "Umetni datoteku",
  "insertHtml": "Umetni HTML",
  "viewHtml": "Pregled HTML",
  "fontName": "Odaberite font",
  "fontNameInherit": "(naslijeđeni font)",
  "fontSize": "Odaberite veličinu fonta",
  "fontSizeInherit": "(naslijeđena veličina)",
  "formatBlock": "Oblikovanje",
  "dropFilesHere": "Ispustite datoteke ovdje za njihovo učitavanje",
  "formatting": "Oblikovanje",
  "foreColor": "Boja",
  "backColor": "Boja pozadine",
  "style": "Stilovi",
  "emptyFolder": "Prazna mapa",
  "uploadFile": "Upload",
  "overflowAnchor": "More tools",
  "orderBy": "Složi po:",
  "orderBySize": "Veličina",
  "orderByName": "Naziv",
  "invalidFileType": "Označena datoteka \"{0}\" nije valjana. Podržani tipovi datoteka su {1}.",
  "deleteFile": 'Jeste li sigurni da želite izbrisati "{0}"?',
  "overwriteFile": 'Datoteka s nazivom "{0}" već postoji u trenutnom katalogu. Želite li ga prepisati?',
  "directoryNotFound": "Katalog s ovim imenom nije pronađen.",
  "imageWebAddress": "adresa",
  "imageAltText": "Zamjenski tekst",
  "imageWidth": "Width (px)",
  "imageHeight": "Height (px)",
  "fileWebAddress": "adresa",
  "fileTitle": "Title",
  "linkWebAddress": "adresa",
  "linkText": "Tekst",
  "linkToolTip": "Opis alata",
  "linkOpenInNewWindow": "Otvori link u novom prozoru",
  "dialogUpdate": "Ažuriraj",
  "dialogInsert": "Umetni",
  "dialogButtonSeparator": "or",
  "dialogCancel": "Otkaži",
  "cleanFormatting": "Clean formatting",
  "createTable": "Kreiraj tablicu",
  "addColumnLeft": "Dodaj stupac lijevo",
  "addColumnRight": "Dodaj stupac desno",
  "addRowAbove": "Dodaj redak iznad",
  "addRowBelow": "Dodaj redak ispod",
  "deleteRow": "Izbriši redak",
  "deleteColumn": "Izbriši stupac",
  "dialogOk": "Ok",
  "tableWizard": "Table Wizard",
  "tableTab": "Table",
  "cellTab": "Cell",
  "accessibilityTab": "Accessibility",
  "caption": "Caption",
  "summary": "Summary",
  "width": "Width",
  "height": "Height",
  "units": "Units",
  "cellSpacing": "Cell Spacing",
  "cellPadding": "Cell Padding",
  "cellMargin": "Cell Margin",
  "alignment": "Alignment",
  "background": "Background",
  "cssClass": "CSS Class",
  "id": "ID",
  "border": "Border",
  "borderStyle": "Border Style",
  "collapseBorders": "Collapse borders",
  "wrapText": "Wrap text",
  "associateCellsWithHeaders": "Associate headers",
  "alignLeft": "Align Left",
  "alignCenter": "Align Center",
  "alignRight": "Align Right",
  "alignLeftTop": "Align Left Top",
  "alignCenterTop": "Align Center Top",
  "alignRightTop": "Align Right Top",
  "alignLeftMiddle": "Align Left Middle",
  "alignCenterMiddle": "Align Center Middle",
  "alignRightMiddle": "Align Right Middle",
  "alignLeftBottom": "Align Left Bottom",
  "alignCenterBottom": "Align Center Bottom",
  "alignRightBottom": "Align Right Bottom",
  "alignRemove": "Remove Alignment",
  "columns": "Columns",
  "rows": "Rows",
  "selectAllCells": "Select All Cells",
  "print": "Print",
  "headerRows": "Header Rows",
  "headerColumns": "Header Columns",
  "tableSummaryPlaceholder": "Summary attribute is not HTML5 compatible.",
  "associateNone": "None",
  "associateScope": "Associate using 'scope' attribute",
  "associateIds": "Associate using Ids",
  "copyFormat": "Copy format",
  "applyFormat": "Apply format",
  "borderNone": "None",
  "undo": "Undo",
  "redo": "Redo"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Sve granice",
  "insideBorders": "Unutarnje granice",
  "insideHorizontalBorders": "Unutar horizontalnih granica",
  "insideVerticalBorders": "Unutar vertikalnih granica",
  "outsideBorders": "Izvan granica",
  "leftBorder": "Lijeva granica",
  "topBorder": "Gornja granica",
  "rightBorder": "Desna granica",
  "bottomBorder": "Donja granica",
  "noBorders": "Nema granice",
  "reset": "Poništi boju",
  "customColor": "Boja po narudžbi...",
  "apply": "Prijavite se",
  "cancel": "Otkazati"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Prijavite se",
  "save": "Uštedjeti",
  "cancel": "Otkazati",
  "remove": "Ukloniti",
  "retry": "Pokušajte ponovo",
  "revert": "Vrati se",
  "okText": "u redu",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Broj",
      "currency": "Valuta",
      "date": "Datum"
    }
  },
  "fontFamilyDialog": {
    "title": "Font"
  },
  "fontSizeDialog": {
    "title": "Veličina fonta"
  },
  "bordersDialog": {
    "title": "Granice"
  },
  "alignmentDialog": {
    "title": "Poravnanje",
    "buttons": {
      "justifyLeft": "Poravnajte lijevo",
      "justifyCenter": "Centar",
      "justifyRight": "Poravnajte desno",
      "justifyFull": "Opravdati",
      "alignTop": "Poravnajte vrh",
      "alignMiddle": "Poravnajte sredinu",
      "alignBottom": "Poravnajte dno"
    }
  },
  "mergeDialog": {
    "title": "Spajanje ćelija",
    "buttons": {
      "mergeCells": "Spoji sve",
      "mergeHorizontally": "Spojite vodoravno",
      "mergeVertically": "Spoji se okomito",
      "unmerge": "Poništi spajanje"
    }
  },
  "freezeDialog": {
    "title": "Zamrznite okna",
    "buttons": {
      "freezePanes": "Zamrznite okna",
      "freezeRows": "Zamrznite redove",
      "freezeColumns": "Zamrznite stupce",
      "unfreeze": "Odmrznite okna"
    }
  },
  "confirmationDialog": {
    "text": "Jeste li sigurni da želite ukloniti ovaj list?",
    "title": "Uklonite list"
  },
  "validationDialog": {
    "title": "Provjera valjanosti podataka",
    "hintMessage": "Unesite valjanu {0} vrijednost {1}.",
    "hintTitle": "Validacija {0}",
    "criteria": {
      "any": "Bilo koja vrijednost",
      "number": "Broj",
      "text": "Tekst",
      "date": "Datum",
      "custom": "Prilagođena formula",
      "list": "Popis"
    },
    "comparers": {
      "greaterThan": "veći od",
      "lessThan": "manje od",
      "between": "između",
      "notBetween": "ne između",
      "equalTo": "jednak",
      "notEqualTo": "nije jednako",
      "greaterThanOrEqualTo": "veći ili jednak",
      "lessThanOrEqualTo": "manje ili jednako"
    },
    "comparerMessages": {
      "greaterThan": "veći od {0}",
      "lessThan": "manje od {0}",
      "between": "između {0} i {1}",
      "notBetween": "ne između {0} i {1}",
      "equalTo": "jednako {0}",
      "notEqualTo": "nije jednako {0}",
      "greaterThanOrEqualTo": "veći ili jednak {0}",
      "lessThanOrEqualTo": "manje od ili jednako {0}",
      "custom": "koji zadovoljava formulu: {0}"
    },
    "labels": {
      "criteria": "Kriteriji",
      "comparer": "Usporednik",
      "min": "Min",
      "max": "Maks",
      "value": "Vrijednost",
      "start": "Početak",
      "end": "Kraj",
      "onInvalidData": "O nevažećim podacima",
      "rejectInput": "Odbijte unos",
      "showWarning": "Prikaži upozorenje",
      "showHint": "Pokaži savjet",
      "hintTitle": "Naslov savjeta",
      "hintMessage": "Poruka savjeta",
      "ignoreBlank": "Zanemarite prazno"
    },
    "placeholders": {
      "typeTitle": "Upišite naslov",
      "typeMessage": "Upišite poruku"
    }
  },
  "exportAsDialog": {
    "title": "Izvoz...",
    "labels": {
      "fileName": "Naziv datoteke",
      "saveAsType": "Spremi kao vrstu",
      "exportArea": "Izvoz",
      "paperSize": "Veličina papira",
      "margins": "Margine",
      "orientation": "Orijentacija",
      "print": "Ispis",
      "guidelines": "Smjernice",
      "center": "Centar",
      "horizontally": "Horizontalno",
      "vertically": "Okomito"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nije moguće promijeniti dio spojene ćelije."
  },
  "useKeyboardDialog": {
    "title": "Kopiranje i lijepljenje",
    "errorMessage": "Ove radnje nije moguće pozvati putem izbornika. Umjesto toga upotrijebite tipkovničke prečace:",
    "labels": {
      "forCopy": "za kopiju",
      "forCut": "za rez",
      "forPaste": "za pastu"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Ta se radnja ne može izvesti na višestrukom odabiru."
  },
  "insertCommentDialog": {
    "title": "Umetnite komentar",
    "labels": {
      "comment": "Komentar",
      "removeComment": "Ukloni komentar"
    }
  },
  "insertImageDialog": {
    "title": "Umetnite sliku",
    "info": "Povucite sliku ovdje ili kliknite za odabir",
    "typeError": "Odaberite JPEG, PNG ili GIF sliku"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Razvrstaj raspon od A do Z",
  "sortDescending": "Razvrstaj raspon od Z do A",
  "filterByValue": "Filtrirajte prema vrijednosti",
  "filterByCondition": "Filtrirajte prema stanju",
  "apply": "Prijavite se",
  "search": "traži",
  "addToCurrent": "Dodaj trenutnom odabiru",
  "clear": "Čisto",
  "blanks": "(praznine)",
  "operatorNone": "Nijedan",
  "and": "I",
  "or": "ILI",
  "operators": {
    "string": {
      "contains": "Tekst sadrži",
      "doesnotcontain": "Tekst ne sadrži",
      "startswith": "Tekst počinje sa",
      "endswith": "Tekst završava sa"
    },
    "date": {
      "eq": "Datum je",
      "neq": "Datum nije",
      "lt": "Datum je prije",
      "gt": "Datum je poslije"
    },
    "number": {
      "eq": "Jednako je",
      "neq": "Nije jednako",
      "gte": "Je veći ili jednak",
      "gt": "Je veći od",
      "lte": "Je manje ili jednako",
      "lt": "Je manje od"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Poništi boju",
  "customColor": "Boja po narudžbi...",
  "apply": "Prijavite se",
  "cancel": "Otkazati"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Dodaj stupac lijevo",
  "addColumnRight": "Dodaj stupac desno",
  "addRowAbove": "Dodajte red iznad",
  "addRowBelow": "Dodajte red ispod",
  "alignment": "Poravnanje",
  "alignmentButtons": {
    "justifyLeft": "Poravnajte lijevo",
    "justifyCenter": "Centar",
    "justifyRight": "Poravnajte desno",
    "justifyFull": "Opravdati",
    "alignTop": "Poravnajte vrh",
    "alignMiddle": "Poravnajte sredinu",
    "alignBottom": "Poravnajte dno"
  },
  "backgroundColor": "Pozadina",
  "bold": "Podebljano",
  "borders": "Granice",
  "colorPicker": {
    "reset": "Poništi boju",
    "customColor": "Boja po narudžbi..."
  },
  "copy": "Kopirati",
  "cut": "Izrezati",
  "deleteColumn": "Izbriši stupac",
  "deleteRow": "Izbriši red",
  "excelImport": "Uvezi iz Excela...",
  "filter": "filtar",
  "fontFamily": "Font",
  "fontSize": "Veličina fonta",
  "format": "Prilagođeni format...",
  "formatTypes": {
    "automatic": "Automatski",
    "number": "Broj",
    "percent": "postotak",
    "financial": "Financijski",
    "currency": "Valuta",
    "date": "Datum",
    "time": "Vrijeme",
    "dateTime": "Datum vrijeme",
    "duration": "Trajanje",
    "moreFormats": "Više formata..."
  },
  "formatDecreaseDecimal": "Smanji decimalni broj",
  "formatIncreaseDecimal": "Povećaj decimalni broj",
  "freeze": "Zamrznite okna",
  "freezeButtons": {
    "freezePanes": "Zamrznite okna",
    "freezeRows": "Zamrznite redove",
    "freezeColumns": "Zamrznite stupce",
    "unfreeze": "Odmrznite okna"
  },
  "insertComment": "Umetnite komentar",
  "insertImage": "Umetnite sliku",
  "italic": "Kurziv",
  "merge": "Spajanje ćelija",
  "mergeButtons": {
    "mergeCells": "Spoji sve",
    "mergeHorizontally": "Spojite vodoravno",
    "mergeVertically": "Spoji se okomito",
    "unmerge": "Poništi spajanje"
  },
  "open": "Otvorena...",
  "paste": "Zalijepiti",
  "quickAccess": {
    "redo": "Ponovi",
    "undo": "Poništi"
  },
  "saveAs": "Spremi kao...",
  "sortAsc": "Poredaj uzlazno",
  "sortDesc": "Poredaj silazno",
  "sortButtons": {
    "sortSheetAsc": "Razvrstaj list od A do Z",
    "sortSheetDesc": "Razvrstaj list od Z do A",
    "sortRangeAsc": "Razvrstaj raspon od A do Z",
    "sortRangeDesc": "Razvrstaj raspon od Z do A"
  },
  "textColor": "Boja teksta",
  "textWrap": "Prelamanje teksta",
  "underline": "Naglasiti",
  "validation": "Provjera valjanosti podataka..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Nije moguće umetnuti ćelije zbog mogućnosti gubitka podataka. Odaberite drugo mjesto za umetanje ili izbrišite podatke s kraja radnog lista.",
    "filterRangeContainingMerges": "Nije moguće izraditi filtar unutar raspona koji sadrži spajanja",
    "validationError": "Vrijednost koju ste unijeli krši pravila provjere postavljena u ćeliji."
  },
  "tabs": {
    "home": "Dom",
    "insert": "Umetnuti",
    "data": "Podaci"
  }
});
}

/* DropDownList messages */

if (kendo.ui.DropDownList) {

    kendo.ui.DropDownList.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* ComboBox messages */

if (kendo.ui.ComboBox) {

    kendo.ui.ComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* AutoComplete messages */

if (kendo.ui.AutoComplete) {

    kendo.ui.AutoComplete.prototype.options.messages =
        $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* MultiColumnComboBox messages */

if (kendo.ui.MultiColumnComboBox) {

    kendo.ui.MultiColumnComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Omjer kontrasta:",
            "fail": "Neuspjeh",
            "pass": "Uspjeh",
            "hex": "HEX",
            "toggleFormat": "Promijeni format",
            "red": "Crvena",
            "green": "Zelena",
            "blue": "Plava",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Primijeni",
            "cancel": "Odustani",
            "noColor": "bez boje",
            "clearColor": "Ukloni boju"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Primijeni",
            "cancel": "Odustani",
            "noColor": "bez boje",
            "clearColor": "Ukloni boju"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Pocetak",
            "endLabel": "Kraj"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Ucitaj",
            "orderBy": "Sortiraj po",
            "orderByName": "Naziv",
            "orderBySize": "Velicina",
            "directoryNotFound": "Direktorij s tim nazivom nije pronaden.",
            "emptyFolder": "Prazna mapa",
            "deleteFile": "Jeste li sigurni da zelite izbrisati \"{0}\"?",
            "invalidFileType": "Odabrana datoteka \"{0}\" nije valjana. Podrzane vrste datoteka: {1}.",
            "overwriteFile": "Datoteka s nazivom \"{0}\" vec postoji u trenutnom direktoriju. Zelite li je prebrisati?",
            "dropFilesHere": "povucite datoteku ovdje za ucitavanje",
            "search": "Pretrazi"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Nova mapa",
                "upload": "Ucitaj",
                "sortDirection": "Smjer sortiranja",
                "sortDirectionAsc": "Uzlazno",
                "sortDirectionDesc": "Silazno",
                "sortField": "Sortiraj po",
                "nameField": "Naziv",
                "sizeField": "Velicina",
                "typeField": "Vrsta",
                "dateModifiedField": "Datum izmjene",
                "dateCreatedField": "Datum stvaranja",
                "listView": "Popis",
                "gridView": "Mreza",
                "search": "Pretrazi",
                "details": "Detalji",
                "detailsChecked": "Da",
                "detailsUnchecked": "Ne",
                "Delete": "Izbrisi",
                "Rename": "Preimenuj"
            },
            "views": {
                "nameField": "Naziv",
                "sizeField": "Velicina",
                "typeField": "Vrsta",
                "dateModifiedField": "Datum izmjene",
                "dateCreatedField": "Datum stvaranja",
                "items": "stavki"
            },
            "dialogs": {
                "upload": {
                    "title": "Ucitaj datoteke",
                    "clear": "Ocisti",
                    "done": "Gotovo"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Zelite li premjestiti ili kopirati odabrane datoteke?</p>",
                    "okText": "Kopiraj",
                    "cancel": "Premjesti",
                    "close": "Zatvori"
                },
                "deleteConfirm": {
                    "title": "Potvrdite brisanje",
                    "content": "<p class='k-text-center'>Jeste li sigurni da zelite izbrisati odabrane datoteke?<br/>Ova radnja se ne moze ponistiti.</p>",
                    "okText": "Izbrisi",
                    "cancel": "Odustani",
                    "close": "Zatvori"
                },
                "renamePrompt": {
                    "title": "Preimenuj",
                    "content": "<p class='k-text-center'>Unesite novi naziv datoteke</p>",
                    "okText": "Preimenuj",
                    "cancel": "Odustani",
                    "close": "Zatvori"
                }
            },
            "previewPane": {
                "noFileSelected": "Nijedna datoteka nije odabrana",
                "extension": "Vrsta",
                "size": "Velicina",
                "created": "Datum stvaranja",
                "createdUtc": "Datum stvaranja (UTC)",
                "modified": "Datum izmjene",
                "modifiedUtc": "Datum izmjene (UTC)",
                "items": "stavki"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Dodaj podzadatak",
                "append": "Dodaj zadatak",
                "insertAfter": "Umetni nakon",
                "insertBefore": "Umetni prije",
                "pdf": "Izvezi u PDF"
            },
            "cancel": "Odustani",
            "deleteDependencyWindowTitle": "Izbrisi ovisnost",
            "deleteTaskWindowTitle": "Izbrisi zadatak",
            "destroy": "Izbrisi",
            "editor": {
                "assignButton": "Dodijeli",
                "editorTitle": "Zadatak",
                "end": "Kraj",
                "percentComplete": "Dovrseno",
                "resources": "Resursi",
                "resourcesEditorTitle": "Resursi",
                "resourcesHeader": "Resursi",
                "start": "Pocetak",
                "title": "Naslov",
                "unitsHeader": "Jedinice",
                "parent": "Nadredeni",
                "addNew": "Dodaj",
                "name": "Naziv"
            },
            "save": "Spremi",
            "selectView": "Odaberi prikaz",
            "views": {
                "day": "Dan",
                "end": "Kraj",
                "month": "Mjesec",
                "start": "Pocetak",
                "week": "Tjedan",
                "year": "Godina"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Uredi",
            "createNewCard": "Nova kartica",
            "create": "Stvori",
            "search": "Pretrazi",
            "previewCard": "Pregled kartice",
            "addCard": "Dodaj karticu",
            "editCard": "Uredi karticu",
            "deleteCard": "Izbrisi karticu",
            "addColumn": "Dodaj stupac",
            "editColumn": "Uredi stupac",
            "deleteColumn": "Izbrisi stupac",
            "close": "Zatvori",
            "cancel": "Odustani",
            "delete": "Izbrisi",
            "saveChanges": "Spremi promjene",
            "title": "Naslov:",
            "description": "Opis:",
            "newColumn": "Novi stupac",
            "deleteColumnConfirm": "Jeste li sigurni da zelite izbrisati ovaj stupac?",
            "deleteCardConfirm": "Jeste li sigurni da zelite izbrisati ovu karticu?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Povecaj vrijednost",
            "downArrowText": "Smanji vrijednost"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Postavke",
            "cancelButtonText": "Odustani",
            "applyButtonText": "Primijeni",
            "measures": "Odaberite polja za pocetak",
            "columns": "Odaberite polja za pocetak",
            "rows": "Odaberite polja za pocetak"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Primijeni",
            "sortAscending": "Uzlazno",
            "sortDescending": "Silazno",
            "filterFields": "Filter polja",
            "filter": "Filter",
            "include": "Ukljuci polja...",
            "clear": "Ocisti",
            "reset": "Ponisti",
            "moveToColumns": "Premjesti u stupce",
            "moveToRows": "Premjesti u retke",
            "movePrevious": "Natrag",
            "moveNext": "Naprijed",
            "filterOperatorsDropDownLabel": "Operatori filtera",
            "filterValueTextBoxLabel": "Vrijednost filtera",
            "operators": {
                "contains": "Sadrzi",
                "doesnotcontain": "Ne sadrzi",
                "startswith": "Pocinje s",
                "endswith": "Zavrsava s",
                "eq": "Jednako",
                "neq": "Nije jednako"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Odustani",
            "update": "Spremi",
            "endTitle": "Kraj ponavljanja",
            "repeatTitle": "Uzorak ponavljanja",
            "headerTitle": "Ponovi dogadaj",
            "end": {
                "never": "Nikad",
                "after": "Nakon",
                "on": "Na datum"
            },
            "daily": {
                "interval": "dan(a)"
            },
            "weekly": {
                "interval": "tjedan/tjedana"
            },
            "monthly": {
                "interval": "mjesec(i)",
                "repeatBy": "Ponovi po: ",
                "dayOfMonth": "Dan u mjesecu",
                "dayOfWeek": "Dan u tjednu"
            },
            "yearly": {
                "interval": "godina/e",
                "repeatBy": "Ponovi po: ",
                "dayOfMonth": "Dan u mjesecu",
                "dayOfWeek": "Dan u tjednu",
                "of": " od "
            },
            "endRule": {
                "after": " ponavljanja",
                "on": "Na datum "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Povecaj",
            "decreaseButtonTitle": "Smanji",
            "dragHandleTitle": "Povuci"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Izbrisi",
                "moveUp": "Gore",
                "moveDown": "Dolje",
                "transferTo": "Prenesi u",
                "transferFrom": "Prenesi iz",
                "transferAllTo": "Prenesi sve u",
                "transferAllFrom": "Prenesi sve iz"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Ucitavanje...",
            "requestFailed": "Zahtjev nije uspio.",
            "retry": "Pokusaj ponovno"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} je obavezno",
            "pattern": "{0} nije valjano",
            "min": "{0} mora biti vece ili jednako {1}",
            "max": "{0} mora biti manje ili jednako {1}",
            "step": "{0} nije valjano",
            "email": "{0} nije valjana e-mail adresa",
            "url": "{0} nije valjani URL",
            "date": "{0} nije valjani datum",
            "dateCompare": "Datum zavrsetka mora biti nakon datuma pocetka"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Ucitavanje..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Postavi",
            "cancel": "Odustani",
            "hour": "sat",
            "minute": "minuta",
            "second": "sekunda",
            "millisecond": "milisekunda",
            "now": "Sada"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Postavi",
            "cancel": "Odustani",
            "hour": "sat",
            "minute": "minuta",
            "second": "sekunda",
            "millisecond": "milisekunda",
            "now": "Sada",
            "date": "Datum",
            "time": "Vrijeme",
            "today": "Danas",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Danas",
            "navigateTo": "Idi na: ",
            "parentViews": {
                "month": "Godisnji prikaz",
                "year": "Desetljetni prikaz",
                "decade": "Stoljetni prikaz"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "godina",
            "month": "mjesec",
            "day": "dan",
            "weekday": "dan u tjednu",
            "hour": "sati",
            "minute": "minute",
            "second": "sekunde",
            "dayperiod": "prijepodne/poslijepodne"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "ocisti",
            "noData": "Nema podataka."
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "ocisti",
            "noData": "Nema podataka.",
            "singleTag": "odabranih stavki"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Upisite poruku...",
            "toggleButton": "Alatna traka",
            "sendButton": "Posalji"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Ponisti",
            "previous": "Prethodno",
            "next": "Sljedece",
            "done": "Gotovo",
            "step": "Korak",
            "of": "od"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Dokument",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Razina zumiranja",
                    "zoomOut": "Umanji",
                    "zoomIn": "Uvecaj",
                    "actualWidth": "Stvarna sirina",
                    "autoWidth": "Automatska sirina",
                    "fitToWidth": "Prilagodi sirini",
                    "fitToPage": "Prilagodi stranici"
                },
                "open": "Otvori",
                "exportAs": "Izvezi",
                "download": "Preuzmi",
                "pager": {
                    "first": "Idi na prvu stranicu",
                    "previous": "Idi na prethodnu stranicu",
                    "next": "Idi na sljedecu stranicu",
                    "last": "Idi na zadnju stranicu",
                    "of": "od",
                    "page": "stranica",
                    "pages": "stranica"
                },
                "print": "Ispis",
                "toggleSelection": "Odabir",
                "togglePan": "Pomicanje",
                "search": "Pretrazi"
            },
            "errorMessages": {
                "notSupported": "Podrzane su samo PDF datoteke.",
                "parseError": "PDF datoteku nije moguce obraditi.",
                "notFound": "Datoteka nije pronadena.",
                "popupBlocked": "Skocni prozor blokiran je od strane preglednika."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Ponovno generiraj captcha",
            "audio": "Reproduciraj zvuk captcha",
            "imageAlt": "Upisite tekst sa slike captcha",
            "success": "Provjera je uspjesna"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organizacijski dijagram",
            "edit": "Uredi",
            "create": "Stvori",
            "destroy": "Izbrisi",
            "destroyContent": "Jeste li sigurni da zelite izbrisati ovu stavku i njene podredene?",
            "destroyTitle": "Izbrisi stavku",
            "cancel": "Odustani",
            "save": "Spremi",
            "menuLabel": "Izbornik uređivanja",
            "uploadAvatar": "Ucitaj novu sliku",
            "parent": "Nadredeni",
            "name": "Naziv",
            "title": "Naslov",
            "none": "--Nista--",
            "expand": "Prosiri",
            "collapse": "Sazmi"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Naslov karte"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Jedinica"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Nema dostupnih podataka"
        });

}

  /* FilterCell messages */
  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "isTrue": "je istina",
        "isFalse": "je laž",
        "filter": "Filtriraj",
        "clear": "Očisti",
        "operator": "Operator"
      });
  }
  /* FilterCell operators */
  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "startswith": "Počinje s",
          "contains": "Sadrži",
          "doesnotcontain": "Ne sadrži",
          "endswith": "Završava s",
          "isnull": "Je null",
          "isnotnull": "Nije null",
          "isempty": "Je prazno",
          "isnotempty": "Nije prazno",
          "isnullorempty": "Nema vrijednost",
          "isnotnullorempty": "Ima vrijednost"
        },
        "number": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "gte": "Je veće ili jednako",
          "gt": "Je veće od",
          "lte": "Je manje ili jednako",
          "lt": "Je manje od",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        },
        "date": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "gte": "Je nakon ili jednako",
          "gt": "Je nakon",
          "lte": "Je prije ili jednako",
          "lt": "Je prije",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        },
        "enums": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        }
      });
  }
  /* FilterMenu operator messages */
  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "string": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "startswith": "Počinje s",
          "contains": "Sadrži",
          "doesnotcontain": "Ne sadrži",
          "endswith": "Završava s",
          "isnull": "Je null",
          "isnotnull": "Nije null",
          "isempty": "Je prazno",
          "isnotempty": "Nije prazno",
          "isnullorempty": "Nema vrijednost",
          "isnotnullorempty": "Ima vrijednost"
        },
        "number": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "gte": "Je veće ili jednako",
          "gt": "Je veće od",
          "lte": "Je manje ili jednako",
          "lt": "Je manje od",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        },
        "date": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "gte": "Je nakon ili jednako",
          "gt": "Je nakon",
          "lte": "Je prije ili jednako",
          "lt": "Je prije",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        },
        "enums": {
          "eq": "Je jednako",
          "neq": "Nije jednako",
          "isnull": "Je null",
          "isnotnull": "Nije null"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Nema zapisa za prikaz",
        "loading": "Učitavanje...",
        "requestFailed": "Zahtjev nije uspio.",
        "retry": "Ponovi",
        "commands": {
          "edit": "Uredi",
          "update": "Spremi",
          "canceledit": "Odustani",
          "create": "Dodaj novi zapis",
          "createchild": "Dodaj podređeni zapis",
          "destroy": "Obriši",
          "excel": "Izvezi u Excel",
          "pdf": "Izvezi u PDF"
        }
      });
  }
  /* TreeListPager messages */
  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "Sve",
        "display": "{0} - {1} od {2} stavki",
        "empty": "Nema stavki za prikaz",
        "page": "Stranica",
        "of": "od {0}",
        "itemsPerPage": "stavki po stranici",
        "first": "Idi na prvu stranicu",
        "previous": "Idi na prethodnu stranicu",
        "next": "Idi na sljedeću stranicu",
        "last": "Idi na zadnju stranicu",
        "refresh": "Osvježi",
        "morePages": "Više stranica"
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Nema zapisa za prikaz",
        "loading": "Učitavanje...",
        "requestFailed": "Zahtjev nije uspio.",
        "retry": "Ponovi",
        "commands": {
          "edit": "Uredi",
          "update": "Ažuriraj",
          "canceledit": "Odustani",
          "create": "Dodaj novi zapis",
          "createchild": "Dodaj podređeni zapis",
          "destroy": "Obriši",
          "excel": "Izvezi u Excel",
          "pdf": "Izvezi u PDF"
        }
      });
  }
  /* Upload messages */
  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Odaberi datoteke...",
        "cancel": "Odustani",
        "retry": "Ponovi",
        "remove": "Ukloni",
        "clearSelectedFiles": "Očisti",
        "uploadSelectedFiles": "Prenesi datoteke",
        "dropFilesHere": "Ispustite datoteke ovdje za prijenos",
        "statusUploading": "prijenos",
        "statusUploaded": "preneseno",
        "statusWarning": "upozorenje",
        "statusFailed": "neuspjelo",
        "headerStatusPaused": "Pauzirano",
        "headerStatusUploading": "Prijenos...",
        "headerStatusUploaded": "Gotovo",
        "uploadSuccess": "Datoteke uspješno prenesene.",
        "uploadFail": "Prijenos datoteka nije uspio.",
        "invalidMaxFileSize": "Veličina datoteke prevelika.",
        "invalidMinFileSize": "Veličina datoteke premala.",
        "invalidFileExtension": "Vrsta datoteke nije dopuštena."
      });
  }
  /* Dialog */
  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.localization =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Zatvori"
      });
  }
  /* Alert */
  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.localization =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "U redu"
      });
  }
  /* Confirm */
  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.localization =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "U redu",
        "cancel": "Odustani"
      });
  }
  /* Prompt */
  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.localization =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "U redu",
        "cancel": "Odustani"
      });
  }
  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Sve obrube",
  "insideBorders": "Unutarnje obrube",
  "insideHorizontalBorders": "Unutarnje vodoravne obrube",
  "insideVerticalBorders": "Unutarnje okomite obrube",
  "outsideBorders": "Vanjske obrube",
  "leftBorder": "Lijeva obruba",
  "topBorder": "Gornja obruba",
  "rightBorder": "Desna obruba",
  "bottomBorder": "Donja obruba",
  "noBorders": "Bez obruba",
  "reset": "Resetiraj boju",
  "customColor": "Prilagođena boja...",
  "apply": "Primijeni",
  "cancel": "Odustani"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Primijeni",
  "save": "Spremi",
  "cancel": "Odustani",
  "remove": "Ukloni",
  "retry": "Ponovi",
  "revert": "Vrati",
  "okText": "U redu",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Broj",
      "currency": "Valuta",
      "date": "Datum"
    }
  },
  "fontFamilyDialog": { "title": "Font" },
  "fontSizeDialog": { "title": "Veličina fonta" },
  "bordersDialog": { "title": "Obrube" },
  "alignmentDialog": {
    "title": "Poravnanje",
    "buttons": {
      "justifyLeft": "Poravnaj lijevo",
      "justifyCenter": "Centriraj",
      "justifyRight": "Poravnaj desno",
      "justifyFull": "Obostrano poravnanje",
      "alignTop": "Poravnaj gore",
      "alignMiddle": "Poravnaj sredinu",
      "alignBottom": "Poravnaj dolje"
    }
  },
  "mergeDialog": {
    "title": "Spajanje ćelija",
    "buttons": {
      "mergeCells": "Spoji sve",
      "mergeHorizontally": "Spoji vodoravno",
      "mergeVertically": "Spoji okomito",
      "unmerge": "Razdvoji"
    }
  },
  "freezeDialog": {
    "title": "Zamrzni okna",
    "buttons": {
      "freezePanes": "Zamrzni okna",
      "freezeRows": "Zamrzni retke",
      "freezeColumns": "Zamrzni stupce",
      "unfreeze": "Odmrzni okna"
    }
  },
  "confirmationDialog": {
    "text": "Jeste li sigurni da želite ukloniti ovaj list?",
    "title": "Uklanjanje lista"
  },
  "validationDialog": {
    "title": "Provjera valjanosti podataka",
    "hintMessage": "Unesite valjanu {0} vrijednost {1}.",
    "hintTitle": "Provjera {0}",
    "criteria": {
      "any": "Bilo koja vrijednost",
      "number": "Broj",
      "text": "Tekst",
      "date": "Datum",
      "custom": "Prilagođena formula",
      "list": "Popis"
    },
    "comparers": {
      "greaterThan": "veće od",
      "lessThan": "manje od",
      "between": "između",
      "notBetween": "nije između",
      "equalTo": "jednako",
      "notEqualTo": "nije jednako",
      "greaterThanOrEqualTo": "veće ili jednako",
      "lessThanOrEqualTo": "manje ili jednako"
    },
    "comparerMessages": {
      "greaterThan": "veće od {0}",
      "lessThan": "manje od {0}",
      "between": "između {0} i {1}",
      "notBetween": "nije između {0} i {1}",
      "equalTo": "jednako {0}",
      "notEqualTo": "nije jednako {0}",
      "greaterThanOrEqualTo": "veće ili jednako {0}",
      "lessThanOrEqualTo": "manje ili jednako {0}",
      "custom": "koje zadovoljava formulu: {0}"
    },
    "labels": {
      "criteria": "Kriterij",
      "comparer": "Usporedba",
      "min": "Min",
      "max": "Maks",
      "value": "Vrijednost",
      "start": "Početak",
      "end": "Kraj",
      "onInvalidData": "Pri nevažećim podacima",
      "rejectInput": "Odbij unos",
      "showWarning": "Prikaži upozorenje",
      "showHint": "Prikaži savjet",
      "hintTitle": "Naslov savjeta",
      "hintMessage": "Poruka savjeta",
      "ignoreBlank": "Zanemari prazne"
    },
    "placeholders": {
      "typeTitle": "Unesite naslov",
      "typeMessage": "Unesite poruku"
    }
  },
  "exportAsDialog": {
    "title": "Izvoz...",
    "labels": {
      "fileName": "Naziv datoteke",
      "saveAsType": "Vrsta datoteke",
      "exportArea": "Izvoz",
      "paperSize": "Veličina papira",
      "margins": "Margine",
      "orientation": "Orijentacija",
      "print": "Ispis",
      "guidelines": "Smjernice",
      "center": "Centar",
      "horizontally": "Vodoravno",
      "vertically": "Okomito"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nije moguće promijeniti dio spojene ćelije."
  },
  "useKeyboardDialog": {
    "title": "Kopiranje i lijepljenje",
    "errorMessage": "Ove radnje ne mogu se pozvati putem izbornika. Koristite tipkovničke prečace:",
    "labels": {
      "forCopy": "za kopiranje",
      "forCut": "za izrezivanje",
      "forPaste": "za lijepljenje"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Radnja se ne može izvršiti na višestrukom odabiru."
  },
  "insertCommentDialog": {
    "title": "Umetni komentar",
    "labels": {
      "comment": "Komentar",
      "removeComment": "Ukloni komentar"
    }
  },
  "insertImageDialog": {
    "title": "Umetni sliku",
    "info": "Povucite sliku ovdje ili kliknite za odabir",
    "typeError": "Odaberite JPEG, PNG ili GIF sliku"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sortiraj raspon A do Z",
  "sortDescending": "Sortiraj raspon Z do A",
  "filterByValue": "Filtriraj po vrijednosti",
  "filterByCondition": "Filtriraj po uvjetu",
  "apply": "Primijeni",
  "search": "Pretraži",
  "addToCurrent": "Dodaj trenutnom odabiru",
  "clear": "Očisti",
  "blanks": "(Prazno)",
  "operatorNone": "Ništa",
  "and": "I",
  "or": "ILI",
  "operators": {
    "string": {
      "contains": "Tekst sadrži",
      "doesnotcontain": "Tekst ne sadrži",
      "startswith": "Tekst počinje s",
      "endswith": "Tekst završava s"
    },
    "date": {
      "eq": "Datum je",
      "neq": "Datum nije",
      "lt": "Datum je prije",
      "gt": "Datum je nakon"
    },
    "number": {
      "eq": "Jednako je",
      "neq": "Nije jednako",
      "gte": "Veće ili jednako",
      "gt": "Veće od",
      "lte": "Manje ili jednako",
      "lt": "Manje od"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Resetiraj boju",
  "customColor": "Prilagođena boja...",
  "apply": "Primijeni",
  "cancel": "Odustani"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Dodaj stupac lijevo",
  "addColumnRight": "Dodaj stupac desno",
  "addRowAbove": "Dodaj redak iznad",
  "addRowBelow": "Dodaj redak ispod",
  "alignment": "Poravnanje",
  "alignmentButtons": {
    "justifyLeft": "Poravnaj lijevo",
    "justifyCenter": "Centriraj",
    "justifyRight": "Poravnaj desno",
    "justifyFull": "Obostrano poravnanje",
    "alignTop": "Poravnaj gore",
    "alignMiddle": "Poravnaj sredinu",
    "alignBottom": "Poravnaj dolje"
  },
  "backgroundColor": "Pozadina",
  "bold": "Podebljano",
  "borders": "Obrube",
  "colorPicker": {
    "reset": "Resetiraj boju",
    "customColor": "Prilagođena boja..."
  },
  "copy": "Kopiraj",
  "cut": "Izreži",
  "deleteColumn": "Obriši stupac",
  "deleteRow": "Obriši redak",
  "excelImport": "Uvoz iz Excela...",
  "filter": "Filtar",
  "fontFamily": "Font",
  "fontSize": "Veličina fonta",
  "format": "Prilagođeni format...",
  "formatTypes": {
    "automatic": "Automatski",
    "number": "Broj",
    "percent": "Postotak",
    "financial": "Financijski",
    "currency": "Valuta",
    "date": "Datum",
    "time": "Vrijeme",
    "dateTime": "Datum vrijeme",
    "duration": "Trajanje",
    "moreFormats": "Više formata..."
  },
  "formatDecreaseDecimal": "Smanji decimale",
  "formatIncreaseDecimal": "Povećaj decimale",
  "freeze": "Zamrzni okna",
  "freezeButtons": {
    "freezePanes": "Zamrzni okna",
    "freezeRows": "Zamrzni retke",
    "freezeColumns": "Zamrzni stupce",
    "unfreeze": "Odmrzni okna"
  },
  "insertComment": "Umetni komentar",
  "insertImage": "Umetni sliku",
  "italic": "Kurziv",
  "merge": "Spoji ćelije",
  "mergeButtons": {
    "mergeCells": "Spoji sve",
    "mergeHorizontally": "Spoji vodoravno",
    "mergeVertically": "Spoji okomito",
    "unmerge": "Razdvoji"
  },
  "open": "Otvori...",
  "paste": "Zalijepi",
  "quickAccess": {
    "redo": "Ponovi",
    "undo": "Poništi"
  },
  "saveAs": "Spremi kao...",
  "sortAsc": "Sortiraj uzlazno",
  "sortDesc": "Sortiraj silazno",
  "sortButtons": {
    "sortSheetAsc": "Sortiraj list A do Z",
    "sortSheetDesc": "Sortiraj list Z do A",
    "sortRangeAsc": "Sortiraj raspon A do Z",
    "sortRangeDesc": "Sortiraj raspon Z do A"
  },
  "textColor": "Boja teksta",
  "textWrap": "Prelamanje teksta",
  "underline": "Podcrtano",
  "validation": "Provjera valjanosti podataka..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "Okvir naziva",
  "formulaInput": "Unos formule",
  "errors": {
    "shiftingNonblankCells": "Nije moguće umetnuti ćelije zbog mogućeg gubitka podataka. Odaberite drugo mjesto umetanja ili obrišite podatke s kraja lista.",
    "filterRangeContainingMerges": "Nije moguće stvoriti filtar unutar raspona koji sadrži spojene ćelije",
    "validationError": "Unesena vrijednost krši pravila provjere valjanosti ćelije."
  },
  "tabs": {
    "home": "Početna",
    "insert": "Umetni",
    "data": "Podaci"
  },
  "sheetBar": {
    "addSheet": "Dodaj novi list",
    "deleteSheet": "Obriši",
    "duplicateSheet": "Dupliciraj",
    "renameSheet": "Preimenuj",
    "hideSheet": "Sakrij",
    "moveRight": "Pomakni desno",
    "moveLeft": "Pomakni lijevo"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Nema prethodnih pretraživanja",
        "noPreviousPrompts": "Nema prethodnih upita",
        "previousSearches": "Prethodna pretraživanja",
        "previousPrompts": "Prethodni upiti",
        "suggestedPrompts": "Predloženi upiti",
        "searchModeLabel": "Pretraživanje",
        "searchModeDescription": "Traži točna podudaranja riječi u vašim podacima",
        "searchPlaceholder": "Pretraživanje",
        "semanticSearchModeLabel": "Semantičko pretraživanje",
        "semanticSearchModeDescription": "Razumije kontekst za prikaz najrelevantnijih rezultata.",
        "semanticSearchPlaceholder": "Semantičko pretraživanje",
        "semanticSearchButtonText": "Pretraži",
        "aiAssistantPlaceholder": "Sortiraj, filtriraj ili grupiraj s AI-jem",
        "speechToText": "Govor u tekst",
        "speechToTextAriaLabel": "Pokreni prepoznavanje govora",
        "cancel": "Odustani",
        "send": "Pošalji",
        "searchButtonText": "Pretraži",
        "aiAssistantButtonText": "AI pomoćnik"
      });
  }

})(window.kendo.jQuery);