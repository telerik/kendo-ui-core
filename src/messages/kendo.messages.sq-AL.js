/**
 * Kendo UI v2017.3.1026 (http://www.telerik.com/kendo-ui)
 * Copyright 2017 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.


*/

(function($, undefined) {

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Apliko",
  "cancel": "Anulo",
  "noColor": "pa ngjyrë",
  "clearColor": "Pastro ngjyrën"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Apliko",
  "cancel": "Anulo",
  "noColor": "pa ngjyrë",
  "clearColor": "Pastro ngjyrën"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Rendit duke rritur vlerën",
  "sortDescending": "Rendit duke e zvogëluar vlerën",
  "filter": "Filtro",
  "columns": "Kolona",
  "done": "Përfundo",
  "settings": "Cilësimet e kolonës",
  "lock": "Mbylle",
  "unlock": "Hape"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Bold",
  "italic": "Italic",
  "underline": "Nënvizë",
  "strikethrough": "I mesvijëzuar",
  "superscript": "Superscript",
  "subscript": "Nënscript",
  "justifyCenter": "Teksti në qendër",
  "justifyLeft": "Radhit tekstin majtas",
  "justifyRight": "Radhit tekstin djathtas",
  "justifyFull": "Justifiko",
  "insertUnorderedList": "Vendosni listë të pa renditur",
  "insertOrderedList": "Vendosni listë të renditur",
  "indent": "Porosit",
  "outdent": "Nxjerrje",
  "createLink": "Vendosi hyperlink",
  "unlink": "Fshini hyperlink",
  "insertImage": "Vendosni fotografi",
  "insertFile": "Vendosni fajl",
  "insertHtml": "Vendosni HTML",
  "viewHtml": "Shiko HTML",
  "fontName": "Zgjedh llojin e shkronjave",
  "fontNameInherit": "(font i trashëguar)",
  "fontSize": "Zgjedh madhësinë e fontit",
  "fontSizeInherit": "(madhësi e trashëguar)",
  "formatBlock": "Formati",
  "formatting": "Formati",
  "foreColor": "Ngjyra",
  "backColor": "Ngjyra e prapavisë",
  "style": "Stilet",
  "emptyFolder": "Folder i zbrazët",
  "uploadFile": "Ngarko",
  "overflowAnchor": "Më shumë vegla",
  "orderBy": "Organizoni nga:",
  "orderBySize": "Madhësia",
  "orderByName": "Emri",
  "invalidFileType": "Fajli i zgjedhur \"{0}\" nuk është i vlefshëm. Llojet e fajleve të mbështetur janë {1}.",
  "deleteFile": 'Jeni të sigurtë që doni të fshini "{0}"?',
  "overwriteFile": 'Fajli me emrin "{0}" tashmë ekziston në dosjen aktuale. Dëshironi ta mbishkruani?',
  "directoryNotFound": "Dosje me këtë emër nuk është gjetur.",
  "imageWebAddress": "Web adresa",
  "imageAltText": "Tekst tjetër",
  "imageWidth": "Gjërësia (px)",
  "imageHeight": "Lartësia (px)",
  "fileWebAddress": "Web adresa",
  "fileTitle": "Titulli",
  "linkWebAddress": "Web adresa",
  "linkText": "Teksti",
  "linkToolTip": "Ndihmesë",
  "linkOpenInNewWindow": "Hape linkun në dritare të re",
  "dialogUpdate": "Përditëso",
  "dialogInsert": "Vendos",
  "dialogButtonSeparator": "ose",
  "dialogCancel": "Anulo",
  "cleanFormatting": "Pastro formatin",
  "createTable": "Krijo tabelë",
  "addColumnLeft": "Shto kolonë në të majtë",
  "addColumnRight": "Shto kolonë në të djathtë",
  "addRowAbove": "Shto rresht lartë",
  "addRowBelow": "Shto rresht poshtë",
  "deleteRow": "Fshij reshtin",
  "deleteColumn": "Fshij kolonën",
  "dialogOk": "Ok",
  "tableWizard": "Tabela Wizard",
  "tableTab": "Tabela",
  "cellTab": "Qelizë",
  "accessibilityTab": "Qasja",
  "caption": "Titulli",
  "summary": "Përmledhja",
  "width": "Gjërësia",
  "height": "Lartësia",
  "units": "Njësitë",
  "cellSpacing": "Ndarja e qelizës",
  "cellPadding": "Mbushja e qelizave",
  "cellMargin": "Margjina e qelizës",
  "alignment": "Radhitja",
  "background": "Prapavia",
  "cssClass": "CSS Klasa",
  "id": "ID",
  "border": "Kufiri",
  "borderStyle": "Stili i Kufirit",
  "collapseBorders": "Mbylli kufijtë",
  "wrapText": "Përfundo tekstin",
  "associateCellsWithHeaders": "Ndërlidhni qelizat me titujt",
  "alignLeft": "Radhit majtas",
  "alignCenter": "Radhit në mes",
  "alignRight": "Radhit djathtas",
  "alignLeftTop": "Radhit majtas lartë",
  "alignCenterTop": "Radhit në mes lartë",
  "alignRightTop": "Radhit djathtas lartë",
  "alignLeftMiddle": "Radhit majtas në mes",
  "alignCenterMiddle": "Radhit në mes në mes",
  "alignRightMiddle": "Radhit djathtas në mes",
  "alignLeftBottom": "Radhit majtas poshtë",
  "alignCenterBottom": "Radhit në mes poshtë",
  "alignRightBottom": "Radhit djathtas poshtë",
  "alignRemove": "Fshij Radhitjen",
  "columns": "Kolonat",
  "rows": "Rreshtat",
  "selectAllCells": "Zgjedh të gjitha qelizat"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Ngarko",
  "orderBy": "Organizoni nga",
  "orderByName": "Emri",
  "orderBySize": "Madhësia",
  "directoryNotFound": "Një dosje me këtë emër nuk u gjet.",
  "emptyFolder": "Folder i zbrazët",
  "deleteFile": 'Jeni të sigurt se doni të fshini "{0}"?',
  "invalidFileType": "Fajli i selektuar \"{0}\" nuk është i vlefshëm. Llojet e fajleve të mbështetur janë {1}.",
  "overwriteFile": "Fajli me emrin \"{0}\" tashmë ekziston në dosjen aktuale. Dëshironi t'a mbishkruani?",
  "dropFilesHere": "lëshoni fajlet këtu për t'i ngarkuar",
  "search": "Kërko"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "është e vërtetë",
  "isFalse": "është e pavërtetë",
  "filter": "Filtro",
  "clear": "Pastro",
  "operator": "Operator"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "startswith": "Fillon me",
    "contains": "Përmban",
    "doesnotcontain": "Nuk përmban",
    "endswith": "Përfundon me",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero",
    "isempty": "Është e zbrazët",
    "isnotempty": "Nuk është e zbrazët"
  },
  "number": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "gte": "Është më e madhe ose e barabartë me",
    "gt": "Është më e madhe se",
    "lte": "Është më e vogël ose e barabartë me",
    "lt": "Është me e vogël se",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  },
  "date": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "gte": "Është pas ose e barabartë me",
    "gt": "Është pas",
    "lte": "Është para ose e barabartë me",
    "lt": "Është para",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  },
  "enums": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Trego artikujt me vlerë që:",
  "title": "Trego artikujt me vlerë që",
  "isTrue": "është e vërtetë",
  "isFalse": "është e pavërtetë",
  "filter": "Filtro",
  "clear": "Pastro",
  "and": "Dhe",
  "or": "Ose",
  "selectValue": "-Zgjidhni vlerën-",
  "operator": "Operatori",
  "value": "Vlera",
  "cancel": "Anulo"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "startswith": "Fillon me",
    "contains": "Përmban",
    "doesnotcontain": "Nuk përmban",
    "endswith": "Përfundon me",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero",
    "isempty": "Është e zbrazët",
    "isnotempty": "Nuk është e zbrazët"
  },
  "number": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "gte": "Është më e madhe ose e barabartë me",
    "gt": "Është më e madhe se",
    "lte": "Është më e vogël ose e barabartë me",
    "lt": "Është më e vogël se",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  },
  "date": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "gte": "Is after or equal to",
    "gt": "Is after",
    "lte": "Is before or equal to",
    "lt": "Is before",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  },
  "enums": {
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me",
    "isnull": "Është zero",
    "isnotnull": "Nuk është zero"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Selekto të gjitha",
  "clear": "Pastro",
  "filter": "Filtro",
  "search": "Kërko"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Shto fëmijë",
    "append": "Shto detyrë",
    "insertAfter": "Shto poshtë",
    "insertBefore": "Shto lartë",
    "pdf": "Eksporto në PDF"
  },
  "cancel": "Anulo",
  "deleteDependencyWindowTitle": "Fshij varësinë",
  "deleteTaskWindowTitle": "Fshij detyrën",
  "destroy": "Fshij",
  "editor": {
    "assingButton": "Cakto",
    "editorTitle": "Detyrë",
    "end": "Përfundo",
    "percentComplete": "Kompleto",
    "resources": "Burimet",
    "resourcesEditorTitle": "Burimet",
    "resourcesHeader": "Burimet",
    "start": "Filo",
    "title": "Titulli",
    "unitsHeader": "Njësitë"
  },
  "save": "Ruaj",
  "views": {
    "day": "Dita",
    "end": "Përfundo",
    "month": "Muaji",
    "start": "Fillo",
    "week": "Java",
    "year": "Viti"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Anulo ndryshimet",
    "canceledit": "Anulo",
    "create": "Shto të dhënë të re",
    "destroy": "Fshij",
    "edit": "Redakto",
    "excel": "Eksporto në Excel",
    "pdf": "Eksporto në PDF",
    "save": "Ruaj ndryshimet",
    "select": "Zgjedh",
    "update": "Përditëso"
  },
  "editable": {
    "cancelDelete": "Anulo",
    "confirmation": "Je i sigurt që dëshiron ta fshish këtë të dhënë?",
    "confirmDelete": "Fshij"
  },
  "noRecords": "Nuk ka të dhëna në dispozicion.",
  "expandCollapseColumnHeader": ""
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Nuk ka të dhëna për të shfaqur",
    "loading": "Duke ngarkuar...",
    "requestFailed": "Kërkesa dështoi.",
    "retry": "Provo sërish",
    "commands": {
        "edit": "Redakto",
        "update": "Përditëso",
        "canceledit": "Anulo",
        "create": "Shto të dhënë të re",
        "createchild": "Shto të dhënë fëmijë",
        "destroy": "Fshij",
        "excel": "Eksporto në Excel",
        "pdf": "Eksporto në PDF"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Tërheq titullin e kolonës dhe lësho atë këtu për të grupuar nga ajo kolonë"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Rrit vlerën",
  "downArrowText": "Zvogëlo vlerën"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pauzo",
  "play": "Luaj",
  "mute": "Pa zë",
  "unmute": "Aktivizo zërin",
  "quality": "Kualiteti",
  "fullscreen": "Ekran i plotë"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Të gjitha",
  "display": "{0} - {1} prej {2} artikujve",
  "empty": "Nuk ka artikuj për të shfaqur",
  "page": "Faqe",
  "of": "of {0}",
  "itemsPerPage": "artikuj për faqe",
  "first": "Shkoni në faqen e parë",
  "previous": "Shkoni në faqen e mëparshme",
  "next": "Shkoni në faqen e ardhshme",
  "last": "Shkoni në faqen e fundit",
  "refresh": "Rifresko",
  "morePages": "Më shumë faqe"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Të gjitha",
  "display": "{0} - {1} prej {2} artikujve",
  "empty": "Nuk ka artikuj për të shfaqur",
  "page": "Faqe",
  "of": "of {0}",
  "itemsPerPage": "artikuj për faqe",
  "first": "Shkoni në faqen e parë",
  "previous": "Shkoni në faqen e mëparshme",
  "next": "Shkoni në faqen e ardhshme",
  "last": "Shkoni në faqen e fundit",
  "refresh": "Rifresko",
  "morePages": "Më shumë faqe"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Lësho fushat me të dhëna këtu",
  "columnFields": "Lësho fushat e kolonave këtu",
  "rowFields": "Lësho fushat e reshtave këtu"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Trego artikujt me vlerat të cilat:",
  "filterFields": "Filtri i fushave",
  "filter": "Filtro",
  "include": "Përfshij Fushat...",
  "title": "Fushat për t'i përfshirë",
  "clear": "Pastro",
  "ok": "Ok",
  "cancel": "Anulo",
  "operators": {
    "contains": "Përmbanë",
    "doesnotcontain": "Nuk përmbanë",
    "startswith": "Fillon me",
    "endswith": "Përfundon me",
    "eq": "Është e barabartë me",
    "neq": "Nuk është e barabartë me"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Asnjëherë",
    "hourly": "Çdo orë",
    "daily": "Çdo ditë",
    "weekly": "Çdo javë",
    "monthly": "Çdo muaj",
    "yearly": "Çdo vit"
  },
  "hourly": {
    "repeatEvery": "Përsëriteni çdo: ",
    "interval": " orë"
  },
  "daily": {
    "repeatEvery": "Përsëriteni çdo: ",
    "interval": " ditë"
  },
  "weekly": {
    "interval": " javë",
    "repeatEvery": "Përsëriteni çdo: ",
    "repeatOn": "Përsëriteni në: "
  },
  "monthly": {
    "repeatEvery": "Përsëriteni çdo: ",
    "repeatOn": "Përsëriteni në: ",
    "interval": " muaj",
    "day": "Ditë "
  },
  "yearly": {
    "repeatEvery": "Përsëriteni çdo: ",
    "repeatOn": "Përsëriteni në: ",
    "interval": " vit",
    "of": " të "
  },
  "end": {
    "label": "Përfundoj:",
    "mobileLabel": "Pëfundon",
    "never": "Asnjëherë",
    "after": "Pas ",
    "occurrence": " dukuri(të)",
    "on": "Në "
  },
  "offsetPositions": {
    "first": "e para",
    "second": "e dyta",
    "third": "e treta",
    "fourth": "e katërta",
    "last": "e fundit"
  },
  "weekdays": {
    "day": "ditë",
    "weekday": "ditë jave",
    "weekend": "ditë e fundjavës"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "tërë ditën",
  "date": "Data",
  "event": "Ngjarje",
  "time": "Koha",
  "showFullDay": "Trego ditën e plotë",
  "showWorkDay": "Trego orët e biznesit",
  "today": "Sot",
  "save": "Ruaj",
  "cancel": "Anulo",
  "destroy": "Fshij",
  "deleteWindowTitle": "Fshij ngjarjen",
  "ariaSlotLabel": "Zgjedhur prej {0:t} deri {1:t}",
  "ariaEventLabel": "{0} në {1:D} me {2:t}",
  "editable": {
    "confirmation": "Je i sigurt që dëshiron ta fshish këtë ngjarje?"
  },
  "views": {
    "day": "Ditë",
    "week": "Javë",
    "workWeek": "Javë punuese",
    "agenda": "Rendi ditës",
    "month": "Muaj"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Fshije artikullin e përsëritur",
    "deleteWindowOccurrence": "Fshije dukurin e tanishme",
    "deleteWindowSeries": "Fshini serinë",
    "editWindowTitle": "Redakto artikullin e përsëritur",
    "editWindowOccurrence": "Redakto dukurin e tanishme",
    "editWindowSeries": "Redakto serinë",
    "deleteRecurring": "Doni të fshini vetëm këtë dukuri apo të gjithë serinë?",
    "editRecurring": "Doni të redaktoni vetëm këtë dukuri apo të gjithë serinë?"
  },
  "editor": {
    "title": "Titulli",
    "start": "Fillimi",
    "end": "Përfundimi",
    "allDayEvent": "Ngjarja gjithë ditës",
    "description": "Përshkrimi",
    "repeat": "Përsërit",
    "timezone": " ",
    "startTimezone": "Fillo zonën kohore",
    "endTimezone": "Përfundo zonën kohore",
    "separateTimezones": "Përdorni zona të ndara kohore të fillimit dhe përfundimit",
    "timezoneEditorTitle": "Zonat kohore",
    "timezoneEditorButton": "Zona kohore",
    "timezoneTitle": "Zonat kohore",
    "noTimezone": "Nuk ka zonë kohore",
    "editorTitle": "Ngjarje"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Të gjitha kufijtë",
  "insideBorders": "Kufijtë e brendshëm",
  "insideHorizontalBorders": "Kufijtë e brendshëm horizontal",
  "insideVerticalBorders": "Kufijtë e brendshëm vertikal",
  "outsideBorders": "Kufijtë e jashtme",
  "leftBorder": "Kufiri i majtë",
  "topBorder": "Kufiri lartë",
  "rightBorder": "Kufiri i djathtë",
  "bottomBorder": "Kufiri poshtë",
  "noBorders": "Pa kufi",
  "reset": "Rivendosni ngjyrën",
  "customColor": "Ngjyra e personalizuar...",
  "apply": "Apliko",
  "cancel": "Anulo"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Apliko",
  "save": "Ruaj",
  "cancel": "Anulo",
  "remove": "Fshije",
  "retry": "Provo sërish",
  "revert": "Ktheni",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formato",
    "categories": {
      "number": "Numri",
      "currency": "Valuta",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Fonti"
  },
  "fontSizeDialog": {
    "title": "Madhësia e fontit"
  },
  "bordersDialog": {
    "title": "Kufijtë"
  },
  "alignmentDialog": {
    "title": "Radhitja",
    "buttons": {
     "justifyLeft": "Radhit majtas",
     "justifyCenter": "Qendër",
     "justifyRight": "Radhit djathtas",
     "justifyFull": "Justifiko",
     "alignTop": "Radhit lartë",
     "alignMiddle": "Radhit në mes",
     "alignBottom": "Radhit poshtë"
    }
  },
  "mergeDialog": {
    "title": "Bashko qelizat",
    "buttons": {
      "mergeCells": "Bashko të gjitha",
      "mergeHorizontally": "Bashko horizontalisht",
      "mergeVertically": "Bashko vertikalisht",
      "unmerge": "Mos bashko"
    }
  },
  "freezeDialog": {
    "title": "Ngrirje e panelëve",
    "buttons": {
      "freezePanes": "Ngrirje e panelëve",
      "freezeRows": "Ngrirje e rreshtave",
      "freezeColumns": "Ngrirje e kolonave",
      "unfreeze": "Zbllokim i panelëve"
    }
  },
  "confirmationDialog": {
    "text": "Je i sigurt që dëshiron ta heqësh këtë fletë?",
    "title": "Heq fletën"
  },
  "validationDialog": {
    "title": "Vlefshmëria e të dhënave",
    "hintMessage": "Ju lutemi vendosni të vlefshme {0} vlerën {1}.",
    "hintTitle": "Vlefshmëria {0}",
    "criteria": {
      "any": "Çdo vlerë",
      "number": "Numri",
      "text": "Teksti",
      "date": "Data",
      "custom": "Formula e personalizuar",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "më e madhe se",
      "lessThan": "më e vogël se",
      "between": "ndërmjet",
      "notBetween": "jo ndërmjet",
      "equalTo": "e barabartë me",
      "notEqualTo": "jo e barabartë me",
      "greaterThanOrEqualTo": "më e madhe ose e barabartë me",
      "lessThanOrEqualTo": "më e vogël ose e barabartë me"
    },
    "comparerMessages": {
      "greaterThan": "më e madhe se {0}",
      "lessThan": "më e vogël se {0}",
      "between": "ndërmjet {0} dhe {1}",
      "notBetween": "jo ndërmjet {0} dhe {1}",
      "equalTo": "e barabartë me {0}",
      "notEqualTo": "jo e barabartë me {0}",
      "greaterThanOrEqualTo": "më e madhe ose e barabartë me {0}",
      "lessThanOrEqualTo": "më e vogël ose e barabartë me {0}",
      "custom": "kjo plotëson formulën: {0}"
    },
    "labels": {
      "criteria": "Kriteri",
      "comparer": "Krahasimi",
      "min": "Min",
      "max": "Max",
      "value": "Vlera",
      "start": "Fillo",
      "end": "Përfundo",
      "onInvalidData": "Për të dhënat e pavlefshme",
      "rejectInput": "Refuzo hyrjen",
      "showWarning": "Trego paralajmërim",
      "showHint": "Trego ndihmë",
      "hintTitle": "Titulli ndihmës",
      "hintMessage": "Porosia ndihmëse",
      "ignoreBlank": "Refuzo bosh"
    },
    "placeholders": {
      "typeTitle": "Shëno titullin",
      "typeMessage": "Shëno porosinë"
    }
  },
  "exportAsDialog": {
    "title": "Eksporto...",
    "labels": {
      "fileName": "Emri i fajlit",
      "saveAsType": "Ruaj si tip",
      "exportArea": "Eksporto",
      "paperSize": "Madhësia e letrës",
      "margins": "Mbulesat",
      "orientation": "Orientimi",
      "print": "Printo",
      "guidelines": "udhëzime",
      "center": "Qendër",
      "horizontally": "Horizontalisht",
      "vertically": "Vertikalisht"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nuk mund të ndryshojë pjesë të një qelize të bashkuar."
  },
  "useKeyboardDialog": {
    "title": "Kopjimi dhe ngjitja",
    "errorMessage": "Këto veprime nuk mund të thirren përmes menusë. Ju lutemi përdorni shkurtesat e tastierës në vend:",
    "labels": {
      "forCopy": "për kopjim",
      "forCut": "për prerje",
      "forPaste": "për ngjitje"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Ky veprim nuk mund të kryhet në përzgjedhje të shumëfishtë."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Rendit vargjet prej A te Z",
  "sortDescending": "Rendit vargjet prej Z te A",
  "filterByValue": "Filtro sipas vlerës",
  "filterByCondition": "Filtro sipas kushteve",
  "apply": "Apliko",
  "search": "Kërko",
  "addToCurrent": "Shtoni në përzgjedhjen aktuale",
  "clear": "Pastro",
  "blanks": "(Boshllëqe)",
  "operatorNone": "Asnjë",
  "and": "DHE",
  "or": "OSE",
  "operators": {
    "string": {
      "contains": "Teksti përmban",
      "doesnotcontain": "Teksti nuk përmban",
      "startswith": "Teksti fillon me",
      "endswith": "Teksti përfundon me"
    },
    "date": {
      "eq": "Data është",
      "neq": "Data nuk është",
      "lt": "Data është para",
      "gt": "Data është pas"
    },
    "number": {
      "eq": "Është e barabartë me",
      "neq": "Nuk është e barabartë me",
      "gte": "Është më e madhe ose e barabartë me",
      "gt": "Është më e madhe se",
      "lte": "Është më e vogël ose e barabartë me",
      "lt": "Është më e vogël se"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Rivendosni ngjyrën",
  "customColor": "Ngjyra e personalizuar...",
  "apply": "Apliko",
  "cancel": "Anulo"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Shto kolonë majtas",
  "addColumnRight": "Shto kolonë djathtas",
  "addRowAbove": "Shto rresht lartë",
  "addRowBelow": "Shto rresht poshtë",
  "alignment": "Radhitja",
  "alignmentButtons": {
    "justifyLeft": "Radhit majtas",
    "justifyCenter": "Qendër",
    "justifyRight": "Radhit djathtas",
    "justifyFull": "Justifiko",
    "alignTop": "Radhit lartë",
    "alignMiddle": "Radhit në mes",
    "alignBottom": "Radhit poshtë"
  },
  "backgroundColor": "Prapavia",
  "bold": "Bold",
  "borders": "Kufijtë",
  "colorPicker": {
    "reset": "Rivendosni ngjyrë",
    "customColor": "Ngjyra e personalizuar..."
  },
  "copy": "Kopjo",
  "cut": "Prej",
  "deleteColumn": "Fshij kolonën",
  "deleteRow": "Fshij rreshtin",
  "excelImport": "Import prej Excel...",
  "filter": "Filtro",
  "fontFamily": "Fonti",
  "fontSize": "Madhësia e fontit",
  "format": "Formati i personalizuar...",
  "formatTypes": {
    "automatic": "Automatik",
    "number": "Numri",
    "percent": "Perqindja",
    "financial": "Financiar",
    "currency": "Valuta",
    "date": "Data",
    "time": "Koha",
    "dateTime": "Data koha",
    "duration": "Kohëzgjatja",
    "moreFormats": "Më shumë formate..."
  },
  "formatDecreaseDecimal": "Zbrit decimalin",
  "formatIncreaseDecimal": "Ngrit decimalin",
  "freeze": "Ngrirje e panelëve",
  "freezeButtons": {
    "freezePanes": "Ngrirje e panelëve",
    "freezeRows": "Ngrirje e rreshtave",
    "freezeColumns": "Ngrirje e kolonave",
    "unfreeze": "Zbllokim i panelëve"
  },
  "italic": "Italic",
  "merge": "Bashko qelizat",
  "mergeButtons": {
    "mergeCells": "Bashko të gjitha",
    "mergeHorizontally": "Bashko horizontalisht",
    "mergeVertically": "Bashko vertikalisht",
    "unmerge": "Mos bashko"
  },
  "open": "Hape...",
  "paste": "Ngjite",
  "quickAccess": {
    "redo": "Ribëj",
    "undo": "Kthe"
  },
  "saveAs": "Ruaj si...",
  "sortAsc": "Sorto (rritëse)",
  "sortDesc": "Sorto (rrënëse)",
  "sortButtons": {
    "sortSheetAsc": "Sorto faqen prej A te Z",
    "sortSheetDesc": "Sorto faqen prej Z te A",
    "sortRangeAsc": "Sorto vargun prej A te Z",
    "sortRangeDesc": "Sorto vargun prej Z te A"
  },
  "textColor": "Ngjyra e tekstit",
  "textWrap": "Përfundo tekstin",
  "underline": "Nënvizë",
  "validation": "Vlefshmëria e të dhënave..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Nuk mund të futen qeliza për shkak të humbjes së të dhënave. Përzgjidhni një lokacion tjetër ose fshini të dhënat nga fundi i fletës.",
    "filterRangeContainingMerges": "Nuk mund të krijojë një filtër brenda një vargu që përmban shkrirje",
    "validationError": "Vlera që keni futur shkel rregullat e validimit të vendosura në qelizë."
  },
  "tabs": {
    "home": "Ballina",
    "insert": "Vendos",
    "data": "Të dhëna"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Ngrit",
  "decreaseButtonTitle": "Zbrit"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Fshij",
    "moveUp": "Zhvendos lartë",
    "moveDown": "Zhvendos poshtë",
    "transferTo": "Transfero Në",
    "transferFrom": "Transfero Prej",
    "transferAllTo": "Transfero Të Gjitha Në",
    "transferAllFrom": "Transfero Të Gjitha Prej"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Nuk ka të dhëna për tu shfaqur",
  "loading": "Duke ngarkuar...",
  "requestFailed": "Kërkesa dështoi.",
  "retry": "Provo sërish",
  "commands": {
      "edit": "redaktoni",
      "update": "Përditëso",
      "canceledit": "Anulo",
      "create": "Shto të dhënë të re",
      "createchild": "Shto të dhënë fëmijë",
      "destroy": "Fshij",
      "excel": "Eksporto në Excel",
      "pdf": "Exporto në PDF"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Duke ngarkuar...",
  "requestFailed": "Kërkesa dështoi.",
  "retry": "Provo sërish"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Zgjedh fajlet...",
  "cancel": "Anulo",
  "retry": "Provo sërish",
  "remove": "Fshij",
  "clearSelectedFiles": "Pastro",
  "uploadSelectedFiles": "Ngarko fajlet",
  "dropFilesHere": "lëshoni fajlet këtu për t'i ngarkuar",
  "statusUploading": "duke ngarkuar",
  "statusUploaded": "e ngarkuar",
  "statusWarning": "paralajmërim",
  "statusFailed": "dështoi",
  "headerStatusUploading": "Duke ngarkuar...",
  "headerStatusUploaded": "Përfundo",
  "invalidMaxFileSize": "Madhësia e fajlit është shumë e madhe.",
  "invalidMinFileSize": "Madhësia e fajlit është shumë e vogël.",
  "invalidFileExtension": "Lloji i fajlit nuk lejohet."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} nevojitet",
  "pattern": "{0} nuk është e vlefshme",
  "min": "{0} duhet të jetë më e madhe ose e barabartë me {1}",
  "max": "{0} duhet të jetë më e vogël ose e barabartë me {1}",
  "step": "{0} nuk është e vlefshme",
  "email": "{0} emaili nuk është i vlefshëm",
  "url": "{0} URL-ja nuk është e vlefshme",
  "date": "{0} data nuk është e vlefshme",
  "dateCompare": "Data e përfundimit duhet të jetë më e madhe ose e barabartë me datën e fillimit"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Duke ngarkuar..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Mbylle"
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
  "cancel": "Anulo"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Anulo"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "viti",
      "month": "muaji",
      "day": "dita",
      "weekday": "dita e javës",
      "hour": "orët",
      "minute": "minutat",
      "second": "sekondat",
      "dayperiod": "AM/PM"
    });
}

})(window.kendo.jQuery);