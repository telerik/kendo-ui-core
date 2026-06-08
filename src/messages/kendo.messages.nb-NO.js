(function($, undefined) {

/* FilterCell operators */

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

/* FilterMenu operator messages */

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
        "title": "Vis poster med verdi",
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
            "add": "Legg til post",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
    $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
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

/* DropDownList messages */

if (kendo.ui.DropDownList) {

    kendo.ui.DropDownList.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* ComboBox messages */

if (kendo.ui.ComboBox) {

    kendo.ui.ComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* AutoComplete messages */

if (kendo.ui.AutoComplete) {

    kendo.ui.AutoComplete.prototype.options.messages =
        $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* MultiColumnComboBox messages */

if (kendo.ui.MultiColumnComboBox) {

    kendo.ui.MultiColumnComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);

}

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Kontrastforhold:",
            "fail": "Mislykket",
            "pass": "Bestått",
            "hex": "HEX",
            "toggleFormat": "Bytt format",
            "red": "Rød",
            "green": "Grønn",
            "blue": "Blå",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Bruk",
            "cancel": "Avbryt",
            "noColor": "ingen farge",
            "clearColor": "Fjern farge"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Bruk",
            "cancel": "Avbryt",
            "noColor": "ingen farge",
            "clearColor": "Fjern farge"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Start",
            "endLabel": "Slutt"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Last opp",
            "orderBy": "Sorter etter",
            "orderByName": "Navn",
            "orderBySize": "Størrelse",
            "directoryNotFound": "En mappe med dette navnet ble ikke funnet.",
            "emptyFolder": "Tom mappe",
            "deleteFile": "Er du sikker på at du vil slette \"{0}\"?",
            "invalidFileType": "Den valgte filen \"{0}\" er ugyldig. Støttede filtyper er {1}.",
            "overwriteFile": "En fil med navnet \"{0}\" finnes allerede i gjeldende mappe. Vil du overskrive den?",
            "dropFilesHere": "slipp fil her for å laste opp",
            "search": "Søk"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Ny mappe",
                "upload": "Last opp",
                "sortDirection": "Sorteringsrekkefølge",
                "sortDirectionAsc": "Stigende",
                "sortDirectionDesc": "Synkende",
                "sortField": "Sorter etter",
                "nameField": "Navn",
                "sizeField": "Størrelse",
                "typeField": "Type",
                "dateModifiedField": "Endret dato",
                "dateCreatedField": "Opprettet dato",
                "listView": "Listevisning",
                "gridView": "Rutenettvisning",
                "search": "Søk",
                "details": "Detaljer",
                "detailsChecked": "Ja",
                "detailsUnchecked": "Nei",
                "Delete": "Slett",
                "Rename": "Gi nytt navn"
            },
            "views": {
                "nameField": "Navn",
                "sizeField": "Størrelse",
                "typeField": "Type",
                "dateModifiedField": "Endret dato",
                "dateCreatedField": "Opprettet dato",
                "items": "elementer"
            },
            "dialogs": {
                "upload": {
                    "title": "Last opp filer",
                    "clear": "Tøm",
                    "done": "Ferdig"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Vil du flytte eller kopiere de valgte filene?</p>",
                    "okText": "Kopier",
                    "cancel": "Flytt",
                    "close": "Lukk"
                },
                "deleteConfirm": {
                    "title": "Bekreft sletting",
                    "content": "<p class='k-text-center'>Er du sikker på at du vil slette de valgte filene?<br/>Denne handlingen kan ikke angres.</p>",
                    "okText": "Slett",
                    "cancel": "Avbryt",
                    "close": "Lukk"
                },
                "renamePrompt": {
                    "title": "Gi nytt navn",
                    "content": "<p class='k-text-center'>Skriv inn et nytt filnavn</p>",
                    "okText": "Gi nytt navn",
                    "cancel": "Avbryt",
                    "close": "Lukk"
                }
            },
            "previewPane": {
                "noFileSelected": "Ingen fil valgt",
                "extension": "Type",
                "size": "Størrelse",
                "created": "Opprettet dato",
                "createdUtc": "Opprettet dato (UTC)",
                "modified": "Endret dato",
                "modifiedUtc": "Endret dato (UTC)",
                "items": "elementer"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Legg til underoppgave",
                "append": "Legg til oppgave",
                "insertAfter": "Sett inn etter",
                "insertBefore": "Sett inn før",
                "pdf": "Eksporter til PDF"
            },
            "cancel": "Avbryt",
            "deleteDependencyWindowTitle": "Slett avhengighet",
            "deleteTaskWindowTitle": "Slett oppgave",
            "destroy": "Slett",
            "editor": {
                "assignButton": "Tilordne",
                "editorTitle": "Oppgave",
                "end": "Slutt",
                "percentComplete": "Fullføring",
                "resources": "Ressurser",
                "resourcesEditorTitle": "Ressurser",
                "resourcesHeader": "Ressurser",
                "start": "Start",
                "title": "Tittel",
                "unitsHeader": "Enheter",
                "parent": "Overordnet",
                "addNew": "Legg til",
                "name": "Navn"
            },
            "save": "Lagre",
            "selectView": "Velg visning",
            "views": {
                "day": "Dag",
                "end": "Slutt",
                "month": "Måned",
                "start": "Start",
                "week": "Uke",
                "year": "År"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Rediger",
            "createNewCard": "Nytt kort",
            "create": "Opprett",
            "search": "Søk",
            "previewCard": "Forhåndsvis kort",
            "addCard": "Legg til kort",
            "editCard": "Rediger kort",
            "deleteCard": "Slett kort",
            "addColumn": "Legg til kolonne",
            "editColumn": "Rediger kolonne",
            "deleteColumn": "Slett kolonne",
            "close": "Lukk",
            "cancel": "Avbryt",
            "delete": "Slett",
            "saveChanges": "Lagre endringer",
            "title": "Tittel:",
            "description": "Beskrivelse:",
            "newColumn": "Ny kolonne",
            "deleteColumnConfirm": "Er du sikker på at du vil slette denne kolonnen?",
            "deleteCardConfirm": "Er du sikker på at du vil slette dette kortet?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Øk verdi",
            "downArrowText": "Reduser verdi"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pause",
            "play": "Spill av",
            "mute": "Demp",
            "unmute": "Slå på lyd",
            "quality": "Kvalitet",
            "fullscreen": "Fullskjerm"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Slipp datafelter her",
            "columnFields": "Slipp kolonnefelter her",
            "rowFields": "Slipp radfelter her"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Vis elementer med verdi som:",
            "sortAscending": "Stigende rekkefølge",
            "sortDescending": "Synkende rekkefølge",
            "filterFields": "Feltfilter",
            "filter": "Filter",
            "include": "Inkluder felter...",
            "title": "Felter å inkludere",
            "clear": "Tøm",
            "ok": "Ok",
            "cancel": "Avbryt",
            "operators": {
                "contains": "Inneholder",
                "doesnotcontain": "Inneholder ikke",
                "startswith": "Begynner med",
                "endswith": "Slutter med",
                "eq": "Er lik",
                "neq": "Er ikke lik"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Innstillinger",
            "cancelButtonText": "Avbryt",
            "applyButtonText": "Bruk",
            "measures": "Velg felter for å starte",
            "columns": "Velg felter for å starte",
            "rows": "Velg felter for å starte"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Bruk",
            "sortAscending": "Stigende rekkefølge",
            "sortDescending": "Synkende rekkefølge",
            "filterFields": "Feltfilter",
            "filter": "Filter",
            "include": "Inkluder felter...",
            "clear": "Tøm",
            "reset": "Tilbakestill",
            "moveToColumns": "Flytt til kolonner",
            "moveToRows": "Flytt til rader",
            "movePrevious": "Flytt bakover",
            "moveNext": "Flytt fremover",
            "filterOperatorsDropDownLabel": "Filteroperatorer",
            "filterValueTextBoxLabel": "Filterverdi",
            "operators": {
                "contains": "Inneholder",
                "doesnotcontain": "Inneholder ikke",
                "startswith": "Begynner med",
                "endswith": "Slutter med",
                "eq": "Er lik",
                "neq": "Er ikke lik"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Avbryt",
            "update": "Lagre",
            "endTitle": "Avslutt gjentakelse",
            "repeatTitle": "Gjentakelsesmønster",
            "headerTitle": "Gjenta hendelse",
            "end": {
                "never": "Aldri",
                "after": "Etter",
                "on": "På"
            },
            "daily": {
                "interval": "dag(er)"
            },
            "weekly": {
                "interval": "uke(r)"
            },
            "monthly": {
                "interval": "måned(er)",
                "repeatBy": "Gjenta etter: ",
                "dayOfMonth": "Dag i måneden",
                "dayOfWeek": "Ukedag"
            },
            "yearly": {
                "interval": "år",
                "repeatBy": "Gjenta etter: ",
                "dayOfMonth": "Dag i måneden",
                "dayOfWeek": "Ukedag",
                "of": " av "
            },
            "endRule": {
                "after": " forekomst(er)",
                "on": "På "
            }
        });

}

/* Spreadsheet messages */

if (kendo.spreadsheet) {

    kendo.spreadsheet.messages.view =
        $.extend(true, kendo.spreadsheet.messages.view, {
            "errors": {
                "shiftingNonblankCells": "Kan ikke sette inn celler på grunn av mulig datatap.",
                "filterRangeContainingMerges": "Kan ikke opprette et filter i et område som inneholder fletninger",
                "cannotModifyDisabled": "Kan ikke endre deaktiverte celler."
            },
            "tabs": {
                "home": "Hjem",
                "insert": "Sett inn",
                "data": "Data"
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Øk",
            "decreaseButtonTitle": "Reduser",
            "dragHandleTitle": "Dra"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Slett",
                "moveUp": "Flytt opp",
                "moveDown": "Flytt ned",
                "transferTo": "Overfør til",
                "transferFrom": "Overfør fra",
                "transferAllTo": "Overfør alle til",
                "transferAllFrom": "Overfør alle fra"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Laster...",
            "requestFailed": "Forespørselen mislyktes.",
            "retry": "Prøv igjen"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} er påkrevd",
            "pattern": "{0} er ikke gyldig",
            "min": "{0} må være større enn eller lik {1}",
            "max": "{0} må være mindre enn eller lik {1}",
            "step": "{0} er ikke gyldig",
            "email": "{0} er ikke en gyldig e-postadresse",
            "url": "{0} er ikke en gyldig URL",
            "date": "{0} er ikke en gyldig dato",
            "dateCompare": "Sluttdato må være etter startdato"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Laster..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Angi",
            "cancel": "Avbryt",
            "hour": "time",
            "minute": "minutt",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nå"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Angi",
            "cancel": "Avbryt",
            "hour": "time",
            "minute": "minutt",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nå",
            "date": "Dato",
            "time": "Tid",
            "today": "I dag",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "I dag",
            "navigateTo": "Gå til: ",
            "parentViews": {
                "month": "Årsvisning",
                "year": "Tiårsvisning",
                "decade": "Århundrevisning"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "år",
            "month": "måned",
            "day": "dag",
            "weekday": "ukedag",
            "hour": "timer",
            "minute": "minutter",
            "second": "sekunder",
            "dayperiod": "AM/PM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "tøm",
            "noData": "Ingen data funnet."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "tøm",
            "noData": "Ingen data funnet.",
            "singleTag": "element(er) valgt"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "tøm",
            "noData": "Ingen data funnet.",
            "singleTag": "element(er) valgt"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Skriv en melding...",
            "toggleButton": "Veksle verktøylinje",
            "sendButton": "Send"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Tilbakestill",
            "previous": "Forrige",
            "next": "Neste",
            "done": "Ferdig",
            "step": "Trinn",
            "of": "av"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Dokument",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Zoomnivå",
                    "zoomOut": "Zoom ut",
                    "zoomIn": "Zoom inn",
                    "actualWidth": "Faktisk bredde",
                    "autoWidth": "Automatisk bredde",
                    "fitToWidth": "Tilpass til bredde",
                    "fitToPage": "Tilpass til side"
                },
                "open": "Åpne",
                "exportAs": "Eksporter",
                "download": "Last ned",
                "pager": {
                    "first": "Gå til første side",
                    "previous": "Gå til forrige side",
                    "next": "Gå til neste side",
                    "last": "Gå til siste side",
                    "of": "av",
                    "page": "side",
                    "pages": "sider"
                },
                "print": "Skriv ut",
                "toggleSelection": "Aktiver markering",
                "togglePan": "Aktiver panorering",
                "search": "Søk"
            },
            "errorMessages": {
                "notSupported": "Bare PDF-filer støttes.",
                "parseError": "PDF-filen kunne ikke behandles.",
                "notFound": "Filen ble ikke funnet.",
                "popupBlocked": "Popup er blokkert av nettleseren."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Regenerer captcha",
            "audio": "Spill av captcha-lyd",
            "imageAlt": "Skriv inn teksten fra captcha-bildet",
            "success": "Verifisering lyktes"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organisasjonskart",
            "edit": "Rediger",
            "create": "Opprett",
            "destroy": "Slett",
            "destroyContent": "Er du sikker på at du vil slette dette elementet og dets underordnede?",
            "destroyTitle": "Slett element",
            "cancel": "Avbryt",
            "save": "Lagre",
            "menuLabel": "Redigeringsmeny",
            "uploadAvatar": "Last opp nytt bilde",
            "parent": "Overordnet",
            "name": "Navn",
            "title": "Tittel",
            "none": "--Ingen--",
            "expand": "Utvid",
            "collapse": "Skjul"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Karttittel"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Enheter"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Ingen tilgjengelige data"
        });

}

  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Ingen poster å vise",
        "loading": "Laster...",
        "requestFailed": "Forespørsel feilet.",
        "retry": "Prøv igjen",
        "commands": {
          "edit": "Rediger",
          "update": "Lagre",
          "canceledit": "Avbryt",
          "create": "Legg til ny post",
          "createchild": "Legg til underpost",
          "destroy": "Slett",
          "excel": "Eksporter til Excel",
          "pdf": "Eksporter til PDF"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Ingen poster å vise",
        "loading": "Laster...",
        "requestFailed": "Forespørsel feilet.",
        "retry": "Prøv igjen",
        "commands": {
          "edit": "Rediger",
          "update": "Oppdater",
          "canceledit": "Avbryt",
          "create": "Legg til ny post",
          "createchild": "Legg til underpost",
          "destroy": "Slett",
          "excel": "Eksporter til Excel",
          "pdf": "Eksporter til PDF"
        }
      });
  }

})(window.kendo.jQuery);