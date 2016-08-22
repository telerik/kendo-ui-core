(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Potvrdit",
  "cancel": "Zrušit"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Potvrdit",
  "cancel": "Zrušit"
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
  "styles": "Styly",
  "emptyFolder": "Prázný adresář",
  "uploadFile": "Nahrát",
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
  "createTable": "Vložit tabulku",
  "addColumnLeft": "Přidat sloupec vlevo",
  "addColumnRight": "Přidat sloupec vpravo",
  "addRowAbove": "Přidat řádek nad",
  "addRowBelow": "Přidat řádek pod",
  "deleteRow": "Smazat řádek",
  "deleteColumn": "Smazat soupec"
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

/* Filter cell operators */

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
    "isnotempty": "Není prázdná"
  },
  "date": {
    "eq": "Je rovno",
    "neq": "Je různá od",
    "gt": "Začíná po",
    "gte": "Začíná od",
    "lt": "Končí po",
    "lte": "Končí do",
    "isnull": "Je null",
    "isnotnull": "Není null"
  },
  "number": {
    "eq": "Je rovno",
    "gt": "Je větší než",
    "gte": "Je větší nebo rovno",
    "lt": "Je menší než",
    "lte": "Je menší nebo rovno",
    "neq": "Je různá od",
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
  "and": "A zároveň",
  "clear": "Zrušit",
  "filter": "Filtrovat",
  "info": "Zobrazit položky s hodnotou, která:",
  "isFalse": "není pravda",
  "isTrue": "je pravda",
  "or": "Nebo",
  "selectValue": "-Vyberte hodnotu-",
  "cancel": "Zrušit",
  "operator": "Operátor",
  "value": "Hodnota"
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Je rovno",
    "gt": "Začíná po",
    "gte": "Začíná od",
    "lt": "Končí po",
    "lte": "Končí do",
    "neq": "Je různá od"
  },
  "number": {
    "eq": "Je rovno",
    "gt": "Je větší než",
    "gte": "Je větší nebo rovno",
    "lt": "Je menší než",
    "lte": "Je menší nebo rovno",
    "neq": "Je různá od"
  },
  "string": {
    "contains": "Obsahuje",
    "doesnotcontain": "Neobsahuje",
    "endswith": "Končí na",
    "eq": "Je shodná s",
    "neq": "Je různá od",
    "startswith": "Začíná na"
  },
  "enums": {
    "eq": "Je rovno",
    "neq": "Je různá od"
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
    "confirmation": "Opravdu chcete smazat tento záznam?",
    "cancelDelete": "Zrušit",
    "confirmDelete": "Smazat"
  },
  "noRecords": "Žádný záznam nenalezen."
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

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} z {2} celkem",
  "empty": "Žádný záznam nenalezen",
  "first": "Na první stránku",
  "itemsPerPage": "záznamů na stránku",
  "last": "Na poslední stránku",
  "next": "Na další stránku",
  "of": "z {0}",
  "page": "Strana",
  "previous": "Na předchozí stránku",
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
    "daily": "Denně",
    "monthly": "Měsíčně",
    "never": "Nikdy",
    "weekly": "Týdně",
    "yearly": "Ročně"
  },
  "hourly": {
    "repeatEvery": "Opakovat každých: ",
    "interval": " hodin"
  },
  "daily": {
    "interval": "dní",
    "repeatEvery": "Opakovat každý:"
  },
  "weekly": {
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "týden(ny)"
  },
  "monthly": {
    "day": "Den",
    "interval": "měsíc(e)",
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:"
  },
  "yearly": {
    "of": "",
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "rok(y)"
  },
  "end": {
    "after": "Konec po",
    "occurrence": "opakování",
    "label": "Konec:",
    "never": "Nikdy",
    "on": "Dne",
    "mobileLabel": "Končí"
  },
  "offsetPositions": {
    "first": "první",
    "fourth": "čtvrtý",
    "last": "poslední",
    "second": "druhý",
    "third": "třetí"
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
  "cancel": "Zrušit",
  "save": "Uložit",
  "time": "Čas",
  "today": "Dnes",
  "date": "Datum",
  "destroy": "Smazat",
  "event": "Událost",
  "deleteWindowTitle": "Smazat událost",
  "showFullDay": "Zobrazit celý den",
  "showWorkDay": "Zobrazit pracovní dobu",
  "ariaSlotLabel": "Zvoleno od {0:t} do {1:t}",
  "ariaEventLabel": "{0} dne {1:D} v {2:t}",
  "editable": {
    "confirmation": "Opravdu chcete smazat tuto událost?"
  },
  "views": {
    "day": "Den",
    "week": "Týden",
    "workWeek": "Pracovní týden",
    "month": "Měsíc",
    "agenda": "Agenda"
  },
  "recurrenceMessages": {
    "deleteWindowOccurrence": "Smazat vybranou událost",
    "deleteWindowSeries": "Smazat vše",
    "deleteWindowTitle": "Smazat opakovanou událost",
    "editWindowOccurrence": "Upravit jen vybranou událost",
    "editWindowSeries": "Upravit vše",
    "editWindowTitle": "Upravit opakující se událost",
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

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Zvýšit",
  "decreaseButtonTitle": "Snížit"
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
  "uploadSelectedFiles": "Nahrát soubory",
  "dropFilesHere": "Pro nahrání přetáhněte soubory sem",
  "statusUploading": "nahrávám",
  "statusUploaded": "nahráno",
  "statusWarning": "varování",
  "statusFailed": "chyba",
  "headerStatusUploading": "Nahrávám...",
  "headerStatusUploaded": "Hotovo"
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

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization,{
  "close": "Zavřít"
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

})(window.kendo.jQuery);
