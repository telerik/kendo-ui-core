(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Piemērot",
  "cancel": "Atcelt",
  "noColor": "nav krāsas",
  "clearColor": "Notīrīt krāsu"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Piemērot",
  "cancel": "Atcelt",
  "noColor": "nav krāsas",
  "clearColor": "Notīrīt krāsu"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Kārtot augoši",
  "sortDescending": "Kārtot dilstoši",
  "filter": "Filtrēt",
  "columns": "Kolonnas",
  "done": "Pabeigt",
  "settings": "Kolonnu iestatījumi",
  "lock": "Aizslēgt",
  "unlock": "Atslēgt"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Treknraksts",
  "italic": "Slīpraksts",
  "underline": "Pasvītrojums",
  "strikethrough": "Pārsvītrojums",
  "superscript": "Augšraksts",
  "subscript": "Apakšraksts",
  "justifyCenter": "Centrēt tekstu",
  "justifyLeft": "Līdzināt tekstu pa kreisi",
  "justifyRight": "Līdzināt tekstu pa labi",
  "justifyFull": "Taisnot",
  "insertUnorderedList": "Ievietot nesakārtotu sarakstu",
  "insertOrderedList": "Ievietot sakārtotu sarakstu",
  "indent": "Palielināt atkāpi",
  "outdent": "Samazināt atkāpi",
  "createLink": "Ievietot hipersaiti",
  "unlink": "Noņemt hipersaiti",
  "insertImage": "Ievietot attēlu",
  "insertFile": "Ievietot datni",
  "insertHtml": "Ievietot HTML",
  "viewHtml": "Skatīt HTML",
  "fontName": "Izvēlēties fontu saimi",
  "fontNameInherit": "(mantots fonts)",
  "fontSize": "Izvēlēties fonta izmēru",
  "fontSizeInherit": "(mantots fonta izmērs)",
  "formatBlock": "Formatēt",
  "formatting": "Formatēt",
  "foreColor": "Krāsa",
  "backColor": "Fona krāsa",
  "style": "Stili",
  "emptyFolder": "Tukša mape",
  "uploadFile": "Augšupielādēt",
  "overflowAnchor": "Vairāk rīku",
  "orderBy": "Kārtot pēc:",
  "orderBySize": "Izmēra",
  "orderByName": "Nosaukuma",
  "invalidFileType": "Izvēlētā datne \"{0}\" nav derīga. Atbalstītie datņu tipi ir {1}.",
  "deleteFile": 'Vai jūs esat pārliecienāts, ka vēlaties dzēst "{0}"?',
  "overwriteFile": 'Datne ar nosaukumu "{0}" jau eksistē šajā mapē. Vai jūs vēlaties to pārrakstīt?',
  "directoryNotFound": "Mape ar šādu nosaukumu netika atrasta.",
  "imageWebAddress": "Tīmekļa adrese",
  "imageAltText": "Alternatīvs teksts",
  "imageWidth": "Platums (px)",
  "imageHeight": "Augstums (px)",
  "fileWebAddress": "Tīmekļa adrese",
  "fileTitle": "Virsraksts",
  "linkWebAddress": "Tīmekļa adrese",
  "linkText": "Teksts",
  "linkToolTip": "Paskaidre",
  "linkOpenInNewWindow": "Atvērt saiti jaunā logā",
  "dialogUpdate": "Atjaunot",
  "dialogInsert": "Ievieot",
  "dialogButtonSeparator": "vai",
  "dialogCancel": "Atcelt",
  "cleanFormatting": "Notīrīt formatējumu",
  "createTable": "Izveidot tabulu",
  "addColumnLeft": "Pievienot kolonnu kreisajā pusē",
  "addColumnRight": "Pievienot kolonnu labajā pusē",
  "addRowAbove": "Pievienot rindu augšā",
  "addRowBelow": "Pievienot rindu apakšā",
  "deleteRow": "Dzēst rindu",
  "deleteColumn": "Dzēst kolonnu",
  "dialogOk": "Labi",
  "tableWizard": "Tabulas veidnis",
  "tableTab": "Tabula",
  "cellTab": "Šūna",
  "accessibilityTab": "Pieejamība",
  "caption": "Paraksts",
  "summary": "Kopsavilkums",
  "width": "Platums",
  "height": "Augstums",
  "units": "Mērvienības",
  "cellSpacing": "Šūnu atstarpe",
  "cellPadding": "Šūnu polsterējums",
  "cellMargin": "Šūnu robeža",
  "alignment": "Izkārtojums",
  "background": "Fons",
  "cssClass": "CSS klase",
  "id": "ID",
  "border": "Apmale",
  "borderStyle": "Apmales stils",
  "collapseBorders": "Sakļaut apmales",
  "wrapText": "Aplauzt tekstu",
  "associateCellsWithHeaders": "Asociēt šūnas ar galvenēm",
  "alignLeft": "Līdzināt pa kreisi",
  "alignCenter": "Līdzināt centrā",
  "alignRight": "Līdzināt pa labi",
  "alignLeftTop": "Līdzināt pa kreisi augšā",
  "alignCenterTop": "Līdzināt centrā augšā",
  "alignRightTop": "Līdzināt pa labi augšā",
  "alignLeftMiddle": "Līdzināt pa kreisi vidū",
  "alignCenterMiddle": "Līdzināt centrā vidū",
  "alignRightMiddle": "Līdzināt pa labi vidū",
  "alignLeftBottom": "Līdzināt pa kreisi apakšā",
  "alignCenterBottom": "Līdzināt centrā apakšā",
  "alignRightBottom": "Līdzināt pa labi apakšā",
  "alignRemove": "Noņemt līdzinājumu",
  "columns": "Kolonnas",
  "rows": "Rindas",
  "selectAllCells": "Iezīmēt visas šūnas"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Augšupielādēt",
  "orderBy": "Kārtot pēc",
  "orderByName": "Nosaukuma",
  "orderBySize": "Izmēra",
  "directoryNotFound": "Mape ar šādu nosaukumu netika atrasta.",
  "emptyFolder": "Tukša mape",
  "deleteFile": 'Vai jūs esat pārliecināts, ka vēlaties dzēst "{0}"?',
  "invalidFileType": "Izvēlētā datne \"{0}\" nav derīga. Atbalstītie datņu veidi ir {1}.",
  "overwriteFile": "Datne ar nosaukumu \"{0}\" jau eksistē šajā mapē. Vai jūs vēlaties to pārrakstīt?",
  "dropFilesHere": "nometiet datni šeit, lai to augšupielādētu",
  "search": "Meklēt"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "ir patiess",
  "isFalse": "ir aplams",
  "filter": "Filtrēt",
  "clear": "Notīrīt",
  "operator": "Operators"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "startswith": "Sākas ar",
    "contains": "Satur",
    "doesnotcontain": "Nesatur",
    "endswith": "Beidzas ar",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs",
    "isempty": "Ir tukšs",
    "isnotempty": "Nav tukšs",
    "isnullorempty": "Bez vērtības",
    "isnotnullorempty": "Ar vērtību"
  },
  "number": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "gte": "Ir lielāks par vai vienāds ar",
    "gt": "Ir lielāks par",
    "lte": "Ir mazāks par vai vienāds ar",
    "lt": "Ir mazāks par",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  },
  "date": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "gte": "Ir pēc vai vienāds ar",
    "gt": "Ir pēc",
    "lte": "Ir pirms vai vienāds ar",
    "lt": "Ir pirms",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  },
  "enums": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Rādīt vienības ar vērtību, kas:",
  "title": "Rādīt vienības ar vērtību, kas",
  "isTrue": "ir patiesas",
  "isFalse": "ir aplamas",
  "filter": "Filtrēt",
  "clear": "Notīrīt",
  "and": "Un",
  "or": "Vai",
  "selectValue": "-Izvēlieties vērtību-",
  "operator": "Operators",
  "value": "Vērtība",
  "cancel": "Atcelt"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "startswith": "Sākas ar",
    "contains": "Satur",
    "doesnotcontain": "Nesatur",
    "endswith": "Beidzas ar",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs",
    "isempty": "Ir tukšs",
    "isnotempty": "Nav tukšs",
    "isnullorempty": "Bez vērtības",
    "isnotnullorempty": "Ar vērtību"
  },
  "number": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "gte": "Ir lielāks par vai vienāds ar",
    "gt": "Ir lielāks par",
    "lte": "Ir mazāks par vai vienāds ar",
    "lt": "Ir mazāks par",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  },
  "date": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "gte": "Ir pēc vai vienāds ar",
    "gt": "Ir pēc",
    "lte": "Ir pirms vai vienāds ar",
    "lt": "Ir pirms",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  },
  "enums": {
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar",
    "isnull": "Ir tukšs",
    "isnotnull": "Nav tukšs"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Izvēlēties visu",
  "clear": "Notīrīt",
  "filter": "Filtrēt",
  "search": "Meklēt"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Pievienot bērna elementu",
    "append": "Pievienot uzdevumu",
    "insertAfter": "Pievienot zem",
    "insertBefore": "Pievienot virs",
    "pdf": "Eksportēt uz PDF"
  },
  "cancel": "Atcelt",
  "deleteDependencyWindowTitle": "Dzēst atkarību",
  "deleteTaskWindowTitle": "Dzēst uzdevumu",
  "destroy": "Dzēst",
  "editor": {
    "assingButton": "Piešķirt",
    "editorTitle": "Uzdevums",
    "end": "Beigas",
    "percentComplete": "Pabeigts",
    "resources": "Resursi",
    "resourcesEditorTitle": "Resursi",
    "resourcesHeader": "Resursi",
    "start": "Sākums",
    "title": "Virsraksts",
    "unitsHeader": "Mērvienības"
  },
  "save": "Saglabāt",
  "views": {
    "day": "Diena",
    "end": "Beigas",
    "month": "Mēnesis",
    "start": "Sākums",
    "week": "Nedēļa",
    "year": "Gads"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Atcelt izmaiņas",
    "canceledit": "Atcelt",
    "create": "Pievienot jaunu ierakstu",
    "destroy": "Dzēst",
    "edit": "Labot",
    "excel": "Eksportēt uz Excel",
    "pdf": "Eksportēt uz PDF",
    "save": "Saglabāt izmaiņas",
    "select": "Iezīmēt",
    "update": "Atjaunināt"
  },
  "editable": {
    "cancelDelete": "Atcelt",
    "confirmation": "Vai jūs esat pārliecienāts, ka vēlaties dzēst šo ierakstu?",
    "confirmDelete": "Dzēst"
  },
  "noRecords": "Nav ierakstu.",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Spiediet ctrl + space lai grupētu",
  "ungroupHeader": "Spiediet ctrl + space lai atgrupētu"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Nav ierakstu, ko attēlot",
    "loading": "Ielādē...",
    "requestFailed": "Pieprasījums neizdevās.",
    "retry": "Atkārtot",
    "commands": {
        "edit": "Labot",
        "update": "Atjaunināt",
        "canceledit": "Atcelt",
        "create": "Pievienot jaunu ierakstu",
        "createchild": "Pievienot bērna ierakstu",
        "destroy": "Dzēst",
        "excel": "Eksportēt uz Excel",
        "pdf": "Eksportēt uz PDF"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Velciet kolonnas galveni un nometiet to šeit, lai grupētu pēc kolonnas"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Palielināt vērtību",
  "downArrowText": "Samazināt vērtību"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pauze",
  "play": "Spēlēt",
  "mute": "Uzlikt klusumu",
  "unmute": "Noņemt klusumu",
  "quality": "Kvalitāte",
  "fullscreen": "Pilna ekrāna"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Visas",
  "display": "{0} - {1} no {2} vienībām",
  "empty": "Nav vienību, ko attēlot",
  "page": "Lapa",
  "of": "no {0}",
  "itemsPerPage": "vienības lapā",
  "first": "Doties uz pirmo lapu",
  "previous": "Doties uz iepriekšējo lapu",
  "next": "Doties uz nākamo lapu",
  "last": "Doties uz pēdējo lapu",
  "refresh": "Atjaunot",
  "morePages": "Vairāk lapas"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Visas",
  "display": "{0} - {1} no {2} vienībām",
  "empty": "Nav vienību, ko attēlot",
  "page": "Lapa",
  "of": "no {0}",
  "itemsPerPage": "vienības lapā",
  "first": "Doties uz pirmo lapu",
  "previous": "Doties uz iepriekšējo lapu",
  "next": "Doties uz nākamo lapu",
  "last": "Doties uz pēdējo lapu",
  "refresh": "Atjaunot",
  "morePages": "Vairāk lapas"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Nometiet datu laukus šeit",
  "columnFields": "Nometiet kolonu laukus šeit",
  "rowFields": "Nometiet rindu laukus šeit"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Rādīt vienības ar vērtību, kas:"
  "filterFields": "Lauku filtrs",
  "filter": "Filtrēt",
  "include": "Iekļaut laukus...",
  "title": "Lauki, ko iekļaut",
  "clear": "Notīrīt",
  "ok": "Labi",
  "cancel": "Atcelt",
  "operators": {
    "contains": "Satur",
    "doesnotcontain": "Nesatur",
    "startswith": "Sākas ar",
    "endswith": "Beidzas ar",
    "eq": "Ir vienāds ar",
    "neq": "Nav vienāds ar"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nekad",
    "hourly": "Ik pēc stundas",
    "daily": "Katru dienu",
    "weekly": "Katru nedēļu",
    "monthly": "Katru mēnesi",
    "yearly": "Katru gadu"
  },
  "hourly": {
    "repeatEvery": "Atkārtot katru: ",
    "interval": " stundu(-as)"
  },
  "daily": {
    "repeatEvery": "Atkārtot katru: ",
    "interval": " dienu(-as)"
  },
  "weekly": {
    "interval": " nedēļu(-as)",
    "repeatEvery": "Atkārtot katru:",
    "repeatOn": "Atkārtot: "
  },
  "monthly": {
    "repeatEvery": "Atkārtot katru: ",
    "repeatOn": "Atkārtot: ",
    "interval": " mēnesi(-šus)",
    "day": "Diena "
  },
  "yearly": {
    "repeatEvery": "Atkārtot katru: ",
    "repeatOn": "Atkārtot: ",
    "interval": " gadu(s)",
    "of": " no "
  },
  "end": {
    "label": "Beigas:",
    "mobileLabel": "Beidzas",
    "never": "Nekad",
    "after": "Pēc ",
    "occurrence": " notikuma(-iem)",
    "on": " "
  },
  "offsetPositions": {
    "first": "pirmais",
    "second": "otrais",
    "third": "trešais",
    "fourth": "ceturtais",
    "last": "pēdējais"
  },
  "weekdays": {
    "day": "diena",
    "weekday": "darba nedēļas diena",
    "weekend": "nedēļas nogales diena"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "visu dienu",
  "date": "Datums",
  "event": "Notikums",
  "time": "Laiks",
  "showFullDay": "Rādīt visu dienu",
  "showWorkDay": "Rādīt darba laiku",
  "today": "Šodien",
  "save": "Saglabāt",
  "cancel": "Atcelt",
  "destroy": "Dzēst",
  "deleteWindowTitle": "Dzēst notikumu",
  "ariaSlotLabel": "Iezīmēts no {0:t} līdz {1:t}",
  "ariaEventLabel": "{0} {1:D} {2:t}",
  "editable": {
    "confirmation": "Vai jūs esat pārliecināts, ka vēlaties dzēst šo notikumu?"
  },
  "views": {
    "day": "Diena",
    "week": "Nedēļa",
    "workWeek": "Darba nedēļa",
    "agenda": "Darba kārtība",
    "month": "Mēnesis"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Dzēst atkārtojošos vienību",
    "deleteWindowOccurrence": "Dzēst šo notikumu",
    "deleteWindowSeries": "Dzēst sēriju",
    "deleteRecurringConfirmation": "Vai jūs esat pārliecināts, ka vēlaties dzēst šo notikumu?",
    "deleteSeriesConfirmation": "Vai jūs esat pārliecināts, ka vēlaties dzēst visu sēriju?",
    "editWindowTitle": "Labot atkārtojošo vienību",
    "editWindowOccurrence": "Labot šo notikumu",
    "editWindowSeries": "Labot sēriju",
    "deleteRecurring": "Vai jūs vēlaties dzēst tikai šo notikumu vai visu sēriju?",
    "editRecurring": "Vai jūs vēlaties labot tikai šo notikumu vai visu sēriju?"
  },
  "editor": {
    "title": "Nosaukums",
    "start": "Sākums",
    "end": "Beigas",
    "allDayEvent": "Visas dienas notikums",
    "description": "Apraksts",
    "repeat": "Atkārtot",
    "timezone": " ",
    "startTimezone": "Sākuma laika zona",
    "endTimezone": "Beigu laika zona",
    "separateTimezones": "Izmantot atšķirīgas sākuma un beigu laika zonas",
    "timezoneEditorTitle": "Laika zonas",
    "timezoneEditorButton": "Laika zona",
    "timezoneTitle": "Laika zonas",
    "noTimezone": "Nav laika zona",
    "editorTitle": "Notikums"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Visi rāmji",
  "insideBorders": "Iekšējie rāmji",
  "insideHorizontalBorders": "Iekšējie horizontālie rāmji",
  "insideVerticalBorders": "Iekšējie vertikālie rāmji",
  "outsideBorders": "Ārējie rāmji",
  "leftBorder": "Kreisais rāmis",
  "topBorder": "Augšējais rāmis",
  "rightBorder": "Labais rāmis",
  "bottomBorder": "Apakšējais rāmis",
  "noBorders": "Bez rāmja",
  "reset": "Atiestatīt krāsu",
  "customColor": "Pielāgota krāsa...",
  "apply": "Piemērot",
  "cancel": "Atcelt"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Piemērot",
  "save": "Saglabāt",
  "cancel": "Atcelt",
  "remove": "Noņemt",
  "retry": "Atkārtot",
  "revert": "Atgriezt",
  "okText": "Labi",
  "formatCellsDialog": {
    "title": "Formāts",
    "categories": {
      "number": "Skaitlis",
      "currency": "Valūta",
      "date": "Datums"
      }
  },
  "fontFamilyDialog": {
    "title": "Fonts"
  },
  "fontSizeDialog": {
    "title": "Fonta izmērs"
  },
  "bordersDialog": {
    "title": "Rāmji"
  },
  "alignmentDialog": {
    "title": "Līdzinājums",
    "buttons": {
     "justtifyLeft": "Līdzināt pa kreisi",
     "justifyCenter": "Centrēt",
     "justifyRight": "Līdzināt pa labi",
     "justifyFull": "Taisnot",
     "alignTop": "Novietot augšā",
     "alignMiddle": "Novietot vidū",
     "alignBottom": "Novietot apakšā"
    }
  },
  "mergeDialog": {
    "title": "Sapludināt šūnas",
    "buttons": {
      "mergeCells": "Sapludināt visu",
      "mergeHorizontally": "Sapludināt horizontāli",
      "mergeVertically": "Sapludināt vertikāli",
      "unmerge": "Noņemt šūnu sapludinājumu"
    }
  },
  "freezeDialog": {
    "title": "Iesaldēt rūtis",
    "buttons": {
      "freezePanes": "Iesaldēt rūtis",
      "freezeRows": "Iesaldēt rindas",
      "freezeColumns": "Iesaldēt kolonnas",
      "unfreeze": "Atsaldēt rūtis"
    }
  },
  "confirmationDialog": {
    "text": "Vai jūs esat pārliecināts, ka vēlaties noņemt šo lapu?",
    "title": "Lapas noņemšana"
  },
  "validationDialog": {
    "title": "Datu pārbaude",
    "hintMessage": "Lūdzu ievadiet korektu {0} vērtību {1}.",
    "hintTitle": "Pārbaude {0}",
    "criteria": {
      "any": "Jebkāda vērtību",
      "number": "Skaitlis",
      "text": "Teksts",
      "date": "Datums",
      "custom": "Pielāgota formula",
      "list": "Saraksts"
    },
    "comparers": {
      "greaterThan": "lielāks par",
      "lessThan": "mazāks par",
      "between": "starp",
      "notBetween": "nav starp",
      "equalTo": "vienāds ar",
      "notEqualTo": "nav vienāds ar",
      "greaterThanOrEqualTo": "lielāks par vai vienāds ar",
      "lessThanOrEqualTo": "mazāks par vai vienāds ar"
    },
    "comparerMessages": {
      "greaterThan": "lielāks par {0}",
      "lessThan": "mazāks par {0}",
      "between": "starp {0} un {1}",
      "notBetween": "nav starp {0} un {1}",
      "equalTo": "vienāds ar {0}",
      "notEqualTo": "nav vienāds ar {0}",
      "greaterThanOrEqualTo": "lielāks par vai vienāds ar {0}",
      "lessThanOrEqualTo": "mazāks par vai vienāds ar {0}",
      "custom": "kas apmierina formulu: {0}"
    },
    "labels": {
      "criteria": "Kritēriji",
      "comparer": "Salīdzinātājs",
      "min": "Mimimālais",
      "max": "Maksimālais",
      "value": "Vērtība",
      "start": "Sākums",
      "end": "Beigas",
      "onInvalidData": "Nederīgu datu gadījumā",
      "rejectInput": "Noraidīt ievadi",
      "showWarning": "Rādīt brīdinājumu",
      "showHint": "Rādīt mājienu",
      "hintTitle": "Mājiena virsraksts",
      "hintMessage": "Mājiena ziņojums",
      "ignoreBlank": "Ignorēt tukšumus"
    },
    "placeholders": {
      "typeTitle": "Tipa virsraksts",
      "typeMessage": "Tipa ziņojums"
    }
  },
  "exportAsDialog": {
    "title": "Eksportēt...",
    "labels": {
      "fileName": "Datnes nosaukums",
      "saveAsType": "Saglabāt ar tipu",
      "exportArea": "Eksportēt",
      "paperSize": "Papīra izmērs",
      "margins": "Apmales",
      "orientation": "Orientācija",
      "print": "Printēt",
      "guidelines": "Vadlīnijas",
      "center": "Centrā",
      "horizontally": "Horizontāli",
      "vertically": "Vertikāli"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nevar mainīt daļu no sapludinātas šūnas."
  },
  "useKeyboardDialog": {
    "title": "Kopēšana un ielīmēšana",
    "errorMessage": "Šīs darbības nevar tikt izsauktas caur izvēlni. Lūdzu tā vietā izmantojiet tastatūras saīsnes:",
    "labels": {
      "forCopy": "kopēšanai",
      "forCut": "izgriešanai",
      "forPaste": "ielīmēšanai"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Šī darbiba nevar tikt izpildīta ar vairākām atlasītām vienībām."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Kārtot diapazonā no A līdz Z",
  "sortDescending": "Kārtot diapazonā no Z līdz A",
  "filterByValue": "Filtrēt pēc vērtības",
  "filterByCondition": "Filtrēt pēc nosacījuma",
  "apply": "Piemērot",
  "search": "Meklēt",
  "addToCurrent": "Pievienot pašreizējai atlasei",
  "clear": "Notīrīt",
  "blanks": "(Tukšas vērtības)",
  "operatorNone": "Neviens",
  "and": "UN",
  "or": "VAI",
  "operators": {
    "string": {
      "contains": "Teksts satur",
      "doesnotcontain": "Teksts nesatur",
      "startswith": "Teksts sākass ar",
      "endswith": "Teksts beidzas ar"
    },
    "date": {
      "eq":  "Datums ir",
      "neq": "Datums nav",
      "lt":  "Datums ir pirms",
      "gt":  "Datums ir pēc"
    },
    "number": {
      "eq": "Ir vienāds ar",
      "neq": "Nav vienāds ar",
      "gte": "Ir lielāks par vai vienāds ar",
      "gt": "Ir lielāks par",
      "lte": "Ir mazāks par vai vienāds ar",
      "lt": "Ir mazāks par"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Atiestatīt krāsu",
  "customColor": "Pielāgota krāsa...",
  "apply": "Piemērot",
  "cancel": "Atcelt"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Pievienot kolonnu pa kreisi",
  "addColumnRight": "Pievienot kolonnu pa labi",
  "addRowAbove": "Pievienot rindu virs",
  "addRowBelow": "Pievienot rindu zem",
  "alignment": "Izkārtojums",
  "alignmentButtons": {
    "justtifyLeft": "Līdzināt pa kreisi",
    "justifyCenter": "Centrēt",
    "justifyRight": "Līdzināt pa labi",
    "justifyFull": "Taisnot",
    "alignTop": "Novietot augšā",
    "alignMiddle": "Novietot vidū",
    "alignBottom": "Novietot apakšā"
  },
  "backgroundColor": "Fona krāsa",
  "bold": "Treknraksts",
  "borders": "Rāmji",
  "colorPicker": {
    "reset": "Atiestatīt krāsu",
    "customColor": "Pielāgota krāsa..."
  },
  "copy": "Kopēt",
  "cut": "Izgriezt",
  "deleteColumn": "Dzēst kolonnu",
  "deleteRow": "Dzēst rindu",
  "excelImport": "Importēt no Excel...",
  "filter": "Filtrēt",
  "fontFamily": "Fonts",
  "fontSize": "Fonta izmērs",
  "format": "Pielāgots formāts...",
  "formatTypes": {
    "automatic": "Automātisks",
    "number": "Skaitlis",
    "percent": "Procenti",
    "financial": "Finanses",
    "currency": "Valūta",
    "date": "Datums",
    "time": "Laiks",
    "dateTime": "Datums un laiks",
    "duration": "Ilgums",
    "moreFormats": "Vairāk formāti..."
  },
  "formatDecreaseDecimal": "Samazināt decimāldaļu",
  "formatIncreaseDecimal": "Palielināt decimāldaļu",
  "freeze": "Iesaldēt rūtis",
  "freezeButtons": {
    "freezePanes": "Iesaldēt rūtis",
    "freezeRows": "Iesaldēt rindas",
    "freezeColumns": "Iesaldēt kolonnas",
    "unfreeze": "Atsaldēt rūtis"
  },
  "italic": "Slīpraksts",
  "merge": "Sapludināt šūnas",
  "mergeButtons": {
    "mergeCells": "Sapludināt visu",
    "mergeHorizontally": "Sapludināt horizontāli",
    "mergeVertically": "Sapludināt vertikāli",
    "unmerge": "Noņemt šūnu sapludinājumu"
  },
  "open": "Atvērt...",
  "paste": "Ielīmēt",
  "quickAccess": {
    "redo": "Atcelt",
    "undo": "Atsaukt"
  },
  "saveAs": "Saglabāt kā...",
  "sortAsc": "Kārtot augoši",
  "sortDesc": "Kārtot dilstoši",
  "sortButtons": {
    "sortSheetAsc": "Kārtot lapas no A līdz Z",
    "sortSheetDesc": "Kārtot lapas no Z līdz A",
    "sortRangeAsc": "Kārtot diapazonā no A līdz Z",
    "sortRangeDesc": "Kārtot diapazonā no Z līdz A"
  },
  "textColor": "Teksta krāsa",
  "textWrap": "Aplauzt tekstu",
  "underline": "Pasvītrojums",
  "validation": "Datu pārbaude..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Nevar ievietot šūnas, jo pastāv iespēja pazaudēt datus. Izvēlieties citu ievietošanas vietu vai izdzēsiet datus no izklājlapas beigām.",
    "filterRangeContainingMerges": "Nevar izveidot filtru diapazonā, kas satur sapludinātas šūnas",
    "validationError": "Vērtība, ko jūs ievadījāt, pārkāpj validācijas noteikumus, kas uzstādīti šūnai."
  },
  "tabs": {
    "home": "Sākums",
    "insert": "Ievietot",
    "data": "Dati"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Palielināt",
  "decreaseButtonTitle": "Samazinat"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Dzēst",
    "moveUp": "Pārvietot augstāk",
    "moveDown": "Pārvietot zemāk",
    "transferTo": "Pārsūtīt uz",
    "transferFrom": "Pārsūtīt no",
    "transferAllTo": "Pārsūtīt visu uz",
    "transferAllFrom": "Pārsūtīt visu no"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Nav ierakstu, ko parādīt",
  "loading": "Ielādē...",
  "requestFailed": "Pieprasījums neizdevās.",
  "retry": "Atkārtot",
  "commands": {
      "edit": "Labot",
      "update": "Atjaunināt",
      "canceledit": "Atcelt",
      "create": "Pievienot jaunu ierakstu",
      "createchild": "Pievienot bērna ierakstu",
      "destroy": "Dzēst",
      "excel": "Eksportēt uz Excel",
      "pdf": "Eksportēt uz PDF"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Ielādē...",
  "requestFailed": "Pieprasījums neizdevās.",
  "retry": "Atkārtot"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Atlasīt datnes...",
  "cancel": "Atcelt",
  "retry": "Atkārtot",
  "remove": "Noņemt",
  "clearSelectedFiles": "Notīrīt",
  "uploadSelectedFiles": "Augšupielādēt datnes",
  "dropFilesHere": "Nometiet datnes šeit, lai tās augšupielādētu",
  "statusUploading": "notiek augšupielāde",
  "statusUploaded": "augšupielādēts",
  "statusWarning": "brīdinājums",
  "statusFailed": "neizdevās",
  "headerStatusUploading": "Augšupielādē...",
  "headerStatusUploaded": "Pabeigts",
  "invalidMaxFileSize": "Datnes izmērs ir pārāk liels.",
  "invalidMinFileSize": "Datnes izmērs ir pārāk mazs.",
  "invalidFileExtension": "Datnes tips nav atļauts."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} ir obligāts",
  "pattern": "{0} nav darīgs",
  "min": "{0} vajadzetu būt lielākam par vai vienādam ar {1}",
  "max": "{0} vajadzētu būt mazākam par vai vienādam ar {1}",
  "step": "{0} nav derīgs",
  "email": "{0} nav derīgs e-pasts",
  "url": "{0} nav derīgs URL",
  "date": "{0} nav derīgs datums",
  "dateCompare": "Beigu datumam vajadzētu būt lielākam par vai vienādam ar sākuma datumu"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Ielādē..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Aizvērt"
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
  "okText": "Labi"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "Labi",
  "cancel": "Atcelt"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "Labi",
  "cancel": "Atcelt"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "gads",
      "month": "mēnesis",
      "day": "diena",
      "weekday": "nedēļas diena",
      "hour": "stundas",
      "minute": "minūtes",
      "second": "sekundes",
      "dayperiod": "AM/PM"
    });
}

})(window.kendo.jQuery);
