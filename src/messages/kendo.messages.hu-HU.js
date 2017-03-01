(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Alkalmaz",
  "cancel": "Mégse",
  "noColor": "nincs szín",
  "clearColor": "Tiszta szín"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Alkalmaz",
  "cancel": "Mégse",
  "noColor": "nincs szín",
  "clearColor": "Tiszta szín"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Rendezés növekvő",
  "sortDescending": "Rendezés csökkenő",
  "filter": "Szűrés",
  "columns": "Oszlopok",
  "done": "Kész",
  "settings": "Oszlopbeállítások",
  "lock": "Rögzít",
  "unlock": "Felold"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Félkövér",
  "italic": "Dőlt",
  "underline": "Aláhúzott",
  "strikethrough": "Áthúzott",
  "superscript": "Felső index",
  "subscript": "Alsó index",
  "justifyCenter": "Középre igazítás",
  "justifyLeft": "Balra igazítás",
  "justifyRight": "Jobbra igazítás",
  "justifyFull": "Sorkizárás",
  "insertUnorderedList": "Számozatlan lista beszúrása",
  "insertOrderedList": "Számozott lista beszúrása",
  "indent": "Behúzás növelése",
  "outdent": "Behúzás csökkentése",
  "createLink": "Hivatkozás beszúrása",
  "unlink": "Hivatkozás eltávolítása",
  "insertImage": "Kép beszúrása",
  "insertFile": "Fájl beszúrása",
  "insertHtml": "HTML beszúrása",
  "viewHtml": "HTML megtekintése",
  "fontName": "Betűtípus választás",
  "fontNameInherit": "(örökölt betűtípus)",
  "fontSize": "Betűméret választás",
  "fontSizeInherit": "(örökölt méret)",
  "formatBlock": "Formátum",
  "formatting": "Formázás",
  "foreColor": "Tintaszín",
  "backColor": "Háttérszín",
  "style": "Stílusok",
  "emptyFolder": "Üres mappa",
  "uploadFile": "Feltöltés",
  "orderBy": "Rendezés:",
  "orderBySize": "Méret",
  "orderByName": "Név",
  "invalidFileType": "A fájl \"{0}\" nem megfelelő típusú. Támogatott fájltípusok: {1}.",
  "deleteFile": "Biztos, hogy törli a fájlt: \"{0}\"?",
  "overwriteFile": "A mappában már létezik \"{0}\" nevű fájl. Kívánja felülírni?",
  "directoryNotFound": "Nincs ilyen nevű könyvtár.",
  "imageWebAddress": "Webcím",
  "imageAltText": "Alternatív szöveg",
  "imageWidth": "Szélesség (px)",
  "imageHeight": "Magasság (px)",
  "fileWebAddress": "Webcím",
  "fileTitle": "Cím",
  "linkWebAddress": "Webcím",
  "linkText": "Szöveg",
  "linkToolTip": "Helyi súgó",
  "linkOpenInNewWindow": "Megnyitás új ablakban",
  "dialogUpdate": "Frissítés",
  "dialogInsert": "Beszúrás",
  "dialogButtonSeparator": "vagy",
  "dialogCancel": "Mégse",
  "cleanFormatting": "Formázás törlése",
  "createTable": "Táblázat létrehozása",
  "addColumnLeft": "Oszlop beszúrása balra",
  "addColumnRight": "Oszlop beszúrása jobbra",
  "addRowAbove": "Sor beszúrása fölé",
  "addRowBelow": "Sor beszúrása alá",
  "deleteRow": "Sor törlése",
  "deleteColumn": "Oszlop törlése",
  "dialogOk": "OK",
  "tableWizard": "Tábla varázsló",
  "tableTab": "Tábla",
  "cellTab": "Cella",
  "accessibilityTab": "Hozzáférhetőség",
  "caption": "Szöveg",
  "summary": "Összegzés",
  "width": "Szélesség",
  "height": "Magasság",
  "cellSpacing": "Cella térköz",
  "cellPadding": "Cella párnázás",
  "cellMargin": "Cella margó",
  "alignment": "Igazítás",
  "background": "Háttér",
  "cssClass": "CSS osztály",
  "id": "ID",
  "border": "Szegély",
  "borderStyle": "Szegély stílusa",
  "collapseBorders": "Keretek összeomlasztása",
  "wrapText": "Szövegtörés",
  "associateCellsWithHeaders": "Cellák társítása a fejlécekkel",
  "alignLeft": "Balra igazítás",
  "alignCenter": "Középre igazítás",
  "alignRight": "Jobbra igazítás",
  "alignLeftTop": "Igazítás balra és felülre",
  "alignCenterTop": "Igazítás vízszintesen középre és felülre",
  "alignRightTop": "Igazítás jobbra és felülre",
  "alignLeftMiddle": "Igazítás balra és függőlegesen középre",
  "alignCenterMiddle": "Igazítás vízszintesen és függőlegesen középre",
  "alignRightMiddle": "Igazítás jobbra és függőlegesen középre",
  "alignLeftBottom": "Igazítás balra és alulra",
  "alignCenterBottom": "Igazítás vízszintesen középre és alulra",
  "alignRightBottom": "Igazítás jobbra és alulra",
  "alignRemove": "Igazítás törlése",
  "columns": "Oszlopok",
  "rows": "Sorok",
  "selectAllCells": "Összes cella kiválasztása"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Feltöltés",
  "orderBy": "Rendezés",
  "orderByName": "Név",
  "orderBySize": "Méret",
  "directoryNotFound": "Nincs ilyen nevű könyvtár.",
  "emptyFolder": "Üres könyvtár",
  "deleteFile": "Biztos, hogy törli a fájlt: \"{0}\"?",
  "invalidFileType": "A fájl \"{0}\" nem megfelelő típusú. Támogatott fájltípusok: {1}.",
  "overwriteFile": "A mappában már létezik \"{0}\" nevű fájl. Kívánja felülírni?",
  "dropFilesHere": "húzza ide a fájlt a feltöltéshez",
  "search": "Keresés"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "igaz",
  "isFalse": "hamis",
  "filter": "Szűrés",
  "clear": "Törlés",
  "operator": "Művelet"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "startswith": "kezdődik",
    "contains": "tartalmazza",
    "doesnotcontain": "nem tartalmazza",
    "endswith": "végződik",
    "isnull": "null",
    "isnotnull": "nem null",
    "isempty": "üres",
    "isnotempty": "nem üres"
  },
  "number": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "gte": "nagyobb vagy egyenlő",
    "gt": "nagyobb",
    "lte": "kisebb vagy egyenlő",
    "lt": "kisebb",
    "isnull": "null",
    "isnotnull": "nem null"
  },
  "date": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "gte": "utána vagy ekkor",
    "gt": "utána",
    "lte": "előtte vagy ekkor",
    "lt": "előtte",
    "isnull": "null",
    "isnotnull": "nem null"
  },
  "enums": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "isnull": "null",
    "isnotnull": "nem null"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Megjelenítendő elemek értéke:",
  "isTrue": "igaz",
  "isFalse": "hamis",
  "filter": "Szűrés",
  "clear": "Törlés",
  "and": "és",
  "or": "vagy",
  "selectValue": "-Válasszon-",
  "operator": "Művelet",
  "value": "Érték",
  "cancel": "Mégse"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "startswith": "kezdődik",
    "contains": "tartalmazza",
    "doesnotcontain": "nem tartalmazza",
    "endswith": "végződik",
    "isnull": "null",
    "isnotnull": "nem null",
    "isempty": "üres",
    "isnotempty": "nem üres"
  },
  "number": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "gte": "nagyobb vagy egyenlő",
    "gt": "nagyobb",
    "lte": "kisebb vagy egyenlő",
    "lt": "kisebb",
    "isnull": "null",
    "isnotnull": "nem null"
  },
  "date": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "gte": "utána vagy ekkor",
    "gt": "utána",
    "lte": "előtte vagy ekkor",
    "lt": "előtte",
    "isnull": "null",
    "isnotnull": "nem null"
  },
  "enums": {
    "eq": "egyenlő",
    "neq": "nem egyenlő",
    "isnull": "null",
    "isnotnull": "nem null"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Összes kijelölése",
  "clear": "Törlés",
  "filter": "Szűrés",
  "search": "Keresés"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Gyermekelem hozzáadása",
    "append": "Feladat hozzáadása",
    "insertAfter": "Hozzáadás alá",
    "insertBefore": "Hozzáadás fölé",
    "pdf": "Exportálás PDF-be"
  },
  "cancel": "Mégse",
  "deleteDependencyWindowTitle": "Függőség törlése",
  "deleteTaskWindowTitle": "Feladat törlése",
  "destroy": "Törlés",
  "editor": {
    "assingButton": "Hozzárendelés",
    "editorTitle": "Feladat",
    "end": "Vége",
    "percentComplete": "Befejezés",
    "resources": "Erőforrások",
    "resourcesEditorTitle": "Erőforrások",
    "resourcesHeader": "Erőforrások",
    "start": "Indítás",
    "title": "Cím",
    "unitsHeader": "Egységek"
  },
  "save": "Mentés",
  "views": {
    "day": "nap",
    "end": "vége",
    "month": "hónap",
    "start": "eleje",
    "week": "hét",
    "year": "év"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Módosítások elvetése",
    "canceledit": "Mégse",
    "create": "Új elem",
    "destroy": "Törlés",
    "edit": "Szerkesztés",
    "excel": "Exportálás Excel-be",
    "pdf": "Exportálás PDF-be",
    "save": "Módosítások mentése",
    "select": "Választás",
    "update": "Frissítés"
  },
  "editable": {
    "cancelDelete": "Mégse",
    "confirmation": "Biztos, hogy törli az elemet?",
    "confirmDelete": "Törlés"
  },
  "noRecords": "Nincsenek elérhető elemek."
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Nincsenek megjeleníthető elemek",
    "loading": "Betöltés...",
    "requestFailed": "A kérés sikertelen.",
    "retry": "Újra",
    "commands": {
        "edit": "Szerkesztés",
        "update": "Frissítés",
        "canceledit": "Mégse",
        "create": "Új elem",
        "createchild": "Gyermekelem hozzáadása",
        "destroy": "Törlés",
        "excel": "Exportálás Excel-be",
        "pdf": "Exportálás PDF-be"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Húzza ide az oszlopfejlécet a csoportosításhoz"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Érték növelése",
  "downArrowText": "Érték csökkentése"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Szünet",
  "play": "Lejátszás",
  "mute": "Némítás",
  "unmute": "Némítás feloldása",
  "quality": "Minőség",
  "fullscreen": "Teljes képernyő"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Összes",
  "display": "{0}-{1} a(z) {2} elemből",
  "empty": "Nincsenek megjeleníthető elemek",
  "page": "Oldal",
  "of": "a(z) {0}",
  "itemsPerPage": "elem / oldal",
  "first": "Ugrás az első oldalra",
  "previous": "Ugrás az előző oldalra",
  "next": "Ugrás a következő oldalra",
  "last": "Ugrás az utolsó oldalra",
  "refresh": "Frissítés",
  "morePages": "További oldalak"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Húzza az adatelemeket ide",
  "columnFields": "Húzza az oszlopelemeket ide",
  "rowFields": "Húzza a sorelemeket ide"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Megjelenítendő elemek értéke:",
  "filterFields": "Mezőszűrő",
  "filter": "Szűrés",
  "include": "Mezők befoglalása...",
  "title": "Befoglalandó mezők",
  "clear": "Törlés",
  "ok": "OK",
  "cancel": "Mégse",
  "operators": {
    "contains": "tartalmazza",
    "doesnotcontain": "nem tartalmazza",
    "startswith": "kezdődik",
    "endswith": "végződik",
    "eq": "egyenlő",
    "neq": "nem egyenlő"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Soha",
    "hourly": "Óránként",
    "daily": "Naponta",
    "weekly": "Hetente",
    "monthly": "Havonta",
    "yearly": "Évente"
  },
  "hourly": {
    "repeatEvery": "Ismételje minden: ",
    "interval": " óra(k)"
  },
  "daily": {
    "repeatEvery": "Ismételje minden: ",
    "interval": " nap(ok)"
  },
  "weekly": {
    "interval": " hét(ek)",
    "repeatEvery": "Ismételje minden: ",
    "repeatOn": "Ismételje: "
  },
  "monthly": {
    "repeatEvery": "Ismételje minden: ",
    "repeatOn": "Ismételje: ",
    "interval": " hónap(ok)",
    "day": "nap "
  },
  "yearly": {
    "repeatEvery": "Ismételje minden: ",
    "repeatOn": "Ismételje: ",
    "interval": " év(ek)",
    "of": " a(z) "
  },
  "end": {
    "label": "Vége:",
    "mobileLabel": "Végződik",
    "never": "Soha",
    "after": "Után ",
    "occurrence": " előfordulás(ok)",
    "on": "Ekkor: "
  },
  "offsetPositions": {
    "first": "első",
    "second": "második",
    "third": "harmadik",
    "fourth": "negyedik",
    "last": "utolsó"
  },
  "weekdays": {
    "day": "nap",
    "weekday": "munkanap",
    "weekend": "pihenőnap"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "egész nap",
  "date": "Dátum",
  "event": "Esemény",
  "time": "Idő",
  "showFullDay": "Teljes nap mutatása",
  "showWorkDay": "Munkaórák mutatása",
  "today": "Ma",
  "save": "Mentés",
  "cancel": "Mégse",
  "destroy": "Törlés",
  "deleteWindowTitle": "Esemény törlése",
  "ariaSlotLabel": "Kiválasztva {0:t}-tól {1:t}-ig",
  "ariaEventLabel": "{0} {1:D} {2:t}",
  "editable": {
    "confirmation": "Biztos, hogy törölni akarja az eseményt?"
  },
  "views": {
    "day": "nap",
    "week": "Hét",
    "workWeek": "Munkahét",
    "agenda": "Naptár",
    "month": "Hónap"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Ismétlődő elem törlése",
    "deleteWindowOccurrence": "Alkalom törlése",
    "deleteWindowSeries": "Összes ismétlődés törlése",
    "editWindowTitle": "Ismétlődő elem szerkesztése",
    "editWindowOccurrence": "Alkalom szerkesztése",
    "editWindowSeries": "Összes ismétlődés szerkesztése",
    "deleteRecurring": "Csak ezt az alkalmat szeretné törölni, vagy az összes ismétlődést?",
    "editRecurring": "Csak ezt az alkalmat szeretné szerkeszteni, vagy az összes ismétlődést?"
  },
  "editor": {
    "title": "Cím",
    "start": "Kezdés",
    "end": "Befejezés",
    "allDayEvent": "Egész napos esemény",
    "description": "Leírás",
    "repeat": "Ismétlődés",
    "timezone": " ",
    "startTimezone": "Kezdés időzónája",
    "endTimezone": "Befejezés időzónája",
    "separateTimezones": "A kezdés és a befejezés időzónája eltérő",
    "timezoneEditorTitle": "Időzónák",
    "timezoneEditorButton": "Időzóna",
    "timezoneTitle": "Időzónák",
    "noTimezone": "Nincs időzóna",
    "editorTitle": "Esemény"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Minden szegély",
  "insideBorders": "Belső szegélyek",
  "insideHorizontalBorders": "Belső vízszintes szegélyek",
  "insideVerticalBorders": "Belső függőleges szegélyek",
  "outsideBorders": "Külső szegélyek",
  "leftBorder": "Bal szegély",
  "topBorder": "Felső szegély",
  "rightBorder": "Jobb szegély",
  "bottomBorder": "Alsó szegély",
  "noBorders": "Nincs szegély",
  "reset": "Alapértelmezett szín",
  "customColor": "Egyéni szín...",
  "apply": "Alkalmaz",
  "cancel": "Mégse"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Alkalmaz",
  "save": "Mentés",
  "cancel": "Mégse",
  "remove": "Eltávolítás",
  "retry": "Újra",
  "revert": "Visszaállítás",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formázás",
    "categories": {
      "number": "Szám",
      "currency": "Pénznem",
      "date": "Dátum"
      }
  },
  "fontFamilyDialog": {
    "title": "Betűtípus"
  },
  "fontSizeDialog": {
    "title": "Betűméret"
  },
  "bordersDialog": {
    "title": "Szegélyek"
  },
  "alignmentDialog": {
    "title": "Igazítás",
    "buttons": {
     "justtifyLeft": "Balra igazítás",
     "justifyCenter": "Középre igazítás",
     "justifyRight": "Jobbra igazítás",
     "justifyFull": "Sorkizárás",
     "alignTop": "Függőleges igazítás felülre",
     "alignMiddle": "Függőleges igazítás középre",
     "alignBottom": "Függőleges igazítás alulra"
    }
  },
  "mergeDialog": {
    "title": "Cellaegyesítés",
    "buttons": {
      "mergeCells": "Összes egyesítése",
      "mergeHorizontally": "Egyesítés vízszintesen",
      "mergeVertically": "Egyesítés függőlegesen",
      "unmerge": "Szétválasztás"
    }
  },
  "freezeDialog": {
    "title": "Ablaktábla rögzítése",
    "buttons": {
      "freezePanes": "Ablaktábla rögzítése",
      "freezeRows": "Sorok rögzítése",
      "freezeColumns": "Oszlopok rögzítése",
      "unfreeze": "Rögzítés feloldása"
    }
  },
  "confirmationDialog": {
    "text": "Biztos, hogy törli ezt a munkalapot?",
    "title": "Munkalap törlése"
  },
  "validationDialog": {
    "title": "Adatellenőrzés",
    "hintMessage": "Kérem, írjon be egy érvényes {0} értéket {1}.",
    "hintTitle": "Ellenőrzés {0}",
    "criteria": {
      "any": "Bármely érték",
      "number": "Szám",
      "text": "Szöveg",
      "date": "Dátum",
      "custom": "Egyéni szabály",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "nagyobb, mint",
      "lessThan": "kisebb, mint",
      "between": "a következők közé esik",
      "notBetween": "nem esik a következők közé",
      "equalTo": "egyenlő",
      "notEqualTo": "nem egyenlő",
      "greaterThanOrEqualTo": "nagyobb vagy egyenlő",
      "lessThanOrEqualTo": "kisebb vagy egyenlő"
    },
    "comparerMessages": {
      "greaterThan": "nagyobb, mint {0}",
      "lessThan": "kisebb, mint {0}",
      "between": "{0} és {1} közé esik",
      "notBetween": "nem esik {0} és {1} közé",
      "equalTo": "egyenlő {0}",
      "notEqualTo": "nem egyenlő {0}",
      "greaterThanOrEqualTo": "nagyobb vagy egyenlő {0}",
      "lessThanOrEqualTo": "kisebb vagy egyenlő {0}",
      "custom": "megfelel a képletnek: {0}"
    },
    "labels": {
      "criteria": "Feltétel",
      "comparer": "Összehasonlító",
      "min": "Minimum",
      "max": "Maximum",
      "value": "Érték",
      "start": "Kezdés",
      "end": "Befejezés",
      "onInvalidData": "Érvénytelen adat beírásakor",
      "rejectInput": "Bevitel visszautasítása",
      "showWarning": "Figyelmeztetés megjelenítése",
      "showHint": "Javaslat megjelenítése",
      "hintTitle": "Javaslat címe",
      "hintMessage": "Javaslat szövege",
      "ignoreBlank": "Üres cellák mellőzése"
    },
    "placeholders": {
      "typeTitle": "Típus cím",
      "typeMessage": "Típus üzenet"
    }
  },
  "saveAsDialog": {
    "title": "Mentés másként...",
    "labels": {
      "fileName": "Fájlnév",
      "saveAsType": "Fájl típusa"
    }
  },
  "exportAsDialog": {
    "title": "Exportálás...",
    "labels": {
      "fileName": "Fájlnév",
      "saveAsType": "Fájl típusa",
      "exportArea": "Exportálás",
      "paperSize": "Papírméret",
      "margins": "Margók",
      "orientation": "Tájolás",
      "print": "Nyomtatás",
      "guidelines": "Segédvonalak",
      "center": "Középre",
      "horizontally": "Vízszintesen",
      "vertically": "Függőlegesen"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nem lehet módosítani az egyesített cella egy részét."
  },
  "useKeyboardDialog": {
    "title": "Másolás és beillesztés",
    "errorMessage": "Ezek a műveletek nem érhetők el a menüből. Kérem, használja a következő billentyűkombinációkat:",
    "labels": {
      "forCopy": "másoláshoz",
      "forCut": "kivágáshoz",
      "forPaste": "beillesztéshez"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "A művelet nem hajtható végre többes kijelölésen."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Tartomány rendezése A-Z",
  "sortDescending": "Tartomány rendezése Z-A",
  "filterByValue": "Szűrés érték szerint",
  "filterByCondition": "Szűrés feltétel alapján",
  "apply": "Alkalmaz",
  "search": "Keresés",
  "addToCurrent": "Hozzáadás az aktuális kijelöléshez",
  "clear": "Törlés",
  "blanks": "(Üresek)",
  "operatorNone": "Egyik sem",
  "and": "és",
  "or": "vagy",
  "operators": {
    "string": {
      "contains": "A szöveg tartalmazza",
      "doesnotcontain": "A szöveg nem tartalmazza",
      "startswith": "A szöveg eleje",
      "endswith": "A szöveg vége"
    },
    "date": {
      "eq":  "A dátum",
      "neq": "A dátum nem",
      "lt":  "Ezen dátum előtt",
      "gt":  "Ezen dátum után"
    },
    "number": {
      "eq": "egyenlő",
      "neq": "nem egyenlő",
      "gte": "nagyobb vagy egyenlő",
      "gt": "nagyobb",
      "lte": "kisebb vagy egyenlő",
      "lt": "kisebb"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Oszlop hozzáadása balra",
  "addColumnRight": "Oszlop hozzáadása jobbra",
  "addRowAbove": "Sor hozzáadása fölé",
  "addRowBelow": "Sor hozzáadása alá",
  "alignment": "Igazítás",
  "alignmentButtons": {
    "justtifyLeft": "Balra igazítás",
    "justifyCenter": "Középre igazítás",
    "justifyRight": "Jobbra igazítás",
    "justifyFull": "Sorkizárás",
    "alignTop": "Függőleges igazítás felülre",
    "alignMiddle": "Függőleges igazítás középre",
    "alignBottom": "Függőleges igazítás alulra"
  },
  "backgroundColor": "Kitöltőszín",
  "bold": "Félkövér",
  "borders": "Szegélyek",
  "colorPicker": {
    "reset": "Alapértelmezett szín",
    "customColor": "Egyéni szín..."
  },
  "copy": "Másolás",
  "cut": "Kivágás",
  "deleteColumn": "Oszlop törlése",
  "deleteRow": "Sor törlése",
  "excelImport": "Importálás Excel-ből...",
  "filter": "Szűrés",
  "fontFamily": "Betűtípus",
  "fontSize": "Betűméret",
  "format": "Egyéni formátum...",
  "formatTypes": {
    "automatic": "Automatikus",
    "number": "Szám",
    "percent": "Százalék",
    "financial": "Könyvelési",
    "currency": "Pénznem",
    "date": "Dátum",
    "time": "Idő",
    "dateTime": "Dátum-idő",
    "duration": "Időtartam",
    "moreFormats": "Egyéb formátum..."
  },
  "formatDecreaseDecimal": "Tizedeshelyek csökkentése",
  "formatIncreaseDecimal": "Tizedeshelyek növelése",
  "freeze": "Ablaktábla rögzítése",
  "freezeButtons": {
    "freezePanes": "Ablaktábla rögzítése",
    "freezeRows": "Sorok rögzítése",
    "freezeColumns": "Oszlopok rögzítése",
    "unfreeze": "Rögzítés feloldása"
  },
  "italic": "Dőlt",
  "merge": "Cellaegyesítés",
  "mergeButtons": {
    "mergeCells": "Összes egyesítése",
    "mergeHorizontally": "Egyesítés vízszintesen",
    "mergeVertically": "Egyesítés függőlegesen",
    "unmerge": "Szétválasztás"
  },
  "open": "Megnyitás...",
  "paste": "Beillesztés",
  "quickAccess": {
    "redo": "Mégis",
    "undo": "Visszavonás"
  },
  "saveAs": "Mentés másként...",
  "sortAsc": "Rendezés növekvő",
  "sortDesc": "Rendezés csökkenő",
  "sortButtons": {
    "sortSheetAsc": "Munkalap rendezése A-Z",
    "sortSheetDesc": "Munkalap rendezése Z-A",
    "sortRangeAsc": "Tartomány rendezése A-Z",
    "sortRangeDesc": "Tartomány rendezése Z-A"
  },
  "textColor": "Tintaszín",
  "textWrap": "Szöveg törése több sorba",
  "underline": "Aláhúzott",
  "validation": "Adatellenőrzés..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Adatvesztés nélkül nem lehet a cellákat beszúrni. Válasszon másik beszúrási pozíciót, vagy törölje az adatokat a munkalap végéről.",
    "filterRangeContainingMerges": "Nem lehet szűrőt készíteni összevonásokat tartalmazó tartományon belül",
    "validationError": "A beírt érték megsérti a cellára beállított adatellenőrzési szabályokat."
  },
  "tabs": {
    "home": "Elejére",
    "insert": "Beszúrás",
    "data": "Adat"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Növelés",
  "decreaseButtonTitle": "Csökkentés"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Nincsenek megjeleníthető elemek",
  "loading": "Betöltés...",
  "requestFailed": "A kérés sikertelen",
  "retry": "Újra",
  "commands": {
      "edit": "Szerkesztés",
      "update": "Frissítés",
      "canceledit": "Mégse",
      "create": "Új elem",
      "createchild": "Gyermekelem hozzáadása",
      "destroy": "Törlés",
      "excel": "Exportálás Excel-be",
      "pdf": "Exportálás PDF-be"
  }
});
}

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.columnMenu =
$.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
    "messages": {
        "columns": "Oszlopválasztás",
        "filter": "Szűrés",
        "sortAscending": "Rendezés (növekvő)",
        "sortDescending": "Rendezés (csökkenő)"
    }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Betöltés...",
  "requestFailed": "A kérés sikertelen",
  "retry": "Újra"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Választás...",
  "cancel": "Mégse",
  "retry": "Újra",
  "remove": "Eltávolítás",
  "clearSelectedFiles": "Törlés",
  "uploadSelectedFiles": "Fájlok feltöltése",
  "dropFilesHere": "húzza ide a feltöltendő fájlokat",
  "statusUploading": "feltöltés",
  "statusUploaded": "feltöltve",
  "statusWarning": "figyelem",
  "statusFailed": "sikertelen",
  "headerStatusUploading": "Feltöltés...",
  "headerStatusUploaded": "Kész",
  "invalidMaxFileSize": "A fájl túl nagy.",
  "invalidMinFileSize": "A fájl túl kicsi.",
  "invalidFileExtension": "A fájltípus nem engedélyezett."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} szükséges",
  "pattern": "{0} érvénytelen",
  "min": "{0} nagyobb vagy egyenlő kell hogy legyen, mint {1}",
  "max": "{0} kisebb vagy egyenlő kell hogy legyen, mint {1}",
  "step": "{0} érvénytelen",
  "email": "{0} érvénytelen email",
  "url": "{0} érvénytelen URL",
  "date": "{0} érvénytelen dátum",
  "dateCompare": "A végdátum nagyobb vagy egyenlő kell hogy legyen, mint a kezdődátum"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Betöltés..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Bezárás"
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
  "cancel": "Mégse"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Mégse"
});
}

})(window.kendo.jQuery);
