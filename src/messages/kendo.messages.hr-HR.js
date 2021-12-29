(function ($, undefined) {

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
      "justtifyLeft": "Poravnajte lijevo",
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
    "justtifyLeft": "Poravnajte lijevo",
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
