/*
* Kendo UI v2014.3.1316 (http://www.telerik.com/kendo-ui)
* Copyright 2015 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
(function(f, define){
    define([], f);
})(function(){

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
    "endswith": "Končí s"
  },
  "number": {
    "eq": "Rovná sa",
    "neq": "Nerovná sa",
    "gte": "Je väčšie alebo sa rovná",
    "gt": "Je väčšie ako",
    "lte": "Je menšie alebo sa rovná",
    "lt": "Je menšie ako"
  },
  "date": {
    "eq": "Je",
    "neq": "Nie je",
    "gte": "Nasleduje alebo je",
    "gt": "Nasleduje",
    "lte": "Predchádza alebo je",
    "lt": "Predchádza"
  },
  "enums": {
    "eq": "Je",
    "neq": "Nie je"
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
      "endswith": "Končí s"
  },
  "number": {
      "eq": "Rovná sa",
      "neq": "Nerovná sa",
      "gte": "Je väčšie alebo sa rovná",
      "gt": "Je väčšie ako",
      "lte": "Je menšie alebo sa rovná",
      "lt": "Je menšie ako"
  },
  "date": {
      "eq": "Je",
      "neq": "Nie je",
      "gte": "Nasleduje alebo je",
      "gt": "Nasleduje",
      "lte": "Predchádza alebo je",
      "lt": "Predchádza"
  },
  "enums": {
      "eq": "Je",
      "neq": "Nie je"
  }
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
    "save": "Uložiť zmeny",
    "select": "Vybrať",
    "update": "Uložiť"
  },
  "editable": {
    "cancelDelete": "Storno",
    "confirmation": "Naozaj chcete odstrániť tento záznam?",
    "confirmDelete": "Odstrániť"
  }
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
  "cancel": "Strono",
  "destroy": "Odstrániť",
  "deleteWindowTitle": "Odstránenie udalosti",
  "ariaSlotLabel": "Vybraté od {0:t} do {1:t}",
  "ariaEventLabel": "{0} dňa {1:D} o {2:t}",
  "confirmation": "Naozaj chcete odstrániť túto udalosť?",
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

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Zvýšiť",
  "decreaseButtonTitle": "Znížiť"
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
  "date": "{0} nie je platný dátum"
});
}


return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });