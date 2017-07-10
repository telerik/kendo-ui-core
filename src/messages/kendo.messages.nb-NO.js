(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
    $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "date": {
            "eq": "Er lik med",
            "gt": "Er senere enn",
            "gte": "Er lik eller senere enn",
            "lt": "Er tidligere enn",
            "lte": "Er lik eller tidligere enn",
            "neq": "Er ikke lik med"
        },
        "number": {
            "eq": "Er lik med",
            "gt": "Er større enn",
            "gte": "Er lik eller større enn",
            "lt": "Er mindre enn",
            "lte": "Er lik eller mindre enn",
            "neq": "Er ikke lik med"
        },
        "string": {
            "contains": "Inneholder",
            "doesnotcontain": "Inneholder ikke",
            "endswith": "Slutter med",
            "eq": "Er lik med",
            "neq": "Er ikke lik med",
            "startswith": "Starter med"
        },
        "enums": {
            "eq": "Er lik med",
            "neq": "Er ikke lik med"
        }
    });
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "date": {
            "eq": "Er lik med",
            "gt": "Er senere enn",
            "gte": "Er lik eller senere enn",
            "lt": "Er tidligere enn",
            "lte": "Er lik eller tidigere enn",
            "neq": "Er ikke lik med"
        },
        "number": {
            "eq": "Er lik med",
            "gt": "Er større enn",
            "gte": "Er lik eller større enn",
            "lt": "Er mindre enn",
            "lte": "Er lik eller mindre enn",
            "neq": "Er ikke lik med"
        },
        "string": {
            "contains": "Inneholder",
            "doesnotcontain": "Inneholder ikke",
            "endswith": "Slutter med",
            "eq": "Er lik med",
            "neq": "Er ikke lik med",
            "startswith": "Starter med"
        },
        "enums": {
            "eq": "Er lik med",
            "neq": "Er ikke lik med"
        }
    });
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
    $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "columns": "Kolonner",
        "sortAscending": "Sortere fallende",
        "sortDescending": "Sortere stigende",
        "settings": "Kolonneinstillinger",
        "done": "Klar",
        "lock": "Lås",
        "unlock": "Lås opp"
    });
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "daily": {
            "interval": "dag(er)",
            "repeatEvery": "Gjenta hver:"
        },
        "end": {
            "after": "Etter",
            "occurrence": "forekomst(er)",
            "label": "Slutt:",
            "never": "Aldri",
            "on": "På",
            "mobileLabel": "Slutter"
        },
        "frequencies": {
            "daily": "Daglig",
            "monthly": "Månedlig",
            "never": "Aldri",
            "weekly": "Ukentlig",
            "yearly": "Årlig"
        },
        "monthly": {
            "day": "Dag",
            "interval": "måned(er)",
            "repeatEvery": "Gjenta hver:",
            "repeatOn": "Gjenta på:"
        },
        "offsetPositions": {
            "first": "første",
            "fourth": "fjerde",
            "last": "siste",
            "second": "andre",
            "third": "tredje"
        },
        "weekly": {
            "repeatEvery": "Gjenta hver:",
            "repeatOn": "Gjenta på:",
            "interval": "uke(r)"
        },
        "yearly": {
            "of": "av",
            "repeatEvery": "Gjenta hver:",
            "repeatOn": "Gjenta på:",
            "interval": "år"
        },
        "weekdays": {
            "day": "dag",
            "weekday": "ukedag",
            "weekend": "helgedag"
        }
    });
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
    $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "clear": "Fjern",
        "filter": "Filtrere",
        "isFalse": "Er usann",
        "isTrue": "Er sant",
        "operator": "Operator"
    });
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
    $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "and": "Og",
        "clear": "Fjern",
        "filter": "Filtrere",
        "info": "Vis poster med verdi:",
        "isFalse": "Er usann",
        "isTrue": "Er sant",
        "or": "Eller",
        "selectValue": "-Velg-",
        "cancel": "Avbryt",
        "operator": "Operator",
        "value": "Verdi"
    });
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Søk"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
    $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
            "canceledit": "Avbryt",
            "cancel": "Avbryt endringer",
            "create": "Legg til post",
            "destroy": "Slett",
            "edit": "Endre",
            "excel": "Export to Excel",
            "pdf": "Export to PDF",
            "save": "Lagre",
            "select": "Velg",
            "update": "Oppdater"
        },
        "editable": {
            "confirmation": "Er du sikker på at du vil slette denna posten?",
            "cancelDelete": "Avbryt",
            "confirmDelete": "Slett"
        }
    });
}

/* Groupable messages */

if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
    $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Dra en kolonne hit for å sortere på den kolonnen"
    });
}

/* Pager messages */

if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
    $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Alle",
        "display": "{0} - {1} av {2} poster",
        "empty": "Det finnes ingen poster",
        "first": "Gå til første side",
        "itemsPerPage": "poster per side",
        "last": "Gå til siste siden",
        "next": "Gå til neste side",
        "of": "av {0}",
        "page": "Side",
        "previous": "Gå til forrige side",
        "refresh": "Oppdatere",
        "morePages": "Flere sider"
    });
}

/* Upload messages */

