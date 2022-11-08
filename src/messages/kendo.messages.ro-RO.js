(function($, undefined) {

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
  kendo.ui.FilterCell.prototype.options.operators =
    $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
      "date": {
        "eq": "Egal cu",
        "gt": "După",
        "gte": "După sau egal cu",
        "lt": "Înainte de",
        "lte": "Înainte sau egal cu",
        "neq": "Diferit de"
      },
      "enums": {
        "eq": "Egal cu",
        "neq": "Diferit de"
      },
      "number": {
        "eq": "Egal cu",
        "gt": "Mai mare decât",
        "gte": "Mai mare sau egal cu",
        "lt": "Mai mic decât",
        "lte": "Mai mic sau egal cu",
        "neq": "Diferit de"
      },
      "string": {
        "contains": "Conține",
        "doesnotcontain": "Nu conține",
        "endswith": "Se termină cu",
        "eq": "Egal cu",
        "neq": "Diferit de",
        "startswith": "Începe cu"
      }
    });
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
  kendo.ui.FilterMenu.prototype.options.operators =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
      "date": {
        "eq": "Egal cu",
        "gt": "După",
        "gte": "După sau egal cu",
        "lt": "Înainte de",
        "lte": "Înainte sau egal cu",
        "neq": "Diferit de"
      },
      "enums": {
        "eq": "Egal cu",
        "neq": "Diferit de"
      },
      "number": {
        "eq": "Egal cu",
        "gt": "Mai mare decât",
        "gte": "Mai mare sau egal cu",
        "lt": "Mai mic decât",
        "lte": "Mai mic sau egal cu",
        "neq": "Diferit de"
      },
      "string": {
        "contains": "Conține",
        "doesnotcontain": "Nu conține",
        "endswith": "Se termină cu",
        "eq": "Egal cu",
        "neq": "Diferit de",
        "startswith": "Începe cu"
      }
    });
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
  kendo.ui.ColumnMenu.prototype.options.messages =
    $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
      "columns": "Coloane",
      "sortAscending": "Sortare ascendentă",
      "sortDescending": "Sortare descendentă",
      "settings": "Setări coloană",
      "done": "Terminat",
      "lock": "Blocare",
      "unlock": "Deblocare"
    });
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
  kendo.ui.RecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
      "daily": {
        "interval": "zi/zile",
        "repeatEvery": "Repetă în fiecare:"
      },
      "end": {
        "after": "După",
        "occurrence": "ocurență(e)",
        "label": "Sfărsit:",
        "never": "Niciodată",
        "on": "On",
        "mobileLabel": "Sfărseste"
      },
      "frequencies": {
        "daily": "Zilnic",
        "monthly": "Lunar",
        "never": "Niciodată",
        "weekly": "Saptamanal",
        "yearly": "Anual"
      },
      "monthly": {
        "day": "Day",
        "interval": "luna(luni)",
        "repeatEvery": "Repetă în fiecare:",
        "repeatOn": "Repetă la:"
      },
      "offsetPositions": {
        "first": "primul",
        "fourth": "al patrulea",
        "last": "ultimul",
        "second": "al doilea",
        "third": "al treilea"
      },
      "weekly": {
        "repeatEvery": "Repetă în fiecare:",
        "repeatOn": "Repetă la:",
        "interval": "saptamana(i)"
      },
      "yearly": {
        "of": "din",
        "repeatEvery": "Repetă în fiecare:",
        "repeatOn": "Repetă la:",
        "interval": "an(ani)"
      },
      "weekdays": {
        "day": "zi",
        "weekday": "zi a saptamanii",
        "weekend": "zi de weekend"
      }
    });
}

/* Editor messages */

