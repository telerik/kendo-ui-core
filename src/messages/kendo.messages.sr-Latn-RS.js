/**
 * Kendo UI v2017.3.1026 (http://www.telerik.com/kendo-ui)
 * Copyright 2017 Telerik EAD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
















*/

(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "primeniti",
  "cancel": "otkažite",
  "noColor": "nema boje",
  "clearColor": "Očisti boja"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "primeniti",
  "cancel": "otkažite",
  "noColor": "nema boje",
  "clearColor": "Očisti boja"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Sortiraj rastući",
  "sortDescending": "Sortiraj padajuće",
  "filter": "Filter",
  "columns": "Kolone",
  "done": "Gotovo",
  "settings": "Postavke kolone",
  "lock": "Zaključaj",
  "unlock": "Otključaj"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Bold",
  "italic": "Italic",
  "underline": "Podvući",
  "strikethrough": "Prorez",
  "superscript": "Nadznak",
  "subscript": "Podznak",
  "justifyCenter": "Poravnajte tekst centar",
  "justifyLeft": "Poravnajte tekst levo",
  "justifyRight": "Poravnajte tekst desno",
  "justifyFull": "Poravnajte tekst do ivica",
  "insertUnorderedList": "Umetni nesređenu lisu",
  "insertOrderedList": "Umetni sređenu lisu",
  "indent": "Uvlačenje",
  "outdent": "Izvuci",
  "createLink": "Ubacite hipervezu",
  "unlink": "Ukloni hipervezu",
  "insertImage": "Ubaci sliku",
  "insertFile": "Ubaci fajl",
  "insertHtml": "Ubaci HTML",
  "viewHtml": "Pregledajte HTML",
  "fontName": "Izaberite porodicu fontova",
  "fontNameInherit": "(nasleđeni font)",
  "fontSize": "Izaberite veličinu font",
  "fontSizeInherit": "(nasleđena veličina)",
  "formatBlock": "Format",
  "formatting": "Format",
  "foreColor": "Boja",
  "backColor": "Boja pozadine",
  "style": "Stil",
  "emptyFolder": "Prazan direktorium",
  "uploadFile": "Otpremiti",
  "overflowAnchor": "Još alata",
  "orderBy": "Sortirati po:",
  "orderBySize": "Veličina",
  "orderByName": "Ime",
  "invalidFileType": "Izabrana datoteka \"{0}\" nije važeća. Podržani tipovi datoteka su {1}.",
  "deleteFile": 'Dali ste sigurni da želite da izbrišete "{0}"?',
  "overwriteFile": 'Datoteka sa imenom "{0}" već postoji u trenutnom direktorijumu. Da li želite da je prepisati?',
  "directoryNotFound": "Direktorium sa ovim imenom nije pronađen.",
  "imageWebAddress": "Web adresa",
  "imageAltText": "Alternativni tekst",
  "imageWidth": "Širina (px)",
  "imageHeight": "Visina (px)",
  "fileWebAddress": "Web adresa",
  "fileTitle": "Naslov",
  "linkWebAddress": "Web adresa",
  "linkText": "Tekst",
  "linkToolTip": "Oznaka",
  "linkOpenInNewWindow": "Otvorite link u novom prozoru",
  "dialogUpdate": "Ažuriranje",
  "dialogInsert": "Ubacite",
  "dialogButtonSeparator": "ili",
  "dialogCancel": "Otkazati",
  "cleanFormatting": "Čisto formatiranje",
  "createTable": "Napravi tabelu",
  "addColumnLeft": "Dodajte kolonu sa leve strane",
  "addColumnRight": "Dodajte kolonu sa desne strane",
  "addRowAbove": "Dodajte red iznad",
  "addRowBelow": "Dodajte red ispod",
  "deleteRow": "Obriši red",
  "deleteColumn": "Izbriši kolonu",
  "dialogOk": "Ok",
  "tableWizard": "Čarobnjak za tebele",
  "tableTab": "Tabele",
  "cellTab": "Čelija",
  "accessibilityTab": "Pristupačnost",
  "caption": "Naslov",
  "summary": "Rezime",
  "width": "Širina",
  "height": "Visina",
  "units": "Jedinice",
  "cellSpacing": "Razmak ćelija",
  "cellPadding": "Popunjenost ćelija",
  "cellMargin": "Margina ćelija",
  "alignment": "Poravnanje",
  "background": "Pozadina",
  "cssClass": "CSS Klasa",
  "id": "ID",
  "border": "Rub",
  "borderStyle": "Stil ruba",
  "collapseBorders": "Sakrij rub",
  "wrapText": "Zamotaj tekst",
  "associateCellsWithHeaders": "Udružene ćelije sa zaglavljima",
  "alignLeft": "Poravnati levo",
  "alignCenter": "Poravnajte centar",
  "alignRight": "Poravnati desno",
  "alignLeftTop": "Poravnati Levo Gore",
  "alignCenterTop": "Poravnati Centar Gore",
  "alignRightTop": "Poravnati Desno Gore",
  "alignLeftMiddle": "Poravnati Levo Sredina",
  "alignCenterMiddle": "Poravnati Centar Sredina",
  "alignRightMiddle": "Poravnati Desno Sredina",
  "alignLeftBottom": "Poravnati Levo Dole",
  "alignCenterBottom": "Poravnati Centar Dole",
  "alignRightBottom": "Poravnati Desno Dole",
  "alignRemove": "Uklonite poravnanje",
  "columns": "Kolone",
  "rows": "Red",
  "selectAllCells": "Izaberite sve ćelije"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Otpremiti",
  "orderBy": "Sortirati po",
  "orderByName": "Ime",
  "orderBySize": "Veličina",
  "directoryNotFound": "Direktorium sa ovim imenom nije pronađen.",
  "emptyFolder": "Prazan direktorium",
  "deleteFile": 'Dali ste sigurni da želite da izbrišete "{0}"?',
  "invalidFileType": "Izabrana datoteka \"{0}\" nije važeća. Podržani tipovi datoteka su {1}.",
  "overwriteFile": "Datoteka sa imenom \"{0}\" već postoji u trenutnom direktorijumu. Da li želite da je prepisati?",
  "dropFilesHere": "otpustite datoteku ovde za otpremanje",
  "search": "Traži"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "tačno",
  "isFalse": "netačno",
  "filter": "Filter",
  "clear": "Jasno",
  "operator": "Operator"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Jednako na",
    "neq": "Nije jednako na",
    "startswith": "Počinje sa",
    "contains": "Sadrži",
    "doesnotcontain": "Ne sadrži",
    "endswith": "Završava sa",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost",
    "isempty": "Prazno",
    "isnotempty": "Nije prazno"
  },
  "number": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "gte": "Je više ili jednako na",
    "gt": "Je veći od",
    "lte": "Je manje ili jednako na",
    "lt": "Je manje od",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  },
  "date": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "gte": "Je nakon ili jednako na",
    "gt": "Je nakon",
    "lte": "Pre ili jednako na",
    "lt": "Je pre nego",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  },
  "enums": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Pokažite stavke s vrijednosnim koi imaju:",
  "title": "Pokažite stavke s vrijednosnim koi imaju",
  "isTrue": "je tačno",
  "isFalse": "nije tačno",
  "filter": "filter",
  "clear": "Očisti",
  "and": "I",
  "or": "Ili",
  "selectValue": "-Izaberite vrednost-",
  "operator": "Operator",
  "value": "Vrednost",
  "cancel": "Otkazati"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "startswith": "Počinje sa",
    "contains": "Sadrži",
    "doesnotcontain": "Ne sadrži",
    "endswith": "Završava sa",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost",
    "isempty": "Prazno",
    "isnotempty": "Nije prazno"
  },
  "number": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "gte": "Je veći od ili jednak na",
    "gt": "Je veći od",
    "lte": "Je manje ili jednako od",
    "lt": "Je manje od",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  },
  "date": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "gte": "Je nakon ili jednako na",
    "gt": "Je nakon",
    "lte": "Je Pre ili jednako na",
    "lt": "Je Pre",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  },
  "enums": {
    "eq": "Je jednako na",
    "neq": "Nije jednako na",
    "isnull": "Nikakva vrednost",
    "isnotnull": "Ima vrednost"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Izaberi sve",
  "clear": "Očisti",
  "filter": "Filter",
  "search": "Traži"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Dodaj Dete",
    "append": "Dodaj Zadatak",
    "insertAfter": "Dodaj Ispod",
    "insertBefore": "Dodaj Gore",
    "pdf": "Izvozi u PDF"
  },
  "cancel": "Otkazati",
  "deleteDependencyWindowTitle": "Obriši zavisnost",
  "deleteTaskWindowTitle": "Obrišite zadatak",
  "destroy": "Izbriši",
  "editor": {
    "assingButton": "Dodeli",
    "editorTitle": "Zadatak",
    "end": "Kraj",
    "percentComplete": "Završen",
    "resources": "Resursi",
    "resourcesEditorTitle": "Resursi",
    "resourcesHeader": "Resursi",
    "start": "Start",
    "title": "Naslov",
    "unitsHeader": "Jedinice"
  },
  "save": "Sačuvaj",
  "views": {
    "day": "Den",
    "end": "Kraj",
    "month": "Mesec",
    "start": "Start",
    "week": "Nedelja",
    "year": "Godina"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Otkaži promene",
    "canceledit": "Otkazati",
    "create": "Dodajte novi zapis",
    "destroy": "Izbriši",
    "edit": "Izmeni",
    "excel": "Izvozite u Excel",
    "pdf": "Izvozi u PDF",
    "save": "Sačuvaj promene",
    "select": "Izaberite",
    "update": "Ažuriraj"
  },
  "editable": {
    "cancelDelete": "Otkazati",
    "confirmation": "Da li ste sigurni da želite izbrisati ovaj zapis?",
    "confirmDelete": "Izbriši"
  },
  "noRecords": "Nema stavki.",
  "expandCollapseColumnHeader": ""
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Nema podataka za prikaz",
    "loading": "Učitavanje...",
    "requestFailed": "Zahtev nije uspeo.",
    "retry": "Pokušaj ponovo",
    "commands": {
        "edit": "Izmeni",
        "update": "Ažuriraj",
        "canceledit": "Otkazati",
        "create": "Dodajte novi zapis",
        "createchild": "Dodadite detalj zapis",
        "destroy": "Izbriši",
        "excel": "Izvozi u Excel",
        "pdf": "Izvozi u PDF"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Prevucite zaglavlje kolone i pustite je ovde da se grupiraju do kolonom"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Povećajte vrednost",
  "downArrowText": "Smanji vrednost"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pauza",
  "play": "Reprodukovati",
  "mute": "Isključite glas",
  "unmute": "Uključite glas",
  "quality": "Kvalitet",
  "fullscreen": "Ceo ekran"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Sve",
  "display": "{0} - {1} od {2} stavke",
  "empty": "Nema stavki za prikaz",
  "page": "Strana",
  "of": "od {0}",
  "itemsPerPage": "Predmeti po stranici",
  "first": "Idite na prvu stranicu",
  "previous": "Idite na prethodnu stranicu",
  "next": "Idite na sledeću stranicu",
  "last": "Idite na poslednju stranicu",
  "refresh": "Osvježi",
  "morePages": "Više stranica"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Spustite polja podataka ovde",
  "columnFields": "Spustite kolona podataka ovde",
  "rowFields": "Spustite red podataka ovde"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Pokažite stavke s vrijednosnim koji:",
  "filterFields": "Filter polja",
  "filter": "Filter",
  "include": "Uključi polja...",
  "title": "Polja za uključivanje",
  "clear": "Očisti",
  "ok": "Ok",
  "cancel": "Otkazati",
  "operators": {
    "contains": "Sadrži",
    "doesnotcontain": "Ne sadrži",
    "startswith": "Počinje sa",
    "endswith": "Završava sa",
    "eq": "Je jednako na",
    "neq": "Nije jednako na"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nikad",
    "hourly": "Po satu",
    "daily": "Dnevno",
    "weekly": "Nedeljno",
    "monthly": "Mesečno",
    "yearly": "Godišnje"
  },
  "hourly": {
    "repeatEvery": "Ponovite svako: ",
    "interval": " sat(i)"
  },
  "daily": {
    "repeatEvery": "Ponovite svako: ",
    "interval": " dan/ovi"
  },
  "weekly": {
    "interval": " nedelja(ma)",
    "repeatEvery": "Ponovite svako: ",
    "repeatOn": "Ponoviti na: "
  },
  "monthly": {
    "repeatEvery": "Ponovite svako: ",
    "repeatOn": "Ponoviti na: ",
    "interval": " mesec/i",
    "day": "Day "
  },
  "yearly": {
    "repeatEvery": "Ponovite svako: ",
    "repeatOn": "Ponoviti na: ",
    "interval": " godina(e)",
    "of": " od "
  },
  "end": {
    "label": "Kraj:",
    "mobileLabel": "Završava",
    "never": "Nikad",
    "after": "Posle",
    "occurrence": " pojava",
    "on": "na "
  },
  "offsetPositions": {
    "first": "prvi",
    "second": "drugi",
    "third": "treći",
    "fourth": "četvrti",
    "last": "poslednji"
  },
  "weekdays": {
    "day": "den",
    "weekday": "radni dan",
    "weekend": "vikend"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "ceo dan",
  "date": "Data",
  "event": "Događaj",
  "time": "Vreme",
  "showFullDay": "Prikaži ceo dan",
  "showWorkDay": "Prikaži radno vreme",
  "today": "Danas",
  "save": "Začuvaj",
  "cancel": "Otkazati",
  "destroy": "Izbriši",
  "deleteWindowTitle": "Obriši događaj",
  "ariaSlotLabel": "Izabrano od {0:t} do {1:t}",
  "ariaEventLabel": "{0} na {1:D} u {2:t}",
  "editable": {
    "confirmation": "Da li ste sigurni da želite izbrisati ovaj događaj?"
  },
  "views": {
    "day": "Dan",
    "week": "Nedelja",
    "workWeek": "Radna nedelja",
    "agenda": "Agenda",
    "month": "Mesec"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Izbrišite ponavljajuću stavku",
    "deleteWindowOccurrence": "Obrišite trenutnu događaj",
    "deleteWindowSeries": "Izbrišite seriju",
    "editWindowTitle": "Edit Recurring Item",
    "editWindowOccurrence": "Izmeni ponavljajuću stavku",
    "editWindowSeries": "Izmeni seriju",
    "deleteRecurring": "Da li želite da izbrišete samo pojavu ovog događaja ili čitavu seriju?",
    "editRecurring": "Želite li urediti samo pojavu događaja ili čitavu seriju?"
  },
  "editor": {
    "title": "Naslov",
    "start": "Start",
    "end": "Kraj",
    "allDayEvent": "Celodnevni događaj",
    "description": "Opis",
    "repeat": "Ponovi",
    "timezone": " ",
    "startTimezone": "Započnite vremensku zonu",
    "endTimezone": "Kraj vremenske zone",
    "separateTimezones": "Koristite odvojene početne i krajnje vremenske zone",
    "timezoneEditorTitle": "Vremenske zone",
    "timezoneEditorButton": "Vremenske zone",
    "timezoneTitle": "Vremenske zone",
    "noTimezone": "Bez vremenske zone",
    "editorTitle": "Događaj"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Sve ivice",
  "insideBorders": "Unutrašnji rubovi",
  "insideHorizontalBorders": "Unutar horizontalnih ivica",
  "insideVerticalBorders": "Unutar vertikalnih ivica",
  "outsideBorders": "Van ivica",
  "leftBorder": "Lev rub",
  "topBorder": "Gorni rub",
  "rightBorder": "Desen rub",
  "bottomBorder": "Donji rub",
  "noBorders": "Nema ivice",
  "reset": "Resetovanje boje",
  "customColor": "Prilagođena boja...",
  "apply": "Primeniti",
  "cancel": "Otkazati"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Primeniti",
  "save": "Sačuvati",
  "cancel": "Otkazati",
  "remove": "Ukloni",
  "retry": "Ponovo",
  "revert": "Vratiti ",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Broj",
      "currency": "Valuta",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Font"
  },
  "fontSizeDialog": {
    "title": "Veličina na font"
  },
  "bordersDialog": {
    "title": "Ivice"
  },
  "alignmentDialog": {
    "title": "Poravnanje",
    "buttons": {
     "justtifyLeft": "Poravnati levo",
     "justifyCenter": "Centar",
     "justifyRight": "Poravnati desno",
     "justifyFull": "Poravnajte tekst do ivica",
     "alignTop": "Poravnati gore",
     "alignMiddle": "Poravnati sredina",
     "alignBottom": "Poravnati dole"
    }
  },
  "mergeDialog": {
    "title": "Spajati ćelije",
    "buttons": {
      "mergeCells": "Spoji svi",
      "mergeHorizontally": "Spoji horizontalno",
      "mergeVertically": "Spoji vertikalno",
      "unmerge": "Odvoj"
    }
  },
  "freezeDialog": {
    "title": "Zamrznuti paneli",
    "buttons": {
      "freezePanes": "Zamrznuti paneli",
      "freezeRows": "Zamrznuti redovi",
      "freezeColumns": "Zamrznuti koloni",
      "unfreeze": "Odzračite panele"
    }
  },
  "confirmationDialog": {
    "text": "Da li ste sigurni da želite ukloniti ovaj list?",
    "title": "Odstranite list"
  },
  "validationDialog": {
    "title": "Validacija podataka",
    "hintMessage": "Molimo unesite važeću{0} vrednost {1}.",
    "hintTitle": "Validacija {0}",
    "criteria": {
      "any": "Svaka vrijednost",
      "number": "Broj",
      "text": "Tekst",
      "date": "Data",
      "custom": "Prilagođena Formula",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "veće od",
      "lessThan": "manje od",
      "between": "između",
      "notBetween": "nije između",
      "equalTo": "jednako na",
      "notEqualTo": "nije jednako na",
      "greaterThanOrEqualTo": "više ili jednako na",
      "lessThanOrEqualTo": "manje ili jednako na"
    },
    "comparerMessages": {
      "greaterThan": "veće od {0}",
      "lessThan": "manje od {0}",
      "between": "između {0} i {1}",
      "notBetween": "nije između {0} i {1}",
      "equalTo": "jednako na {0}",
      "notEqualTo": "nije jednako na {0}",
      "greaterThanOrEqualTo": "više ili jednako na {0}",
      "lessThanOrEqualTo": "manje ili jednako na {0}",
      "custom": "koja zadovoljava formulu: {0}"
    },
    "labels": {
      "criteria": "Kriterijum",
      "comparer": "Uporedite",
      "min": "Min",
      "max": "Max",
      "value": "Vrednost`",
      "start": "Start",
      "end": "Kraj",
      "onInvalidData": "O nevažećim podacima",
      "rejectInput": "Odbijte upis",
      "showWarning": "Prikaži upozorenje",
      "showHint": "Pokaži savet",
      "hintTitle": "Naslov savet",
      "hintMessage": "Savet poruka",
      "ignoreBlank": "Ignoriraj prazno"
    },
    "placeholders": {
      "typeTitle": "Unesite naslov",
      "typeMessage": "Unesite poruka"
    }
  },
  "exportAsDialog": {
    "title": "Izvoz...",
    "labels": {
      "fileName": "Ime na datoteka",
      "saveAsType": "Sačuvaj kao tip",
      "exportArea": "Izvoz",
      "paperSize": "Veličina papira",
      "margins": "Margine",
      "orientation": "Orijentacija",
      "print": "Štampaj",
      "guidelines": "Smernice",
      "center": "Centar",
      "horizontally": "Horizontalno",
      "vertically": "Vertikalno"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Ne mogu da menjam deo spojene ćelije."
  },
  "useKeyboardDialog": {
    "title": "Kopiranje i umetanje",

    "errorMessage": "Ove akcije se ne mogu pozivati preko menija. Umjesto toga koristite prečice na tastaturi:",
    "labels": {
      "forCopy": "za kopiranje",
      "forCut": "za rez",
      "forPaste": "za umetanje"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Ta akcija se ne može izvoditi na više izbora."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sortirajte opseg od A do Z",
  "sortDescending": "Sortirajte opseg od Z do A",
  "filterByValue": "Filter po vrednosti",
  "filterByCondition": "Filtriraj po stanju",
  "apply": "Primeniti",
  "search": "Traži",
  "addToCurrent": "Dodaj trenutni izbor",
  "clear": "Očisti",
  "blanks": "(Prazno)",
  "operatorNone": "Ništa",
  "and": "I",
  "or": "ILI",
  "operators": {
    "string": {
      "contains": "Tekst sadrži",
      "doesnotcontain": "Tekst ne sadrži",
      "startswith": "Tekst počinje sa",
      "endswith": "Tekst se završava"
    },
    "date": {
      "eq":  "Datum je",
      "neq": "Datum nije",
      "lt":  "Datum je pre",
      "gt":  "Datum je posle"
    },
    "number": {
      "eq": "Je jednako na",
      "neq": "Nije jednako na",
      "gte": "Je veći od ili jednak na",
      "gt": "Je veći od",
      "lte": "Je manje ili jednako na",
      "lt": "Is less than"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Resetovanje boje",
  "customColor": "Prilagođena boja...",
  "apply": "Primeniti",
  "cancel": "Otkazati"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Dodajte kolonu levo",
  "addColumnRight": "Dodajte kolonu desno",
  "addRowAbove": "Dodajte kolonu gore",
  "addRowBelow": "Dodajte kolonu dole",
  "alignment": "Poravnanje",
  "alignmentButtons": {
    "justtifyLeft": "Poravnati levo",
    "justifyCenter": "Centar",
    "justifyRight": "Poravnati desno",
    "justifyFull": "Poravnajte tekst do ivica",
    "alignTop": "Poravnati gore",
    "alignMiddle": "Poravnati sredina",
    "alignBottom": "Poravnati dole"
  },
  "backgroundColor": "Pozadina",
  "bold": "Bold",
  "borders": "Ivica",
  "colorPicker": {
    "reset": "Resetovanje boja",
    "customColor": "Prilagođena boja..."
  },
  "copy": "Kopiraj",
  "cut": "Rez",
  "deleteColumn": "Izbriši kolonu",
  "deleteRow": "Izbriši red",
  "excelImport": "Import od Excel...",
  "filter": "Filter",
  "fontFamily": "Font",
  "fontSize": "Font veličina",
  "format": "Prilagođen format...",
  "formatTypes": {
    "automatic": "Automatski",
    "number": "Broj",
    "percent": "Procent",
    "financial": "Finansijski",
    "currency": "Valuta",
    "date": "Datum",
    "time": "Vreme",
    "dateTime": "Datum vreme",
    "duration": "Trajanje",
    "moreFormats": "Više formata..."
  },
  "formatDecreaseDecimal": "Smanji decimala",
  "formatIncreaseDecimal": "Povećati decimala",
  "freeze": "Zamrznuti paneli",
  "freezeButtons": {
    "freezePanes": "Zamrznuti paneli",
    "freezeRows": "Zamrznuti red",
    "freezeColumns": "Zamrzne kolone",
    "unfreeze": "Odzračite panele"
  },
  "italic": "Italic",
  "merge": "Spajati ćelije",
  "mergeButtons": {
    "mergeCells": "Spoji svi",
    "mergeHorizontally": "Spoji horizontalno",
    "mergeVertically": "Spoji verticalno",
    "unmerge": "Razdoji"
  },
  "open": "Otvori...",
  "paste": "Umetni",
  "quickAccess": {
    "redo": "Ponovo",
    "undo": "Poništiti"
  },
  "saveAs": "Save As...",
  "sortAsc": "Sortiraj rastuće",
  "sortDesc": "Sortiraj silazno",
  "sortButtons": {
    "sortSheetAsc": "Sortiraj listu A do Z",
    "sortSheetDesc": "Sortiraj listu Z do A",
    "sortRangeAsc": "Sortirajte opseg A do Z",
    "sortRangeDesc": "Sortirajte opseg Z do A"
  },
  "textColor": "Boja teksta",
  "textWrap": "Prelomiti tekst",
  "underline": "Podvući",
  "validation": "Validacija podataka..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Ne mogu uložiti ćelije zbog mogućnosti gubitka podataka. Izaberite drugu lokaciju za ubacivanje ili izbrišite podatke sa kraja radnog lista.",
    "filterRangeContainingMerges": "Ne mogu napraviti filter unutar opsega koji sadrži spoj",
    "validationError": "Vrednost koju unesete krši pravila validacije postavljena na ćeliji."
  },
  "tabs": {
    "home": "Doma",
    "insert": "Ubaci",
    "data": "Podatci"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Povećajte",
  "decreaseButtonTitle": "Smanjite"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Izbriši",
    "moveUp": "Pomeri Gore",
    "moveDown": "Pomeri Dole",
    "transferTo": "Prenos Do",
    "transferFrom": "Prenos Od",
    "transferAllTo": "Prenosi Sve Do",
    "transferAllFrom": "Prenosi Sve Od"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Nema podataka za prikaz",
  "loading": "Učitavanje...",
  "requestFailed": "Zahtev nije uspeo.",
  "retry": "Pokušaj ponovo",
  "commands": {
      "edit": "Izmeni",
      "update": "Ažuriraj",
      "canceledit": "Otkazati",
      "create": "Dodajte novi zapis",
      "createchild": "Dodadite detalj zapis",
      "destroy": "Izbriši",
      "excel": "Export u Excel",
      "pdf": "Export u PDF"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Učitavanje...",
  "requestFailed": "Zahtev nije uspeo.",
  "retry": "Ponovo"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Izaberite datoteke...",
  "cancel": "Otkazati",
  "retry": "Ponovo",
  "remove": "Ukloni",
  "clearSelectedFiles": "Očisti",
  "uploadSelectedFiles": "Otpremiti datoteka",
  "dropFilesHere": "Ispustite datoteke ovde da biste ih otpremili",
  "statusUploading": "otpremiti",
  "statusUploaded": "zavrsio otpremiti",
  "statusWarning": "upozorenje",
  "statusFailed": "nije uspeo",
  "headerStatusUploading": "otpremiti...",
  "headerStatusUploaded": "Gotovo",
  "invalidMaxFileSize": "Veličina datoteke je prevelika.",
  "invalidMinFileSize": "Veličina datoteke je premala.",
  "invalidFileExtension": "Tip datoteke nije dozvoljen."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} je potrebno",
  "pattern": "{0} nije važeća",
  "min": "{0} treba da bude veća ili jednaka {1}",
  "max": "{0} treba da bude manji ili jednak {1}",
  "step": "{0} nije važeća",
  "email": "{0} nije važeći e-mail",
  "url": "{0} nije važeći URL URL",
  "date": "{0} nije važeći datum",
  "dateCompare": "Krajnji datum mora biti veći ili jednak početnom datumu"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Učitavanje..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Otkazati"
});
}

/* Calendar */
if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
  "weekColumnHeader": ""
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
  "cancel": "Otkazati"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Otkazati"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "godina",
      "month": "mesec",
      "day": "den",
      "weekday": "dan u nedelji",
      "hour": "sati",
      "minute": "minuta",
      "second": "sekunde",
      "dayperiod": "AM/PM"
    });
}

})(window.kendo.jQuery);