if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
    $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "cancel": "Avbryt",
        "retry": "Forsøk igjen",
        "select": "Velg...",
        "remove": "Fjern",
        "uploadSelectedFiles": "Last opp filer",
        "dropFilesHere": "slipp filer her for å laste opp",
        "statusFailed": "misslyktes",
        "statusUploaded": "opplastet",
        "statusUploading": "laster opp",
        "headerStatusUploaded": "Ferdig",
        "headerStatusUploading": "Laster opp..."
    });
}

/* Editor messages */

if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
    $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "bold": "Uthevet",
        "createLink": "Legg til link",
        "fontName": "Velg fontnavn",
        "fontNameInherit": "(arvet fontnavn)",
        "fontSize": "Velg størrelse",
        "fontSizeInherit": "(arvet størrelse)",
        "formatBlock": "Formatering",
        "indent": "Øk indentasjon",
        "insertHtml": "Legg til HTML",
        "insertImage": "Legg til bilde",
        "insertOrderedList": "Legg til numerert liste",
        "insertUnorderedList": "Legg til punktliste",
        "italic": "Kursiv",
        "justifyCenter": "Sentrert tekst",
        "justifyFull": "Marginaljustert tekst",
        "justifyLeft": "Venstrejustert tekst",
        "justifyRight": "Høyrejustert tekst",
        "outdent": "Minsk indentasjon",
        "strikethrough": "Gjennomstreket",
        "styles": "Stil",
        "subscript": "Nedsenket",
        "superscript": "Opphøyd",
        "underline": "Understreket",
        "unlink": "Fjern lenke",
        "deleteFile": "Er du sikker på at du vil slette \"{0}\"?",
        "directoryNotFound": "En mappe med dette navnet finnes ikke.",
        "emptyFolder": "Tom mappe",
        "invalidFileType": "Filen \"{0}\" er ikke gyldig. Tilatte filtyper er {1}.",
        "orderBy": "Sortere på:",
        "orderByName": "Navn",
        "orderBySize": "Størrelse",
        "overwriteFile": "'En fil med navn \"{0}\" finnes allerede i aktuell mappe. Vil du skrive over den?",
        "uploadFile": "Last opp",
        "backColor": "Bakgrunnsfarge",
        "foreColor": "Farge",
        "dropFilesHere": "slipp filer her for å laste opp",
        "dialogButtonSeparator": "eller",
        "dialogCancel": "Avbryt",
        "dialogInsert": "Legg til",
        "imageAltText": "Alternativ tekst",
        "imageWebAddress": "Webbadresse",
        "linkOpenInNewWindow": "Åpne lenke i nytt vindu",
        "linkText": "Tekst",
        "linkToolTip": "Skjermtips",
        "linkWebAddress": "Webbadresse",
        "search": "Søk",
        "createTable": "Lag tabell",
        "addColumnLeft": "Legg til kolonne på venstre",
        "addColumnRight": "Legg til kolonne på høyre",
        "addRowAbove": "Legg til rad over",
        "addRowBelow": "Legg til rad under",
        "deleteColumn": "Slett kolonne",
        "deleteRow": "Slett rad",
        "formatting": "Format",
        "viewHtml": "Vis HTML",
        "dialogUpdate": "Oppdater",
        "insertFile": "Sett inn fil"
    });
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
    $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "hele dagen",
        "cancel": "Avbryt",
        "editable": {
            "confirmation": "Er du sikker på at du vil slette denne oppgaven?"
        },
        "date": "Dato",
        "destroy": "Slett",
        "editor": {
            "allDayEvent": "Heldags oppgave",
            "description": "Beskrivelse",
            "editorTitle": "Oppgave",
            "end": "Slutt",
            "endTimezone": "Slutt tidssone",
            "repeat": "Gjenta",
            "separateTimezones": "Bruk forskjellig start og slutt tidssoner",
            "start": "Start",
            "startTimezone": "Start tidssone",
            "timezone": "tidssone",
            "timezoneEditorButton": "Tidssone",
            "timezoneEditorTitle": "Tidssoner",
            "title": "Tittel",
            "noTimezone": "Ingen tidssone"
        },
        "event": "Oppgave",
        "recurrenceMessages": {
            "deleteRecurring": "Vil du slette bare denne forekomsten eller alle forekomster av denne oppgaven?",
            "deleteWindowOccurrence": "Slett denne forekomsten",
            "deleteWindowSeries": "Slett alle forekomster",
            "deleteWindowTitle": "Slett gjentagende forekomst",
            "editRecurring": "Vil du redigere bare denne forekomsten eller alle forekomster av denne oppgaven?",
            "editWindowOccurrence": "Rediger denne forekomsten",
            "editWindowSeries": "Rediger alle forekomster",
            "editWindowTitle": "Rediger gjentagende oppgave"
        },
        "save": "Lagre",
        "time": "Tid",
        "today": "I dag",
        "views": {
            "agenda": "Agenda",
            "day": "Dag",
            "month": "Måned",
            "week": "Uke",
            "workWeek": "Arbeidsuke"
        },
        "deleteWindowTitle": "Slett oppgave",
        "showFullDay": "Vis full dag",
        "showWorkDay": "Vis arbeidstimer"
    });
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Lukke"
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
  "cancel": "Avbryt"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Avbryt"
});
}

})(window.kendo.jQuery);
