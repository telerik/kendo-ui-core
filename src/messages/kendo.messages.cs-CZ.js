

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Je rovno",
    "gt": "Začíná po",
    "gte": "Začáná od",
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
/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Je rovno",
    "gt": "Začíná po",
    "gte": "Začáná od",
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

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Sloupce",
  "sortAscending": "Roustoucí",
  "sortDescending": "Klesající",
  "settings": "Nastavení sloupců",
  "done": "Hotovo",
  "lock": "Zamknout",
  "unlock": "Odemknout"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "dní",
    "repeatEvery": "Opakovat každý:"
  },
  "end": {
    "after": "Konec po",
    "occurrence": "opakování",
    "label": "Konec:",
    "never": "Nikdy",
    "on": "Data",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Denně",
    "monthly": "Měsíčně",
    "never": "Nikdy",
    "weekly": "Týdně",
    "yearly": "Ročně"
  },
  "monthly": {
    "day": "Den",
    "interval": "měsíc(e)",
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:"
  },
  "offsetPositions": {
    "first": "první",
    "fourth": "čtvrtý",
    "last": "poslední",
    "second": "druhý",
    "third": "třetí"
  },
  "weekly": {
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "týden(ny)"
  },
  "yearly": {
    "of": "",
    "repeatEvery": "Opakovat každý:",
    "repeatOn": "Opakovat v:",
    "interval": "rok(y)"
  },
  "weekdays": {
    "day": "den",
    "weekday": "pracovní den",
    "weekend": "víkend"
  }
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Zrušit",
  "filter": "Filtrovat",
  "isFalse": "není pravda",
  "isTrue": "je pravda",
  "operator": "Operátor"
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

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Zrušit",
    "cancel": "Zrušit",
    "create": "Přidat nový záznam",
    "destroy": "Smazat",
    "edit": "Upravit",
    "save": "Uložit změny",
    "select": "Vybrat",
    "update": "Odemknout"
  },
  "editable": {
    "confirmation": "Opravdu chcete smazat tento záznam?",
    "cancelDelete": "Zrušit",
    "confirmDelete": "Smazat"
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

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
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

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Zrušit",
  "retry": "Zkusit znova",
  "select": "Vyberte...",
  "remove": "Smazat",
  "uploadSelectedFiles": "Nahrát soubory",
  "dropFilesHere": "Pro nahrátí přetáhněte soubory sem",
  "statusFailed": "chyba",
  "statusUploaded": "nahráno",
  "statusUploading": "nahrávám",
  "headerStatusUploaded": "Hotovo",
  "headerStatusUploading": "Nahrávám..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Tučně",
  "createLink": "Vložit odkaz",
  "fontName": "Vyberte písmo",
  "fontNameInherit": "(výchozí písmo)",
  "fontSize": "Vyberte velikost písma",
  "fontSizeInherit": "(výchozí velikost)",
  "formatBlock": "Formát",
  "indent": "Zvětšit odsazení",
  "insertHtml": "Vložit HTML",
  "insertImage": "Vložit obrázek",
  "insertOrderedList": "Vložit číslovaný seznam",
  "insertUnorderedList": "Vložit odrážkový seznam",
  "italic": "Kurzíva",
  "justifyCenter": "Zarovnat na střed",
  "justifyFull": "Zarovnat do bloku",
  "justifyLeft": "Zarovnat vlevo",
  "justifyRight": "Zarovnat vpravo",
  "outdent": "Zmenšit odsazení",
  "strikethrough": "Přeškrtnuté",
  "styles": "Styly",
  "subscript": "Dolní index",
  "superscript": "Horní index",
  "underline": "Podtržené",
  "unlink": "Zrušit odkaz",
  "deleteFile": "Opravdu chcete smazat \"{0}\"?",
  "directoryNotFound": "Adresář zadaného názvu nebyl nalezen.",
  "emptyFolder": "Prázný adresář",
  "invalidFileType": "Vybraný soubor s příponou \"{0}\" není podporovaný. Podporované soubory jsou {1}.",
  "orderBy": "Seřadit dle:",
  "orderByName": "Jména",
  "orderBySize": "Velikosti",
  "overwriteFile": "'Soubor s názvem \"{0}\" již ve vybraném adresáři existuje. Přejete si jej přepsat?",
  "uploadFile": "Nahrát",
  "backColor": "Barva pozadí",
  "foreColor": "Barva",
  "dropFilesHere": "Přetáhněte soubory sem pro nahrání",
  "imageWebAddress": "Odkaz",
  "dialogButtonSeparator": "nebo",
  "dialogCancel": "Zrušit",
  "dialogInsert": "Vložit",
  "imageAltText": "Alternativní text",
  "linkOpenInNewWindow": "Otevřít odkaz v novém okně",
  "linkText": "Text",
  "linkToolTip": "Text po najetí",
  "linkWebAddress": "Odkaz",
  "search": "Hledat",
  "createTable": "Vložit tabulku",
  "addColumnLeft": "Přidat sloupec vlevo",
  "addColumnRight": "Přidat sloupec vpravo",
  "addRowAbove": "Přidat řádek nad",
  "addRowBelow": "Přidat řádek pod",
  "deleteColumn": "Smazat soupec",
  "deleteRow": "Smazat řádek",
  "formatting": "Formátování",
  "insertFile": "Insert file"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "celý den",
  "cancel": "Zrušit",
  "confirmation": "Opravdu chcete smazat tuto událost?",
  "date": "Datum",
  "destroy": "Smazat",
  "editor": {
    "allDayEvent": "Celodenní",
    "description": "Popis",
    "editorTitle": "Událost",
    "end": "Konec",
    "endTimezone": "Časové pásmo konce",
    "repeat": "Opakování",
    "separateTimezones": "Různé časové pásma pro začátek a konec",
    "start": "Začátek",
    "startTimezone": "Časové pásmo začátku",
    "timezone": " Časové pásmo",
    "timezoneEditorButton": "Časové pásmo",
    "timezoneEditorTitle": "Časové pásma",
    "title": "Nadpis"
  },
  "event": "Událost",
  "recurrenceMessages": {
    "deleteWindowOccurrence": "Smazat vybranou událost",
    "deleteWindowSeries": "Smazat vše",
    "deleteWindowTitle": "Smazat opakovanou událost",
    "editWindowOccurrence": "Upravit jen vybranou událost",
    "editWindowSeries": "Upravit vše",
    "editWindowTitle": "Upravit opakující se událost",
    "deleteRecurring": "Chcete smazat jen vybranou událost, nebo i všechny opakování?",
    "editRecurring": "Chcete upravit jen vybranou událost, nebo i všechny opakování?"
  },
  "save": "Uložit",
  "time": "Čas",
  "today": "Dnes",
  "views": {
    "agenda": "Agenda",
    "day": "Den",
    "month": "Měsíc",
    "week": "Týden"
  },
  "deleteWindowTitle": "Smazat událost",
  "showFullDay": "Zobrazit celý den",
  "showWorkDay": "Zobrazit pracovní dobu"
});
}