if (kendo.ui.Editor) {
  kendo.ui.Editor.prototype.options.messages =
    $.extend(true, kendo.ui.Editor.prototype.options.messages, {
      "backColor": "Culoare fundal",
      "bold": "Ingrosat",
      "createLink": "Inserează hyperlink",
      "deleteFile": "Sigur doriți să ștergeți \" {0} \" ?",
      "dialogButtonSeparator": "sau",
      "dialogCancel": "Anuleați",
      "dialogInsert": "Inserați",
      "directoryNotFound": "Nu a fost găsit un director cu acest nume.",
      "dropFilesHere": "plasați fișierele aici pentru încărcare",
      "emptyFolder": "Dosar gol",
      "fontName": "Selectați familia de fonturi",
      "fontNameInherit": "(font moștenit)",
      "fontSize": "Selectați dimensiunea fontului",
      "fontSizeInherit": "(dimensiune moștenită)",
      "foreColor": "Culoare",
      "formatBlock": "Format",
      "imageAltText": "Text alternativ",
      "imageWebAddress": "Adresă Web",
      "indent": "Indentare",
      "insertHtml": "Inserați HTML",
      "insertImage": "Inserați imagine",
      "insertOrderedList": "Inserați listă ordonată",
      "insertUnorderedList": "Inserați listă neordonată",
      "invalidFileType": "Fișierul selectat \"{0}\" nu este valid. Tipurile de fișiere acceptate sunt {1}.",
      "italic": "Cursiv",
      "justifyCenter": "Centrați textul",
      "justifyFull": "Aliniați textul",
      "justifyLeft": "Aliniați textul la stânga",
      "justifyRight": "Aliniați textul la dreapta",
      "linkOpenInNewWindow": "Deschideți link-ul într-o fereastră nouă",
      "linkText": "Text",
      "linkToolTip": "Indiciu",
      "linkWebAddress": "Adresă Web",
      "orderBy": "Ordonare după:",
      "orderByName": "Nume",
      "orderBySize": "Dimensiune",
      "outdent": "Anulare indentare",
      "overwriteFile": "Există deja un fișier cu numele \" {0} \" în directorul curent. Doriți să-l suprascrieți ?",
      "search": "Caută",
      "strikethrough": "Tăiat",
      "style": "Stiluri",
      "subscript": "Indice",
      "superscript": "Exponent",
      "underline": "Subliniat",
      "unlink": "Elimină hyperlink",
      "uploadFile": "Incarcați fișier",
      "createTable": "Inserași tabele",
      "addColumnLeft": "Adaugați coloana la stanga",
      "addColumnRight": "Adaugați coloana la dreapta",
      "addRowAbove": "Adaugați rând deasupra",
      "addRowBelow": "Adaugați rând dedesubt",
      "deleteColumn": "Ștergeți coloană",
      "deleteRow": "Ștergeți rând",
      "formatting": "Formatați",
      "viewHtml": "Vezi HTML",
      "dialogUpdate": "Actualizați",
      "insertFile": "Inserați fișier"
    });
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
  kendo.ui.FilterCell.prototype.options.messages =
    $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
      "clear": "Ștergeți",
      "filter": "Filtrați",
      "isFalse": "este fals",
      "isTrue": "este adevărat",
      "operator": "Operator"
    });
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
  kendo.ui.FilterMenu.prototype.options.messages =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
      "and": "și",
      "clear": "Ștergeți",
      "filter": "Filtrați",
      "info": "Criterii filtrare:",
      "title": "Criterii filtrare",
      "isFalse": "este fals",
      "isTrue": "este adevărat",
      "or": "sau",
      "selectValue": "- Selectați valoare -",
      "cancel": "Anulați",
      "operator": "Operator",
      "value": "Valoare"
    });
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
  kendo.ui.FilterMultiCheck.prototype.options.messages =
    $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
      "search": "Cautați"
    });
}

/* Grid messages */

if (kendo.ui.Grid) {
  kendo.ui.Grid.prototype.options.messages =
    $.extend(true, kendo.ui.Grid.prototype.options.messages, {
      "commands": {
        "canceledit": "Anulați",
        "cancel": "Anulați modificările",
        "create": "Adăugați element nou",
        "destroy": "Ștergeți",
        "edit": "Modificați",
        "excel": "Exportați în Excel",
        "pdf": "Exportați în PDF",
        "save": "Salvați modificările",
        "select": "Selectați",
        "update": "Actualizați"
      },
      "editable": {
        "confirmation": "Sigur doriți să ștergeți acest element ?",
        "cancelDelete": "Anulați",
        "confirmDelete": "Ștergeți"
      },
      "noRecords": "Nicio inregistrare disponibila.",
      "search": "Cautare...",
      "expandCollapseColumnHeader": "",
      "groupHeader": "Apasati CTRL + spatiu pentru a grupa",
      "ungroupHeader": "Apasati CTRL + spatiu pentru a degrupa"
    });
}

/* Groupable messages */

if (kendo.ui.Groupable) {
  kendo.ui.Groupable.prototype.options.messages =
    $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
      "empty": "Trageți un antet de coloană și plasați-l aici pentru a grupa după acea coloană"
    });
}

/* Pager messages */

