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

})(window.kendo.jQuery);
