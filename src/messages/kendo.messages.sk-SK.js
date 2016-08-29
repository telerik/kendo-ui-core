(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Použiť",
  "cancel": "Storno"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Použiť",
  "cancel": "Storno"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Usporiadať vzostupne",
  "sortDescending": "Usporiadať zostupne",
  "filter": "Filter",
  "columns": "Stĺpce",
  "done": "Hotovo",
  "settings": "Nastavenia stĺpca",
  "lock": "Zamknúť",
  "unlock": "Odomknúť"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Tučné",
  "italic": "Kurzíva",
  "underline": "Podčiarknuté",
  "strikethrough": "Preškrtnuté",
  "superscript": "Horný index",
  "subscript": "Dolný index",
  "justifyCenter": "Zarovnať na stred",
  "justifyLeft": "Zarovnať vľavo",
  "justifyRight": "Zarovnať vpravo",
  "justifyFull": "Zarovnať do bloku",
  "insertUnorderedList": "Vložiť odrážkový zoznam",
  "insertOrderedList": "Vložiť číslovaný zoznam",
  "indent": "Zväčšiť odsadenie",
  "outdent": "Zmenšiť odsadenie",
  "createLink": "Vložiť odkaz",
  "unlink": "Odstrániť odkaz",
  "insertImage": "Vložiť obrázok",
  "insertFile": "Vložiť súbor",
  "insertHtml": "Vložiť HTML",
  "viewHtml": "View HTML",
  "fontName": "Vyberte písmo",
  "fontNameInherit": "(predvolené písmo)",
  "fontSize": "Vyberte veľkosť písma",
  "fontSizeInherit": "(predvolená veľkosť)",
  "formatBlock": "Formát",
  "formatting": "Formátovanie",
  "foreColor": "Farba",
  "backColor": "Farba pozadia",
  "style": "Štýly",
  "emptyFolder": "Prázdny priečinok",
  "uploadFile": "Nahrať",
  "orderBy": "Usporiadať podľa:",
  "orderBySize": "Veľkosti",
  "orderByName": "Názvu",
  "invalidFileType": "Vybraný súbor \"{0}\" nie je podporovaný. Podporované súbory sú {1}.",
  "deleteFile": 'Naozaj chcete odstrániť "{0}"?',
  "overwriteFile": 'Súbor s názvom "{0}" už vo vybratom priečinku existuje. Chcete ho nahradiť?',
  "directoryNotFound": "Priečinok s týmto názvom sa nenašiel.",
  "imageWebAddress": "Odkaz",
  "imageAltText": "Alt. text",
  "imageWidth": "Šírka (px)",
  "imageHeight": "Výška (px)",
  "fileWebAddress": "Odkaz",
  "fileTitle": "Názov",
  "linkWebAddress": "Odkaz",
  "linkText": "Text",
  "linkToolTip": "Tip",
  "linkOpenInNewWindow": "Otvoriť odkaz v novom okne",
  "dialogUpdate": "Uložiť",
  "dialogInsert": "Vložiť",
  "dialogButtonSeparator": "alebo",
  "dialogCancel": "Storno",
  "createTable": "Vložiť tabuľku",
  "addColumnLeft": "Pridať stĺpec vľavo",
  "addColumnRight": "Pridať stĺpec vpravo",
  "addRowAbove": "Pridať riadok nad",
  "addRowBelow": "Pridať riadok pod",
  "deleteRow": "Odstrániť riadok",
  "deleteColumn": "Odstrániť stĺpec"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Odoslať",
  "orderBy": "Usporiadať podľa",
  "orderByName": "Názvu",
  "orderBySize": "Veľkosti",
  "directoryNotFound": "Priečinok s týmto názvom sa nenašiel.",
  "emptyFolder": "Prázdny priečinok",
  "deleteFile": 'Naozaj chcete odstrániť "{0}"?',
  "invalidFileType": "Vybraný súbor \"{0}\" nie je podporovaný. Podporované súbory sú {1}.",
  "overwriteFile": "Súbor s názvom \"{0}\" už vo vybratom priečinku existuje. Chcete ho nahradiť?",
  "dropFilesHere": "Potiahnite sem súbory, ktoré chcete odoslať",
  "search": "Hľadať"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "je pravda",
  "isFalse": "nie je pravda",
  "filter": "Filtrovať",
  "clear": "Vyčistiť",
  "operator": "Operátor"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Je",
    "neq": "Nie je",
    "startswith": "Začína s",
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "endswith": "Končí s",
    "isnull": "Je null",
    "isnotnull": "Nie je null",
    "isempty": "Je prázdne",
    "isnotempty": "Nie je prázdne"
  },
  "number": {
    "eq": "Rovná sa",
    "neq": "Nerovná sa",
    "gte": "Je väčšie alebo sa rovná",
    "gt": "Je väčšie ako",
    "lte": "Je menšie alebo sa rovná",
    "lt": "Je menšie ako",
    "isnull": "Je null",
    "isnotnull": "Nie je null"
  },
  "date": {
    "eq": "Je",
    "neq": "Nie je",
    "gte": "Nasleduje alebo je",
    "gt": "Nasleduje",
    "lte": "Predchádza alebo je",
    "lt": "Predchádza",
    "isnull": "Je null",
    "isnotnull": "Nie je null"
  },
  "enums": {
    "eq": "Je",
    "neq": "Nie je",
    "isnull": "Je null",
    "isnotnull": "Nie je null"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Zobraziť záznamy s hodnotou, ktorá:",
  "isTrue": "je pravda",
  "isFalse": "nie je pravda",
  "filter": "Filtrovať",
  "clear": "Vyčistiť",
  "and": "A zároveň",
  "or": "Alebo",
  "selectValue": "-Vyberte hodnotu-",
  "operator": "Operátor",
  "value": "Hodnota",
  "cancel": "Storno"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
      "eq": "Je",
      "neq": "Nie je",
      "startswith": "Začína s",
      "contains": "Obsahuje",
      "doesnotcontain": "Neobsahuje",
      "endswith": "Končí s",
      "isnull": "Je null",
      "isnotnull": "Nie je null",
      "isempty": "Je prázdne",
      "isnotempty": "Nie je prázdne"
  },
  "number": {
      "eq": "Rovná sa",
      "neq": "Nerovná sa",
      "gte": "Je väčšie alebo sa rovná",
      "gt": "Je väčšie ako",
      "lte": "Je menšie alebo sa rovná",
      "lt": "Je menšie ako",
      "isnull": "Je null",
      "isnotnull": "Nie je null"
  },
  "date": {
      "eq": "Je",
      "neq": "Nie je",
      "gte": "Nasleduje alebo je",
      "gt": "Nasleduje",
      "lte": "Predchádza alebo je",
      "lt": "Predchádza",
      "isnull": "Je null",
      "isnotnull": "Nie je null"
  },
  "enums": {
      "eq": "Je",
      "neq": "Nie je",
      "isnull": "Je null",
      "isnotnull": "Nie je null"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
    $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
        "checkAll": "Všetky",
        "clear": "Vyčistiť",
        "filter": "Filtrovať",
        "search": "Hľadať"
    });
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Pridať podúlohu",
    "append": "Pridať úlohu",
    "insertAfter": "Vložiť za",
    "insertBefore": "Vložiť pred",
    "pdf": "Exportovať do PDF"
  },
  "cancel": "Storno",
  "deleteDependencyWindowTitle": "Odstránenie závislosti",
  "deleteTaskWindowTitle": "Odstránenie úlohy",
  "destroy": "Odstrániť",
  "editor": {
    "assingButton": "Priradiť",
    "editorTitle": "Úloha",
    "end": "Koniec",
    "percentComplete": "Hotovo",
    "resources": "Zdroje",
    "resourcesEditorTitle": "Zdroje",
    "resourcesHeader": "Zdroje",
    "start": "Začiatok",
    "title": "Názov",
    "unitsHeader": "Jednotky"
  },
  "save": "Uložiť",
  "views": {
    "day": "Deň",
    "end": "Koniec",
    "month": "Mesiac",
    "start": "Začiatok",
    "week": "Týždeň",
    "year": "Rok"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Zahodiť zmeny",
    "canceledit": "Storno",
    "create": "Pridať nový záznam",
    "destroy": "Odstrániť",
    "edit": "Upraviť",
    "excel": "Exportovať do Excelu",
    "pdf": "Exportovať do PDF",
    "save": "Uložiť zmeny",
    "select": "Vybrať",
    "update": "Uložiť"
  },
  "editable": {
    "cancelDelete": "Storno",
    "confirmation": "Naozaj chcete odstrániť tento záznam?",
    "confirmDelete": "Odstrániť"
  },
  "noRecords": "Žiadne záznamy."
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
    "empty": "Potiahnite sem záhlavie stĺpca na zoskupenie podľa neho"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Zvýšiť hodnotu",
  "downArrowText": "Znížiť hodnotu"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Všetko",
  "display": "{0} - {1} z {2} záznamov",
  "empty": "Žiadny záznam na zobrazenie",
  "page": "Strana",
  "of": "z {0}",
  "itemsPerPage": "záznamov na stranu",
  "first": "Prejsť na prvú stranu",
  "previous": "Prejsť na predošlú stranu",
  "next": "Prejsť na ďalšiu stranu",
  "last": "Prejsť na poslednú stranu",
  "refresh": "Obnoviť",
  "morePages": "Ďalšie strany"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Potiahnite sem polia údajov",
  "columnFields": "Potiahnite sem polia stĺpcov",
  "rowFields": "Potiahnite sem polia riadkov"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Zobraziť záznamy s hodnotou, ktorá:",
  "filterFields": "Filter polí",
  "filter": "Filter",
  "include": "Zahrnúť polia...",
  "title": "Polia na zahrnutie",
  "clear": "Vyčistiť",
  "ok": "Ok",
  "cancel": "Storno",
  "operators": {
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "startswith": "Začína s",
    "endswith": "Končí s",
    "eq": "Rovná sa",
    "neq": "Nerovná sa"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nikdy",
    "hourly": "Každú hodinu",
    "daily": "Denne",
    "weekly": "Týždenne",
    "monthly": "Mesačne",
    "yearly": "Ročne"
  },
  "hourly": {
    "repeatEvery": "Opakovať každú: ",
    "interval": " hodinu(hodín)"
  },
  "daily": {
    "repeatEvery": "Opakovať každý: ",
    "interval": " deň(dní)"
  },
  "weekly": {
    "interval": " týždeň(týždňov)",
    "repeatEvery": "Opakovať každý: ",
    "repeatOn": "Opakovať: "
  },
  "monthly": {
    "repeatEvery": "Opakovať každý: ",
    "repeatOn": "Opakovať: ",
    "interval": " mesiac(mesiacov)",
    "day": "Deň "
  },
  "yearly": {
    "repeatEvery": "Opakovať každý: ",
    "repeatOn": "Opakovať: ",
    "interval": " rok(rokov)",
    "of": " z "
  },
  "end": {
    "label": "Koniec:",
    "mobileLabel": "Ukončiť",
    "never": "Nikdy",
    "after": "Po ",
    "occurrence": " opakovaní(-iach)",
    "on": "On "
  },
  "offsetPositions": {
    "first": "prvý",
    "second": "druhý",
    "third": "tretí",
    "fourth": "štvrtý",
    "last": "posledný"
  },
  "weekdays": {
    "day": "deň",
    "weekday": "pracovný deň",
    "weekend": "víkend"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "celý deň",
  "date": "Dátum",
  "event": "Udalosť",
  "time": "Čas",
  "showFullDay": "Zobraziť celý deň",
  "showWorkDay": "Zobraziť pracovný čas",
  "today": "Dnes",
  "save": "Uložiť",
  "cancel": "Storno",
  "destroy": "Odstrániť",
  "deleteWindowTitle": "Odstránenie udalosti",
  "ariaSlotLabel": "Vybraté od {0:t} do {1:t}",
  "ariaEventLabel": "{0} dňa {1:D} o {2:t}",
  "editable": {
    "confirmation": "Naozaj chcete odstrániť túto udalosť?"
  },
  "views": {
    "day": "Deň",
    "week": "Týždeň",
    "workWeek": "Pracovný týždeň",
    "agenda": "Agenda",
    "month": "Mesiac"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Odstránenie opakovanej udalosti",
    "deleteWindowOccurrence": "Odstrániť aktuálnu udalosť",
    "deleteWindowSeries": "Odstrániť všetko",
    "editWindowTitle": "Úprava opakovanej udalosti",
    "editWindowOccurrence": "Upraviť aktuálnu udalosť",
    "editWindowSeries": "Upraviť všetko",
    "deleteRecurring": "Chcete odstrániť len túto udalosť alebo aj všetky jej opakovania?",
    "editRecurring": "Chcete upraviť len túto udalosť alebo aj všetky jej opakovania?"
  },
  "editor": {
    "title": "Názov",
    "start": "Začiatok",
    "end": "Koniec",
    "allDayEvent": "Celodenný",
    "description": "Popis",
    "repeat": "Opakovať",
    "timezone": " ",
    "startTimezone": "Časové pásmo začiatku",
    "endTimezone": "Časové pásmo konca",
    "separateTimezones": "Rôzne časové pásma pre začiatok a koniec",
    "timezoneEditorTitle": "Časové pásma",
    "timezoneEditorButton": "Časové pásmo",
    "timezoneTitle": "Časové pásma",
    "noTimezone": "Bez časového pásma",
    "editorTitle": "Udalosť"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette, {
    "allBorders": "Všetky orámovania",
    "insideBorders": "Vnútorné orámovania",
    "insideHorizontalBorders": "Vnútorné vodorovné orámovania",
    "insideVerticalBorders": "Vnútorné zvislé orámovania",
    "outsideBorders": "Vonkajšie orámovania",
    "leftBorder": "Ľavé orámovanie",
    "topBorder": "Horné orámovanie",
    "rightBorder": "Pravé orámovanie",
    "bottomBorder": "Dolné orámovanie",
    "noBorders": "Bez orámovania",
    "reset": "Nulovať farbu",
    "customColor": "Vlastná farba...",
    "apply": "Použiť",
    "cancel": "Storno"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs, {
    "apply": "Použiť",
    "save": "Uložiť",
    "cancel": "Storno",
    "remove": "Odstrániť",
    "okText": "OK",
    "formatCellsDialog": {
        "title": "Formátovanie",
        "categories": {
            "number": "Číslo",
            "currency": "Mena",
            "date": "Dátum"
        }
    },
    "fontFamilyDialog": {
        "title": "Písmo"
    },
    "fontSizeDialog": {
        "title": "Veľkosť písma"
    },
    "bordersDialog": {
        "title": "Orámovania"
    },
    "alignmentDialog": {
        "title": "Zarovnanie",
        "buttons": {
            "justtifyLeft": "Zarovnať vľavo",
            "justifyCenter": "Centrovať",
            "justifyRight": "Zarovnať vpravo",
            "justifyFull": "Zarovnať do bloku",
            "alignTop": "Zarovnať nahor",
            "alignMiddle": "Zarovnať na stred",
            "alignBottom": "Zarovnať nadol"
        }
    },
    "mergeDialog": {
        "title": "Spájanie buniek",
        "buttons": {
            "mergeCells": "Spojiť všetko",
            "mergeHorizontally": "Spojiť vodorovne",
            "mergeVertically": "Spojiť zvisle",
            "unmerge": "Rozpojiť"
        }
    },
    "freezeDialog": {
        "title": "Zmrazenie panelov",
        "buttons": {
            "freezePanes": "Zmraziť panely",
            "freezeRows": "Zmraziť riadky",
            "freezeColumns": "Zmraziť stĺpce",
            "unfreeze": "Rozmraziť panely"
        }
    },
    "validationDialog": {
        "title": "Overenie údajom",
        "hintMessage": "Prosím zadajte platnú {0} hodnotu {1}.",
        "hintTitle": "Overenie {0}",
        "criteria": {
            "any": "Akákoľvek hodnota",
            "number": "Číslo",
            "text": "Text",
            "date": "Dátum",
            "custom": "Vlastný vzorec",
            "list": "Zoznam"
        },
        "comparers": {
            "greaterThan": "väčšie ako",
            "lessThan": "menšie ako",
            "between": "medzi",
            "notBetween": "nie medzi",
            "equalTo": "rovná sa",
            "notEqualTo": "nerovná sa",
            "greaterThanOrEqualTo": "väčšie alebo sa rovná",
            "lessThanOrEqualTo": "menšie alebo sa rovná"
        },
        "comparerMessages": {
            "greaterThan": "väčšie ako {0}",
            "lessThan": "menšie ako {0}",
            "between": "medzi {0} a {1}",
            "notBetween": "nie medzi {0} a {1}",
            "equalTo": "rovná sa {0}",
            "notEqualTo": "nerovná sa {0}",
            "greaterThanOrEqualTo": "väčšie alebo rovná sa {0}",
            "lessThanOrEqualTo": "menšie alebo rovná sa {0}",
            "custom": "ktoré vyhovuje: {0}"
        },
        "labels": {
            "criteria": "Kritériá",
            "comparer": "Porovnávač",
            "min": "Min",
            "max": "Max",
            "value": "Hodnota",
            "start": "Začiatok",
            "end": "Koniec",
            "onInvalidData": "Pri platných údajoch",
            "rejectInput": "Odmietnuť vstup",
            "showWarning": "Zobraziť varovanie",
            "showHint": "Zobraziť pomôcku",
            "hintTitle": "Titulok pomôcky",
            "hintMessage": "Správa pomôcky",
            "ignoreBlank": "Ignorovať prázdne"
        },
        "placeholders": {
            "typeTitle": "Titulok typu",
            "typeMessage": "Správa typu"
        }
    },
    "saveAsDialog": {
        "title": "Uložiť Ako...",
        "labels": {
            "fileName": "Meno súboru",
            "saveAsType": "Uložiť ako typ"
        }
    },
    "exportAsDialog": {
        "title": "Exportovať...",
        "labels": {
            "fileName": "Meno súboru",
            "saveAsType": "Uložiť ako typ",
            "exportArea": "Exportovať",
            "paperSize": "Veľkosť papiera",
            "margins": "Okraje",
            "orientation": "Orientácia",
            "print": "Tlačiť",
            "guidelines": "Pomocné čiary",
            "center": "Centrovať",
            "horizontally": "Vodorovne",
            "vertically": "Zvisle"
        }
    },
    "modifyMergedDialog": {
        "errorMessage": "Nemožno zmeniť časť spojenej bunky."
    },
    "useKeyboardDialog": {
        "title": "Kopírovanie a vkladanie",
        "errorMessage": "Tieto akcie sa nemožno ovládať cez menu. Prosím, použite klávesové skratky namiesto:",
        "labels": {
            "forCopy": "na kopírovanie",
            "forCut": "na vystrihnutie",
            "forPaste": "na vloženie"
        }
    },
    "unsupportedSelectionDialog": {
        "errorMessage": "Táto akcia nemôže byť vykonaná na viacnásobnom výbere."
    }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu, {
    "sortAscending": "Usporiadať výber od A do Z",
    "sortDescending": "Usporiadať výber od Z do A",
    "filterByValue": "Filtrovať podľa hodnoty",
    "filterByCondition": "Filtrovať podľa podmienky",
    "apply": "Použiť",
    "search": "Hľadať",
    "addToCurrent": "Pridať do aktuálneho výberu",
    "clear": "Vyčistiť",
    "blanks": "(Prázdne)",
    "operatorNone": "Žiadne",
    "and": "A",
    "or": "ALEBO",
    "operators": {
        "string": {
            "contains": "Text obsahuje",
            "doesnotcontain": "Text neobsahuje",
            "startswith": "Text začína s",
            "endswith": "Text končí s"
        },
        "date": {
            "eq": "Dátum je",
            "neq": "Dátum nie je",
            "lt": "Dátum je pred",
            "gt": "Dátum je po"
        },
        "number": {
            "eq": "Rovná sa",
            "neq": "Nerovná sa",
            "gte": "Je väčšie alebo rovná sa",
            "gt": "Je väčšie ako",
            "lte": "Je menšie alebo rovná sa",
            "lt": "Je menšie ako"
        }
    }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar, {
    "addColumnLeft": "Pridať stĺpec vľavo",
    "addColumnRight": "Pridať stĺpec vpravo",
    "addRowAbove": "Pridať riadok nad",
    "addRowBelow": "Pridať riadok pod",
    "alignment": "Zarovnanie",
    "alignmentButtons": {
        "justtifyLeft": "Zarovnať vľavo",
        "justifyCenter": "Centrovať",
        "justifyRight": "Zarovnať vpravo",
        "justifyFull": "Zarovnať do bloku",
        "alignTop": "Zarovnať nahor",
        "alignMiddle": "Zarovnať na stred",
        "alignBottom": "Zarovnať nadol"
    },
    "backgroundColor": "Pozadie",
    "bold": "Tučné",
    "borders": "Orámovania",
    "colorPicker": {
        "reset": "Nulovať farbu",
        "customColor": "Vlastná farba..."
    },
    "copy": "Kopírovať",
    "cut": "Vystrihnúť",
    "deleteColumn": "Odstrániť stĺpec",
    "deleteRow": "Odstrániť riadok",
    "excelImport": "Importovať z Excelu...",
    "filter": "Filtrovať",
    "fontFamily": "Písmo",
    "fontSize": "Veľkosť písma",
    "format": "Vlastný formát...",
    "formatTypes": {
        "automatic": "Automatický",
        "number": "Číslo",
        "percent": "Percentá",
        "financial": "Finančný",
        "currency": "Mena",
        "date": "Dátum",
        "time": "Čas",
        "dateTime": "Dátum a čas",
        "duration": "Časový úsek",
        "moreFormats": "Viac formátov..."
    },
    "formatDecreaseDecimal": "Znížiť destinné miesta",
    "formatIncreaseDecimal": "Zvýšiť desatinné miesta",
    "freeze": "Zmraziť panely",
    "freezeButtons": {
        "freezePanes": "Zmraziť panely",
        "freezeRows": "Zmraziť riadky",
        "freezeColumns": "Zmraziť stĺpce",
        "unfreeze": "Rozmraziť panely"
    },
    "italic": "Šikmé",
    "merge": "Spojiť bunky",
    "mergeButtons": {
        "mergeCells": "Spojiť všetko",
        "mergeHorizontally": "Spojiť vodorovne",
        "mergeVertically": "Spojiť zvisle",
        "unmerge": "Rozpojiž"
    },
    "open": "Otvoriť...",
    "paste": "Vložiť",
    "quickAccess": {
        "redo": "Znova",
        "undo": "Späť"
    },
    "saveAs": "Uložiť Ako...",
    "sortAsc": "Usporiadať vzostupne",
    "sortDesc": "Usporiadať zostupne",
    "sortButtons": {
        "sortSheetAsc": "Usporiadať list od A do Z",
        "sortSheetDesc": "Usporiadať list od Z do A",
        "sortRangeAsc": "Usporiadať výber od A do Z",
        "sortRangeDesc": "Usporiadať výber od o Z do A"
    },
    "textColor": "Farba Textu",
    "textWrap": "Zalomiť text",
    "underline": "Podčiarknuté",
    "validation": "Overenie údajov..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view, {
    "errors": {
        "shiftingNonblankCells": "Nemožno vložiť bunky kvôli možnosti straty dát. Vyberte iné miesto na vloženie alebo odstráňte údaje z konca listu.",
        "filterRangeContainingMerges": "Nemožno vytvoriť filter na výbere, ktoré obsahuje spájania",
        "validationError": "Hodnota, ktorú ste zadali porušuje pravidlá platnosti stanovené pre bunku."
    },
    "tabs": {
        "home": "Domov",
        "insert": "Vložiť",
        "data": "Údaje"
    }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Zvýšiť",
  "decreaseButtonTitle": "Znížiť"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages, {
    "noRows": "Žiadne záznamy na zobrazenie",
    "loading": "Nahrávanie...",
    "requestFailed": "Požiadavka zlyhala.",
    "retry": "Znova",
    "commands": {
        "edit": "Upraviť",
        "update": "Uložiť",
        "canceledit": "Storno",
        "create": "Pridať nový záznam",
        "createchild": "Pridať podzáznam",
        "destroy": "Odstrániť",
        "excel": "Exportovať do Excelu",
        "pdf": "Exportovať do PDF"
    }
});
}

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.columnMenu =
$.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
    "messages": {
        "columns": "Zvoľte stĺpce",
        "filter": "Použiť filter",
        "sortAscending": "Usporiadať vzostupne",
        "sortDescending": "Usporiadať zostupne"
    }
});
}


/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Nahrávanie...",
  "requestFailed": "Požiadavka zlyhala.",
  "retry": "Znova"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Vyberte súbory...",
  "cancel": "Storno",
  "retry": "Znova",
  "remove": "Odstrániť",
  "uploadSelectedFiles": "Odoslať súbory",
  "dropFilesHere": "potiahnite sem súbory, ktoré chcete odoslať",
  "statusUploading": "odosielanie",
  "statusUploaded": "hotovo",
  "statusWarning": "varovanie",
  "statusFailed": "zlyhanie",
  "headerStatusUploading": "Odosielanie...",
  "headerStatusUploaded": "Hotovo"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} je požadovaný údaj",
  "pattern": "{0} nie je platný údaj",
  "min": "{0} musí byť aspoň {1}",
  "max": "{0} môže byť najviac {1}",
  "step": "{0} nie je platný údaj",
  "email": "{0} nie je platný email",
  "url": "{0} nie je platná adresa URL",
  "date": "{0} nie je platný dátum",
  "dateCompare": "Koncový dátum musí byť väčší alebo rovný ako počiatočný"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Zavrieť"
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
  "cancel": "Storno"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Storno"
});
}

})(window.kendo.jQuery);
