(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Potvrdit",
  "cancel": "Zrušit",
  "noColor": "bez barvy",
  "clearColor": "Smazat barvu"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Potvrdit",
  "cancel": "Zrušit",
  "noColor": "bez barvy",
  "clearColor": "Smazat barvu"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Třídit vzestupně",
  "sortDescending": "Třídit sestupně",
  "filter": "Filtr",
  "columns": "Sloupce",
  "done": "Hotovo",
  "settings": "Nastavení sloupců",
  "lock": "Zamknout",
  "unlock": "Odemknout"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Tučně",
  "italic": "Kurzíva",
  "underline": "Podtržené",
  "strikethrough": "Přeškrtnuté",
  "superscript": "Horní index",
  "subscript": "Dolní index",
  "justifyCenter": "Zarovnat na střed",
  "justifyLeft": "Zarovnat vlevo",
  "justifyRight": "Zarovnat vpravo",
  "justifyFull": "Zarovnat do bloku",
  "insertUnorderedList": "Vložit odrážkový seznam",
  "insertOrderedList": "Vložit číslovaný seznam",
  "indent": "Zvětšit odsazení",
  "outdent": "Zmenšit odsazení",
  "createLink": "Vložit odkaz",
  "unlink": "Zrušit odkaz",
  "insertImage": "Vložit obrázek",
  "insertFile": "Vložit soubor",
  "insertHtml": "Vložit HTML",
  "viewHtml": "Zobrazit HTML",
  "fontName": "Vyberte písmo",
  "fontNameInherit": "(výchozí písmo)",
  "fontSize": "Vyberte velikost písma",
  "fontSizeInherit": "(výchozí velikost)",
  "formatBlock": "Formát",
  "formatting": "Formátování",
  "foreColor": "Barva",
  "backColor": "Barva pozadí",
  "style": "Styly",
  "emptyFolder": "Prázný adresář",
  "uploadFile": "Nahrát",
  "overflowAnchor": "Další nástroje",
  "orderBy": "Seřadit dle:",
  "orderBySize": "Velikosti",
  "orderByName": "Jména",
  "invalidFileType": "Vybraný soubor s příponou \"{0}\" není podporovaný. Podporované soubory jsou {1}.",
  "deleteFile": "Opravdu chcete smazat \"{0}\"?",
  "overwriteFile": "'Soubor s názvem \"{0}\" již ve vybraném adresáři existuje. Přejete si jej přepsat?",
  "directoryNotFound": "Adresář zadaného názvu nebyl nalezen.",
  "imageWebAddress": "Odkaz",
  "imageAltText": "Alternativní text",
  "imageWidth": "Šířka (px)",
  "imageHeight": "Výška (px)",
  "fileWebAddress": "Web adresa",
  "fileTitle": "Název",
  "linkWebAddress": "Odkaz",
  "linkText": "Text",
  "linkToolTip": "Text po najetí",
  "linkOpenInNewWindow": "Otevřít odkaz v novém okně",
  "dialogUpdate": "Aktualizovat",
  "dialogInsert": "Vložit",
  "dialogButtonSeparator": "nebo",
  "dialogCancel": "Zrušit",
  "cleanFormatting": "Vymazat formátování",
  "createTable": "Vložit tabulku",
  "addColumnLeft": "Přidat sloupec vlevo",
  "addColumnRight": "Přidat sloupec vpravo",
  "addRowAbove": "Přidat řádek nad",
  "addRowBelow": "Přidat řádek pod",
  "deleteRow": "Smazat řádek",
  "deleteColumn": "Smazat soupec",
  "dialogOk": "Ok",
  "tableWizard": "Průvodce tabulkou",
  "tableTab": "Tabulka",
  "cellTab": "Buňka",
  "accessibilityTab": "Usnadnění",
  "caption": "Titulek",
  "summary": "Souhrn",
  "width": "Šířka",
  "height": "Výška",
  "units": "Jednotky",
  "cellSpacing": "Mezery mezi buňkami",
  "cellPadding": "Odsazení obsahu buněk",
  "cellMargin": "Okraje buňky",
  "alignment": "Zarovnání",
  "background": "Pozadí",
  "cssClass": "CSS třída",
  "id": "ID",
  "border": "Ohraničení",
  "borderStyle": "Styl ohraničení",
  "collapseBorders": "Sbalit ohraničení",
  "wrapText": "Zalamovat text",
  "associateCellsWithHeaders": "Přidružit bunky k záhlaví",
  "alignLeft": "Zarovnat doleva",
  "alignCenter": "Zarovnat na střed",
  "alignRight": "Zarovnat doprava",
  "alignLeftTop": "Zarovnat doleva nahoru",
  "alignCenterTop": "Zarovnat nahoru na střed",
  "alignRightTop": "Zarovnat nahoru doprava",
  "alignLeftMiddle": "Zarovnat doleva na střed",
  "alignCenterMiddle": "Zarovnat na střed",
  "alignRightMiddle": "Zarovnat doprava na střed",
  "alignLeftBottom": "Zarovnat doleva dolů",
  "alignCenterBottom": "Zarovnat dolů na střed",
  "alignRightBottom": "Zarovnat dolů doprava",
  "alignRemove": "Odstranit zarovnání",
  "columns": "Sloupce",
  "rows": "Řádky",
  "selectAllCells": "Vybrat všechny buňky"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Nahrát",
  "orderBy": "Seřadit podle",
  "orderByName": "Název",
  "orderBySize": "Velikost",
  "directoryNotFound": "Adresář s tímto názvem nebyl nalezen.",
  "emptyFolder": "Prázdná složka",
  "deleteFile": 'Jste si jistí, že chcete smazat "{0}"?',
  "invalidFileType": "Soubor \"{0}\" není platný. Použitelné typy souborů {1}.",
  "overwriteFile": "Soubor \"{0}\" již v aktuálním adresáři existuje. Přejete si jej přepsat?",
  "dropFilesHere": "přetáhněte soubory pro nahrání",
  "search": "Hledat"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "je pravda",
  "isFalse": "není pravda",
  "filter": "Filtrovat",
  "clear": "Zrušit",
  "operator": "Operátor"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Je shodná s",
    "neq": "Je různá od",
    "startswith": "Začíná na",
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "endswith": "Končí na",
    "isnull": "Je null",
    "isnotnull": "Není null",
    "isempty": "Je prázdná",
    "isnotempty": "Není prázdná",
    "isnullorempty": "Nemá hodnotu",
    "isnotnullorempty": "Má hodnotu"
  },
  "number": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "gte": "Je větší nebo rovno",
    "gt": "Je větší než",
    "lte": "Je menší nebo rovno",
    "lt": "Je menší než",
    "isnull": "Je null",
    "isnotnull": "Není null"
  },
  "date": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "gte": "Začíná od",
    "gt": "Začíná po",
    "lte": "Končí do",
    "lt": "Končí po",
    "isnull": "Je null",
    "isnotnull": "Není null"
  },
  "enums": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "isnull": "Je null",
    "isnotnull": "Není null"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Zobrazit položky s hodnotou, která:",
  "title": "Zobrazit položky s hodnotou, která",
  "isTrue": "je pravda",
  "isFalse": "není pravda",
  "filter": "Filtrovat",
  "clear": "Zrušit",
  "and": "A zároveň",
  "or": "Nebo",
  "selectValue": "-Vyberte hodnotu-",
  "operator": "Operátor",
  "value": "Hodnota",
  "cancel": "Zrušit"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Je shodná s",
    "neq": "Je různá od",
    "startswith": "Začíná na",
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "endswith": "Končí na",
    "isnull": "Je null",
    "isnotnull": "Není null",
    "isempty": "Je prázdná",
    "isnotempty": "Není prázdná",
    "isnullorempty": "Nemá hodnotu",
    "isnotnullorempty": "Má hodnotu"
  },
  "number": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "gte": "Je větší nebo rovno",
    "gt": "Je větší než",
    "lte": "Je menší nebo rovno",
    "lt": "Je menší než",
    "isnull": "Je null",
    "isnotnull": "Není null"
  },
  "date": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "gte": "Začíná od",
    "gt": "Začíná po",
    "lte": "Končí do",
    "lt": "Končí po",
    "isnull": "Je null",
    "isnotnull": "Není null"
  },
  "enums": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "isnull": "Je null",
    "isnotnull": "Není null"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Zvolit vše",
  "clear": "Vymazat",
  "filter": "Filtr",
  "search": "Hledat"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Přidat potomka",
    "append": "Přidat úkol",
    "insertAfter": "Přidat pod",
    "insertBefore": "Přidat nad",
    "pdf": "Export do PDF"
  },
  "cancel": "Zrušit",
  "deleteDependencyWindowTitle": "Smazat závislost",
  "deleteTaskWindowTitle": "Smazat úkol",
  "destroy": "Smazat",
  "editor": {
    "assingButton": "Přiřadit",
    "editorTitle": "Úkol",
    "end": "Konec",
    "percentComplete": "Hotovo",
    "resources": "Zdroje",
    "resourcesEditorTitle": "Zdroje",
    "resourcesHeader": "Zdroje",
    "start": "Začátek",
    "title": "Název",
    "unitsHeader": "Jednotky"
  },
  "save": "Uložit",
  "views": {
    "day": "Den",
    "end": "Konec",
    "month": "Měsíc",
    "start": "Začátek",
    "week": "Týden",
    "year": "Rok"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Zrušit",
    "canceledit": "Zrušit",
    "create": "Přidat nový záznam",
    "destroy": "Smazat",
    "edit": "Upravit",
    "excel": "Excel export",
    "pdf": "PDF export",
    "save": "Uložit změny",
    "select": "Vybrat",
    "update": "Uložit"
  },
  "editable": {
    "cancelDelete": "Zrušit",
    "confirmation": "Opravdu chcete smazat tento záznam?",
    "confirmDelete": "Smazat"
  },
  "noRecords": "Žádný záznam nenalezen.",
  "expandCollapseColumnHeader": ""
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Žádné záznamy k zobrazení",
    "loading": "Načítám...",
    "requestFailed": "Požadavek selhal.",
    "retry": "Zkusit znovu",
    "commands": {
        "edit": "Upravit",
        "update": "Aktualizovat",
        "canceledit": "Zrušit",
        "create": "Přidat nový záznam",
        "createchild": "Přidat nový záznam",
        "destroy": "Smazat",
        "excel": "Excel export",
        "pdf": "PDF export"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Přetáhněte sem záhlaví sloupce pro seskupení dle vybraného sloupce."
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Zvětšit",
  "downArrowText": "Zmenšit"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pauza",
  "play": "Přehrát",
  "mute": "Ztlumit",
  "unmute": "Zrušit ztlumení",
  "quality": "Kvalita",
  "fullscreen": "Na celou obrazovku"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} z {2} celkem",
  "empty": "Žádný záznam nenalezen",
  "page": "Strana",
  "of": "z {0}",
  "itemsPerPage": "záznamů na stránku",
  "first": "Na první stránku",
  "previous": "Na předchozí stránku",
  "next": "Na další stránku",
  "last": "Na poslední stránku",
  "refresh": "Obnovit",
  "morePages": "Další stránky"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Sem přetáhněte pole",
  "columnFields": "Sem přetáhněte sloupce",
  "rowFields": "Sem přetáhněte řádky"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Zobrazit položky s hodnotou:",
  "filterFields": "Filtr",
  "filter": "Filtr",
  "include": "Zahrnout pole...",
  "title": "Pole k zahrnutí",
  "clear": "Vyčistit",
  "ok": "Ok",
  "cancel": "Zrušit",
  "operators": {
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "startswith": "Začína na",
    "endswith": "Končí na",
    "eq": "Je rovno",
    "neq": "Není rovno"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nikdy",
    "hourly": "Každou hodinu",
    "daily": "Denně",
    "weekly": "Týdně",
    "monthly": "Měsíčně",
    "yearly": "Ročně"
  },
  "hourly": {
    "repeatEvery": "Opakovat každých: ",
    "interval": " hodin"
  },
  "daily": {
    "repeatEvery": "Opakovat každý:",
    "interval": "dní"
  },
  "weekly": {
    "interval": "týden(ny)",
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:"
  },
  "monthly": {
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "měsíc(e)",
    "day": "Den"
  },
  "yearly": {
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "rok(y)",
    "of": " z "
  },
  "end": {
    "label": "Konec:",
    "mobileLabel": "Končí",
    "never": "Nikdy",
    "after": "Konec po",
    "occurrence": "opakování",
    "on": "Dne"
  },
  "offsetPositions": {
    "first": "první",
    "second": "druhý",
    "third": "třetí",
    "fourth": "čtvrtý",
    "last": "poslední"
  },

  "weekdays": {
    "day": "den",
    "weekday": "pracovní den",
    "weekend": "víkend"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "celý den",
  "date": "Datum",
  "event": "Událost",
  "time": "Čas",
  "showFullDay": "Zobrazit celý den",
  "showWorkDay": "Zobrazit pracovní dobu",
  "today": "Dnes",
  "save": "Uložit",
  "cancel": "Zrušit",
  "destroy": "Smazat",
  "deleteWindowTitle": "Smazat událost",
  "ariaSlotLabel": "Zvoleno od {0:t} do {1:t}",
  "ariaEventLabel": "{0} dne {1:D} v {2:t}",
  "editable": {
    "confirmation": "Opravdu chcete smazat tuto událost?"
  },
  "views": {
    "day": "Den",
    "week": "Týden",
    "workWeek": "Pracovní týden",
    "agenda": "Agenda",
    "month": "Měsíc"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Smazat opakovanou událost",
    "deleteWindowOccurrence": "Smazat vybranou událost",
    "deleteWindowSeries": "Smazat vše",
    "editWindowTitle": "Upravit opakující se událost",
    "editWindowOccurrence": "Upravit jen vybranou událost",
    "editWindowSeries": "Upravit vše",
    "deleteRecurring": "Chcete smazat jen vybranou událost, nebo i všechna opakování?",
    "editRecurring": "Chcete upravit jen vybranou událost, nebo i všechna opakování?"
  },
  "editor": {
    "title": "Nadpis",
    "start": "Začátek",
    "end": "Konec",
    "allDayEvent": "Celodenní",
    "description": "Popis",
    "repeat": "Opakování",
    "timezone": " ",
    "startTimezone": "Časové pásmo začátku",
    "endTimezone": "Časové pásmo konce",
    "separateTimezones": "Různá časové pásma pro začátek a konec",
    "timezoneEditorTitle": "Časová pásma",
    "timezoneEditorButton": "Časové pásmo",
    "timezoneTitle": "Časová pásma",
    "noTimezone": "Žádné časová pásmo",
    "editorTitle": "Událost"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Všechno ohraničení",
  "insideBorders": "Vnitřní ohraničení",
  "insideHorizontalBorders": "Vnitřní vodorovné ohraničení",
  "insideVerticalBorders": "Vnitřní svislé ohraničení",
  "outsideBorders": "Vnější ohraničení",
  "leftBorder": "Levé ohraničení",
  "topBorder": "Horní ohraničení",
  "rightBorder": "Pravé ohraničení",
  "bottomBorder": "Dolní ohraničení",
  "noBorders": "Bez ohraničení",
  "reset": "Obnovit barvu",
  "customColor": "Vlastní barva...",
  "apply": "Potvrdit",
  "cancel": "Zrušit"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Potvrdit",
  "save": "Uložit",
  "cancel": "Zrušit",
  "remove": "Odstranit",
  "retry": "Opakovat",
  "revert": "Původní",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formát",
    "categories": {
      "number": "Číslo",
      "currency": "Měna",
      "date": "Datum"
      }
  },
  "fontFamilyDialog": {
    "title": "Písmo"
  },
  "fontSizeDialog": {
    "title": "Velikost písma"
  },
  "bordersDialog": {
    "title": "Ohraničení"
  },
  "alignmentDialog": {
    "title": "Zarovnání",
    "buttons": {
     "justtifyLeft": "Zarovnat doleva",
     "justifyCenter": "Zarovnat na střed",
     "justifyRight": "Zarovnat doprava",
     "justifyFull": "Do bloku",
     "alignTop": "Zarovnat nahoru",
     "alignMiddle": "Zarovnat doprostřed",
     "alignBottom": "Zarovnat dolů"
    }
  },
  "mergeDialog": {
    "title": "Sloučit buňky",
    "buttons": {
      "mergeCells": "Sloučit vše",
      "mergeHorizontally": "Sloučit vodorovně",
      "mergeVertically": "Sloučit svisle",
      "unmerge": "Oddělit"
    }
  },
  "freezeDialog": {
    "title": "Ukotvit příčky",
    "buttons": {
      "freezePanes": "Ukotvit příčky",
      "freezeRows": "Ukotvit řádky",
      "freezeColumns": "Ukotvit sloupce",
      "unfreeze": "Uvolnit příčky"
    }
  },
  "confirmationDialog": {
    "text": "Opravdu chcete odstranit tento list?",
    "title": "Odstranit list"
  },
  "validationDialog": {
    "title": "Validace dat",
    "hintMessage": "Prosím vložte platnou {0} hodnotu {1}.",
    "hintTitle": "Validace {0}",
    "criteria": {
      "any": "Jakákoliv hodnota",
      "number": "Číslo",
      "text": "Text",
      "date": "Datum",
      "custom": "Vlastní podmínka",
      "list": "List"
    },
    "comparers": {
      "greaterThan": "větší než",
      "lessThan": "menší než",
      "between": "mezi",
      "notBetween": "není mezi",
      "equalTo": "je shodná s",
      "notEqualTo": "není shodná s",
      "greaterThanOrEqualTo": "větší než nebo rovno",
      "lessThanOrEqualTo": "menší než nebo rovno"
    },
    "comparerMessages": {
      "greaterThan": "větší než {0}",
      "lessThan": "menší než {0}",
      "between": "mezi {0} a {1}",
      "notBetween": "není mezi {0} a {1}",
      "equalTo": "rovno {0}",
      "notEqualTo": "není rovno {0}",
      "greaterThanOrEqualTo": "vetší než nebo rovno {0}",
      "lessThanOrEqualTo": "menší než nebo rovno {0}",
      "custom": "vyhovuje podmínce: {0}"
    },
    "labels": {
      "criteria": "Podmínky",
      "comparer": "Typ porovnání",
      "min": "Min",
      "max": "Max",
      "value": "Hodnota",
      "start": "Začátek",
      "end": "Konec",
      "onInvalidData": "Neplatná data",
      "rejectInput": "Zamítnout vstup",
      "showWarning": "Zobrazit varování",
      "showHint": "Zobrazit nápovědu",
      "hintTitle": "Titulek nápovědy",
      "hintMessage": "Zpráva nápovědy",
      "ignoreBlank": "Ignorovat prázdné hodnoty"
    },
    "placeholders": {
      "typeTitle": "Vložte titulek",
      "typeMessage": "Vložte zprávu"
    }
  },
  "saveAsDialog": {
    "title": "Uložit jako...",
    "labels": {
      "fileName": "Jméno souboru",
      "saveAsType": "Uložit jako typ"
    }
  },
  "exportAsDialog": {
    "title": "Export...",
    "labels": {
      "fileName": "Jméno souboru",
      "saveAsType": "Uložit jako typ",
      "exportArea": "Export",
      "paperSize": "Velikost papíru",
      "margins": "Okraje",
      "orientation": "Orientace",
      "print": "Tisk",
      "guidelines": "Vodítka",
      "center": "Na střed",
      "horizontally": "Vodorovně",
      "vertically": "Svisle"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nelze změnit část sloučené buňky."
  },
  "useKeyboardDialog": {
    "title": "Kopírování a vkládání",
    "errorMessage": "Tyto akce nelze vyvolat z menu. Prosím, použijte klávesovou zkratku:",
    "labels": {
      "forCopy": "pro zkopírování",
      "forCut": "pro vyjmutí",
      "forPaste": "pro vložení"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Tuto akci nelze použít na vícenásobný výběr."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Seřadit rozsah od A k Z",
  "sortDescending": "Seřadit rozsah od Z k A",
  "filterByValue": "Filtrovat dle hodnoty",
  "filterByCondition": "Filtrovat dle podmínky",
  "apply": "Použít",
  "search": "Hledat",
  "addToCurrent": "Přidat k současnému výběru",
  "clear": "Smazat",
  "blanks": "(Prázdné)",
  "operatorNone": "Není",
  "and": "AND",
  "or": "OR",
  "operators": {
    "string": {
      "contains": "Text obsahuje",
      "doesnotcontain": "Text neobsahuje",
      "startswith": "Text začíná na",
      "endswith": "Text končí na"
    },
    "date": {
      "eq":  "Datum je",
      "neq": "Datum není",
      "lt":  "Datum je před",
      "gt":  "Datum je po"
    },
    "number": {
      "eq": "Je rovno",
      "neq": "Není rovno",
      "gte": "Je větší než nebo rovno",
      "gt": "Je větší než",
      "lte": "Je menší než nebo rovno",
      "lt": "Je menší než"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Vložit sloupec vlevo",
  "addColumnRight": "Vložit sloupec vpravo",
  "addRowAbove": "Vložit řádek nad",
  "addRowBelow": "Vložit řádek pod",
  "alignment": "Zarovnání",
  "alignmentButtons": {
    "justtifyLeft": "Zarovnat doleva",
    "justifyCenter": "Zarovnat na střed",
    "justifyRight": "Zarovnat doprava",
    "justifyFull": "Zarovnat do bloku",
    "alignTop": "Zarovnat nahoru",
    "alignMiddle": "Zarovnat doprostřed",
    "alignBottom": "Zarovnat dolů"
  },
  "backgroundColor": "Pozadí",
  "bold": "Tučně",
  "borders": "Ohraničení",
  "colorPicker": {
    "reset": "Obnovit barvu",
    "customColor": "Vlastní barva..."
  },
  "copy": "Kopírovat",
  "cut": "Vyjmout",
  "deleteColumn": "Smazat sloupec",
  "deleteRow": "Smazat řádek",
  "excelImport": "Načíst z Excelu...",
  "filter": "Filtrovat",
  "fontFamily": "Písmo",
  "fontSize": "Velikost písma",
  "format": "Vlastní formát...",
  "formatTypes": {
    "automatic": "Automaticky",
    "number": "Číslo",
    "percent": "procenta",
    "financial": "Účetnický",
    "currency": "Měna",
    "date": "Datum",
    "time": "Čas",
    "dateTime": "Datum a čas",
    "duration": "Doba trvání",
    "moreFormats": "Další formáty..."
  },
  "formatDecreaseDecimal": "Odebrat desetinné místo",
  "formatIncreaseDecimal": "Přidat desetinné místo",
  "freeze": "Ukotvit příčky",
  "freezeButtons": {
    "freezePanes": "Ukotvit příčky",
    "freezeRows": "Ukotvit řádky",
    "freezeColumns": "Ukotvit sloupce",
    "unfreeze": "Uvolnit příčky"
  },
  "italic": "Italic",
  "merge": "Sloučit buňky",
  "mergeButtons": {
    "mergeCells": "Sloučit vše",
    "mergeHorizontally": "Sloučit vodorovně",
    "mergeVertically": "Sloučit svisle",
    "unmerge": "Oddělit"
  },
  "open": "Otevřít...",
  "paste": "Vložit",
  "quickAccess": {
    "redo": "Znovu",
    "undo": "Zpět"
  },
  "saveAs": "Uložit jako...",
  "sortAsc": "Seřadit vzestupně",
  "sortDesc": "Seřadit sestupně",
  "sortButtons": {
    "sortSheetAsc": "Seřadit list od A k Z",
    "sortSheetDesc": "Seřadit list od Z k A",
    "sortRangeAsc": "Seřadit rozsah od A k Z",
    "sortRangeDesc": "Seřadit rozsah od Z k A"
  },
  "textColor": "Barva textu",
  "textWrap": "Zalomit text",
  "underline": "Podtržení",
  "validation": "Validace dat..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Nelze vložit buňky z důvodu možné ztráty dat. Zvolte jiné místo pro vložení nebo odstraňte data z konce listu.",
    "filterRangeContainingMerges": "Nelze vytvořit filtr v rozsahu sloučených buněk",
    "validationError": "Vložená hodnota nevyhovuje validačním pravidlům nastaveným pro tuto buňku."
  },
  "tabs": {
    "home": "Home",
    "insert": "Insert",
    "data": "Data"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Zvýšit",
  "decreaseButtonTitle": "Snížit"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Smazat",
    "moveUp": "Posunout nahoru",
    "moveDown": "Posunout dolů",
    "transferTo": "Přesunout do",
    "transferFrom": "Přesunout z",
    "transferAllTo": "Přesunout vše do",
    "transferAllFrom": "Přesunout vše z"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Žádné záznamy k zobrazení",
  "loading": "Načítám...",
  "requestFailed": "Požadavek selhal.",
  "retry": "Zkusit znovu",
  "commands": {
      "edit": "Upravit",
      "update": "Aktualizovat",
      "canceledit": "Zrušit",
      "create": "Přidat nový záznam",
      "createchild": "Přidat nový záznam",
      "destroy": "Smazat",
      "excel": "Excel export",
      "pdf": "PDF export"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Načítám...",
  "requestFailed": "Požadavek selhal.",
  "retry": "Zkusit znovu"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Vyberte...",
  "cancel": "Zrušit",
  "retry": "Zkusit znova",
  "remove": "Smazat",
  "clearSelectedFiles": "Smazat",
  "uploadSelectedFiles": "Nahrát soubory",
  "dropFilesHere": "Pro nahrání přetáhněte soubory sem",
  "statusUploading": "nahrávám",
  "statusUploaded": "nahráno",
  "statusWarning": "varování",
  "statusFailed": "chyba",
  "headerStatusUploading": "Nahrávám...",
  "headerStatusUploaded": "Hotovo",
  "invalidMaxFileSize": "Soubor je příliš velký.",
  "invalidMinFileSize": "Soubor je příliš malý.",
  "invalidFileExtension": "tento typ souboru není povolen."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} je povinné",
  "pattern": "{0} není platné",
  "min": "{0} musí být větší než rovno {1}",
  "max": "{0} musí být menší nebo rovno {1}",
  "step": "{0} není platné",
  "email": "{0} není platná e-mailová adresa",
  "url": "{0} není platná webová adresa",
  "date": "{0} není platné datum",
  "dateCompare": "Datum konce musí být vyšší než nebo rovno datumu začátku"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Načítá se..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization,{
  "close": "Zavřít"
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
$.extend(true, kendo.ui.Alert.prototype.options.localization,{
  "okText": "OK"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization,{
  "okText": "OK",
  "cancel": "Zrušit"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization,{
  "okText": "OK",
  "cancel": "Zrušit"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "rok",
      "month": "měsíc",
      "day": "den",
      "weekday": "den v týdnu",
      "hour": "hodiny",
      "minute": "minuty",
      "second": "sekundy",
      "dayperiod": "dop./odp."
    });
}

})(window.kendo.jQuery);