if (kendo.ui.Pager) {
  kendo.ui.Pager.prototype.options.messages =
    $.extend(true, kendo.ui.Pager.prototype.options.messages, {
      "allPages": "Toate",
      "display": "{0} - {1} din {2} elemente",
      "empty": "Nu există elemente pentru afișare",
      "first": "Prima pagină",
      "itemsPerPage": "elemente per pagină",
      "last": "Ultima pagină",
      "next": "Pagina următoare",
      "of": "din {0}",
      "page": "Pagina",
      "previous": "Pagina precedentă",
      "refresh": "Actualizați",
      "morePages": "Mai multe pagini"
    });
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "No records to display",
  "loading": "Loading...",
  "requestFailed": "Request failed.",
  "retry": "Incearcă din nou",
  "commands": {
      "edit": "Modifică",
      "update": "Actualizează",
      "canceledit": "Cancel",
      "create": "Adaugă element nou",
      "createchild": "Add child record",
      "destroy": "Șterge",
      "excel": "Export to Excel",
      "pdf": "Export to PDF"
  }
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
  kendo.ui.TreeListPager.prototype.options.messages =
    $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
      "allPages": "All",
      "display": "{0} - {1} din {2} elemente",
      "empty": "Nu există elemente pentru afișare",
      "first": "Prima pagină",
      "itemsPerPage": "elemente per pagină",
      "last": "Ultima pagină",
      "next": "Pagina următoare",
      "of": "din {0}",
      "page": "Pagina",
      "previous": "Pagina precedentă",
      "refresh": "Actualizați",
      "morePages": "Mai multe pagini"
    });
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
  kendo.ui.Scheduler.prototype.options.messages =
    $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
      "allDay": "toată ziua",
      "cancel": "Anulați",
      "editable": {
        "confirmation": "Sigur doriți să ștergeți acest eveniment?"
      },
      "date": "Data",
      "destroy": "Ștergeți",
      "editor": {
        "allDayEvent": "Eveniment pe întreaga zi",
        "description": "Descriere",
        "editorTitle": "Eveniment",
        "end": "End",
        "endTimezone": "Sfârsit zona timp",
        "repeat": "Repetați",
        "separateTimezones": "Folosiți zone de timp separate de început si sfărșit",
        "start": "Pornește",
        "startTimezone": "Porniți zona de timp",
        "timezone": " ",
        "timezoneEditorButton": "Fus orar",
        "timezoneEditorTitle": "Zone de timp",
        "title": "Titlu",
        "noTimezone": "Nicio zona de timp"
      },
      "event": "Event",
      "recurrenceMessages": {
        "deleteRecurring": "Doriți să ștergeți doar această ocurența sau toată seria?",
        "deleteWindowOccurrence": "Ștergeți această ocurența",
        "deleteWindowSeries": "Ștergeți toată seria",
        "deleteWindowTitle": "Ștergeți elementul recurent",
        "editRecurring": "Doriți să editați doar această ocurența sau toată seria?",
        "editWindowOccurrence": "Editați această ocurența",
        "editWindowSeries": "Editați toată seria",
        "editWindowTitle": "Editați elementul recurent"
      },
      "save": "Salvați",
      "time": "Timp",
      "search": "Caută...",
      "today": "Astăzi",
      "views": {
        "agenda": "Agendă",
        "day": "Zi",
        "month": "Lună",
        "week": "Săptămână",
        "workWeek": "Săptămână de lucru"
      },
      "deleteWindowTitle": "Ștergeți eveniment",
      "showFullDay": "Afișați toată ziua",
      "showWorkDay": "Afișați ore de lucru"
    });
}

/* Upload messages */

if (kendo.ui.Upload) {
  kendo.ui.Upload.prototype.options.localization =
    $.extend(true, kendo.ui.Upload.prototype.options.localization, {
      "cancel": "Anulați",
      "dropFilesHere": "plasați fișierele aici pentru încărcare",
      "remove": "Eliminați",
      "retry": "Incercați din nou",
      "select": "Selectați...",
      "statusFailed": "eșuat",
      "statusUploaded": "încărcat",
      "statusUploading": "încarcă",
      "uploadSelectedFiles": "Încărcați fișierele",
      "headerStatusUploaded": "Terminat",
      "headerStatusUploading": "Se încarcă..."
    });
}

/* Dialog */

if (kendo.ui.Dialog) {
  kendo.ui.Dialog.prototype.options.messages =
    $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
      "close": "Închideți"
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
      "cancel": "Anulați"
    });
}

/* Prompt */
if (kendo.ui.Prompt) {
  kendo.ui.Prompt.prototype.options.messages =
    $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
      "okText": "OK",
      "cancel": "Anulați"
    });
}

})(window.kendo.jQuery);
