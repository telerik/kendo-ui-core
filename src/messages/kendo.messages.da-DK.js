(function($, undefined) {

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Er lig med",
    "gte": "Er senere end eller lig med",
    "gt": "Er senere end",
    "lte": "Er før eller lig med",
    "lt": "Er før",
    "neq": "Er ikke lig med"
  },
  "number": {
    "eq": "Er lig med",
    "gte": "Er større end eller lig med",
    "gt": "Er større end",
    "lte": "Er mindre end eller lig med",
    "lt": "Er mindre end",
    "neq": "Er forskellig fra"
  },
  "string": {
    "endswith": "Slutter med",
    "eq": "Er lig med",
    "neq": "Er forskellig fra",
    "startswith": "Begynder med",
    "contains": "Indeholder",
    "doesnotcontain": "Ikke indeholder"
  },
  "enums": {
    "eq": "Er lig med",
    "neq": "Er ikke lig med"
  }
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Er lig med",
    "gte": "Er senere end eller lig med",
    "gt": "Er senere end",
    "lte": "Er før eller lig med",
    "lt": "Er før",
    "neq": "Er forskellig fra"
  },
  "number": {
    "eq": "Er lig med",
    "gte": "Er større end eller lig med",
    "gt": "Er større end",
    "lte": "Er mindre end eller lig med",
    "lt": "Er mindre end",
    "neq": "Er forskellig fra"
  },
  "string": {
    "endswith": "Slutter med",
    "eq": "Er lig med",
    "neq": "Er forskellig fra",
    "startswith": "Begynder med",
    "contains": "Indeholder",
    "doesnotcontain": "Ikke indeholder"
  },
  "enums": {
    "eq": "Er lig med",
    "neq": "Er ikke lig med"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Søg"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Кolonner",
  "sortAscending": "Sorter Stigende",
  "sortDescending": "Sorter Faldende",
  "settings": "Kolonneindstillinger",
  "done": "Udført",
  "lock": "Lås",
  "unlock": "Lås op"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "days(s)",
    "repeatEvery": "Gentag hver:"
  },
  "end": {
    "after": "Efter",
    "occurrence": "forekomst(er)",
    "label": "Slut:",
    "never": "Aldrig",
    "on": "Den",
    "mobileLabel": "Slutter"
  },
  "frequencies": {
    "daily": "Daglig",
    "monthly": "Månedlig",
    "never": "Aldrig",
    "weekly": "Ugentlig",
    "yearly": "Årlig"
  },
  "monthly": {
    "day": "Dag",
    "interval": "måned(er)",
    "repeatEvery": "Gentag hver:",
    "repeatOn": "Gentag den:"
  },
  "offsetPositions": {
    "first": "første",
    "fourth": "fjerde",
    "last": "sidste",
    "second": "anden",
    "third": "tredje"
  },
  "weekly": {
    "repeatEvery": "Gentag hver:",
    "repeatOn": "Gentag den:",
    "interval": "uge(r)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Gentag hvert:",
    "repeatOn": "Gentag den:",
    "interval": "år"
  },
  "weekdays": {
    "day": "dag",
    "weekday": "ugedag",
    "weekend": "weekend dag"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Indsæt",
    "destroy": "Slet",
    "canceledit": "Fortryd",
    "update": "Opdatér",
    "edit": "Redigér",
    "excel": "Eksportér til Excel",
    "pdf": "Eksportér til PDF",
    "select": "Vælg",
    "cancel": "Fortryd ændringer",
    "save": "Gem ændringer"
  },
  "editable": {
    "confirmation": "Er du sikker på, at du ønsker at slette denne række?",
    "cancelDelete": "Annullér",
    "confirmDelete": "Slet"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "page": "Side",
  "display": "Viser rækker {0} - {1} af {2}",
  "of": "af {0}",
  "empty": "Ingen rækker at vise.",
  "refresh": "Opdatér",
  "first": "Gå til første side",
  "itemsPerPage": "emner pr side",
  "last": "Gå til sidste side",
  "next": "Gå til næste side",
  "previous": "Gå til forrige side",
  "morePages": "Flere sider"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
    $.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
      "allPages": "All",
      "page": "Side",
      "display": "Viser rækker {0} - {1} af {2}",
      "of": "af {0}",
      "empty": "Ingen rækker at vise.",
      "refresh": "Opdatér",
      "first": "Gå til første side",
      "itemsPerPage": "emner pr side",
      "last": "Gå til sidste side",
      "next": "Gå til næste side",
      "previous": "Gå til forrige side",
      "morePages": "Flere sider"
    });
    }

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Filter",
  "clear": "Nulstil",
  "isFalse": "er falskt",
  "isTrue": "er sandt",
  "operator": "Operatør"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filter",
  "and": "Og",
  "clear": "Nulstil",
  "info": "Vis rækker som",
  "title": "Vis rækker som",
  "selectValue": "-Vælg værdi-",
  "isFalse": "er falskt",
  "isTrue": "er sandt",
  "cancel": "Annuller",
  "operator": "Operatør",
  "value": "Value",
  "or": "Eller"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "requestFailed": "Request failed.",
    "retry": "Forsøg igen",
    "commands": {
        "edit": "Redigér",
        "update": "Opdatér",
        "canceledit": "Fortryd",
        "cancel": "Fortryd",
        "create": "Indsæt",
        "createchild": "Add child record",
        "destroy": "Slet"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Træk en kolonneoverskrift herover for at gruppére på den kolonne"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Fed",
  "createLink": "Indsæt link",
  "fontName": "Vælg font",
  "fontNameInherit": "(nedarvet font)",
  "fontSize": "Vælg font størrelse",
  "fontSizeInherit": "(nedarvet størrelse)",
  "formatBlock": "Vælg blok type",
  "indent": "Indryk",
  "insertHtml": "Indsæt HTML",
  "insertImage": "Indsæt billede",
  "insertOrderedList": "Indsæt ordnet liste",
  "insertUnorderedList": "Indsæt uordnet liste",
  "italic": "Kursiv",
  "justifyCenter": "Centrér tekst",
  "justifyFull": "Justér",
  "justifyLeft": "Venstrejustér tekst",
  "justifyRight": "Højrejustér tekst",
  "outdent": "Ryk ud",
  "strikethrough": "Gennemstreget",
  "style": "Stilarter",
  "subscript": "Sænket skrift",
  "superscript": "Hævet skrift",
  "underline": "Understreget",
  "unlink": "Fjern link",
  "deleteFile": "Er du sikker på, at du ønsker at slette \"{0}\"?",
  "directoryNotFound": "En mappe med dette navn blev ikke fundet",
  "emptyFolder": "Tom mappe",
  "invalidFileType": "Den valgte fil \"{0}\" er ugyldig. Understøttede filtyper er {1}.",
  "orderBy": "Arrangér efter:",
  "orderByName": "Navn",
  "orderBySize": "Størrelse",
  "overwriteFile": "'En fil ved navn \"{0}\" eksisterer allerede i den aktuelle mappe. Ønsker du at overskrive den?",
  "uploadFile": "Upload",
  "backColor": "Baggrundsfarve",
  "foreColor": "Farve",
  "dialogButtonSeparator": "eller",
  "dialogCancel": "Fortryd",
  "dialogInsert": "Insæt",
  "imageAltText": "Alternativ tekst",
  "imageWebAddress": "Web adresse",
  "linkOpenInNewWindow": "Åben link i nyt vindue",
  "linkText": "Tekst",
  "linkToolTip": "Tooltip",
  "linkWebAddress": "Web adresse",
  "search": "Søg",
  "addColumnLeft": "Tilføj kolonne til venstre",
  "addColumnRight": "Tilføj kolonne til højre",
  "addRowAbove": "Tilføj kolonne over",
  "addRowBelow": "Tilføj kolonne under",
  "deleteColumn": "Slet kolonne",
  "deleteRow": "Slet række",
  "createTable": "Opret tabel",
  "dropFilesHere": "træk og slip filer for at uploade",
  "formatting": "Formatér",
  "viewHtml": "Vis HTML",
  "dialogUpdate": "Opdater",
  "insertFile": "Indsæt fil"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Fortryd",
  "dropFilesHere": "Træk filer herover for at uploade dem",
  "remove": "Fjern",
  "retry": "Forsøg igen",
  "select": "Vælg...",
  "statusFailed": "fejlet",
  "statusUploaded": "uploadet",
  "statusUploading": "uploader",
  "uploadSelectedFiles": "Upload filer",
  "headerStatusUploaded": "Færdig",
  "headerStatusUploading": "Uploader..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "hele dagen",
  "cancel": "Fortryd",
  "editable": {
    "confirmation": "Er du sikker på at du vil slette denne begivenhed?"
  },
  "date": "Dato",
  "destroy": "Slet",
  "editor": {
    "allDayEvent": "Hele dagen",
    "description": "Beskrivelse",
    "editorTitle": "Begivenhed",
    "end": "Slut",
    "endTimezone": "Slut tidszone",
    "repeat": "Gentag",
    "separateTimezones": "Brug forskellige start og slut tidszoner",
    "start": "Start",
    "startTimezone": "Start tidszone",
    "timezone": " ",
    "timezoneEditorButton": "Tidszone",
    "timezoneEditorTitle": "Tidszoner",
    "title": "Titel",
    "noTimezone": "Ingen tidszone"
  },
  "event": "Begivenhed",
  "recurrenceMessages": {
    "deleteRecurring": "Vil du kun slette denne hændelse eller hele serien?",
    "deleteWindowOccurrence": "Slet denne hændelse",
    "deleteWindowSeries": "Slet hele serien",
    "deleteWindowTitle": "Slet tilbagevendende hændelse",
    "editRecurring": "Vil du kun redigere denne hændelse eller hele serien?",
    "editWindowOccurrence": "Rediger denne hændelse",
    "editWindowSeries": "Rediger hele serien",
    "editWindowTitle": "Rediger tilbagevendende hændelse"
  },
  "save": "Gem",
  "time": "Tid",
  "today": "I dag",
  "views": {
    "agenda": "Agenda",
    "day": "Dag",
    "month": "Måned",
    "week": "Uge",
    "workWeek": "Arbejdsuge",
    "timeline": "Tidslinie"
  },
  "deleteWindowTitle": "Slet begivenhed",
  "showFullDay": "Vis hel dag",
  "showWorkDay": "Vis arbejdsdag"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization,{
  "close": "Lukke"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization,{
  "okText": "Okay"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization,{
  "okText": "Okay",
  "cancel": "Annuller"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization,{
  "okText": "Okay",
  "cancel": "Annuller"
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
            "pass": "Bestået",
            "hex": "HEX",
            "toggleFormat": "Skift format",
            "red": "Rød",
            "green": "Grøn",
            "blue": "Blå",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Anvend",
            "cancel": "Annuller",
            "noColor": "ingen farve",
            "clearColor": "Ryd farve"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Anvend",
            "cancel": "Annuller",
            "noColor": "ingen farve",
            "clearColor": "Ryd farve"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Start",
            "endLabel": "Slut"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Upload",
            "orderBy": "Sorter efter",
            "orderByName": "Navn",
            "orderBySize": "Størrelse",
            "directoryNotFound": "En mappe med dette navn blev ikke fundet.",
            "emptyFolder": "Tom mappe",
            "deleteFile": "Er du sikker på, at du vil slette \"{0}\"?",
            "invalidFileType": "Den valgte fil \"{0}\" er ugyldig. Understøttede filtyper er {1}.",
            "overwriteFile": "En fil med navnet \"{0}\" findes allerede i den aktuelle mappe. Vil du overskrive den?",
            "dropFilesHere": "slip fil her for at uploade",
            "search": "Søg"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Ny mappe",
                "upload": "Upload",
                "sortDirection": "Sorteringsretning",
                "sortDirectionAsc": "Stigende",
                "sortDirectionDesc": "Faldende",
                "sortField": "Sorter efter",
                "nameField": "Navn",
                "sizeField": "Størrelse",
                "typeField": "Type",
                "dateModifiedField": "Ændret dato",
                "dateCreatedField": "Oprettet dato",
                "listView": "Listevisning",
                "gridView": "Gittervisning",
                "search": "Søg",
                "details": "Detaljer",
                "detailsChecked": "Ja",
                "detailsUnchecked": "Nej",
                "Delete": "Slet",
                "Rename": "Omdøb"
            },
            "views": {
                "nameField": "Navn",
                "sizeField": "Størrelse",
                "typeField": "Type",
                "dateModifiedField": "Ændret dato",
                "dateCreatedField": "Oprettet dato",
                "items": "elementer"
            },
            "dialogs": {
                "upload": {
                    "title": "Upload filer",
                    "clear": "Ryd",
                    "done": "Færdig"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Vil du flytte eller kopiere de valgte filer?</p>",
                    "okText": "Kopier",
                    "cancel": "Flyt",
                    "close": "Luk"
                },
                "deleteConfirm": {
                    "title": "Bekræft sletning",
                    "content": "<p class='k-text-center'>Er du sikker på, at du vil slette de valgte filer?<br/>Denne handling kan ikke fortrydes.</p>",
                    "okText": "Slet",
                    "cancel": "Annuller",
                    "close": "Luk"
                },
                "renamePrompt": {
                    "title": "Omdøb",
                    "content": "<p class='k-text-center'>Indtast et nyt filnavn</p>",
                    "okText": "Omdøb",
                    "cancel": "Annuller",
                    "close": "Luk"
                }
            },
            "previewPane": {
                "noFileSelected": "Ingen fil valgt",
                "extension": "Type",
                "size": "Størrelse",
                "created": "Oprettet dato",
                "createdUtc": "Oprettet dato (UTC)",
                "modified": "Ændret dato",
                "modifiedUtc": "Ændret dato (UTC)",
                "items": "elementer"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Tilføj underopgave",
                "append": "Tilføj opgave",
                "insertAfter": "Indsæt efter",
                "insertBefore": "Indsæt før",
                "pdf": "Eksportér til PDF"
            },
            "cancel": "Annuller",
            "deleteDependencyWindowTitle": "Slet afhængighed",
            "deleteTaskWindowTitle": "Slet opgave",
            "destroy": "Slet",
            "editor": {
                "assignButton": "Tildel",
                "editorTitle": "Opgave",
                "end": "Slut",
                "percentComplete": "Færdiggørelse",
                "resources": "Ressourcer",
                "resourcesEditorTitle": "Ressourcer",
                "resourcesHeader": "Ressourcer",
                "start": "Start",
                "title": "Titel",
                "unitsHeader": "Enheder",
                "parent": "Overordnet",
                "addNew": "Tilføj",
                "name": "Navn"
            },
            "save": "Gem",
            "selectView": "Vælg visning",
            "views": {
                "day": "Dag",
                "end": "Slut",
                "month": "Måned",
                "start": "Start",
                "week": "Uge",
                "year": "År"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Rediger",
            "createNewCard": "Nyt kort",
            "create": "Opret",
            "search": "Søg",
            "previewCard": "Forhåndsvis kort",
            "addCard": "Tilføj kort",
            "editCard": "Rediger kort",
            "deleteCard": "Slet kort",
            "addColumn": "Tilføj kolonne",
            "editColumn": "Rediger kolonne",
            "deleteColumn": "Slet kolonne",
            "close": "Luk",
            "cancel": "Annuller",
            "delete": "Slet",
            "saveChanges": "Gem ændringer",
            "title": "Titel:",
            "description": "Beskrivelse:",
            "newColumn": "Ny kolonne",
            "deleteColumnConfirm": "Er du sikker på, at du vil slette denne kolonne?",
            "deleteCardConfirm": "Er du sikker på, at du vil slette dette kort?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Forøg værdi",
            "downArrowText": "Formindsk værdi"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pause",
            "play": "Afspil",
            "mute": "Lydløs",
            "unmute": "Lyd til",
            "quality": "Kvalitet",
            "fullscreen": "Fuld skærm"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Slip datafelter her",
            "columnFields": "Slip kolonnefelter her",
            "rowFields": "Slip rækkefelter her"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Vis elementer med værdi der:",
            "sortAscending": "Stigende rækkefølge",
            "sortDescending": "Faldende rækkefølge",
            "filterFields": "Feltfilter",
            "filter": "Filter",
            "include": "Inkluder felter...",
            "title": "Felter at inkludere",
            "clear": "Ryd",
            "ok": "Ok",
            "cancel": "Annuller",
            "operators": {
                "contains": "Indeholder",
                "doesnotcontain": "Indeholder ikke",
                "startswith": "Starter med",
                "endswith": "Slutter med",
                "eq": "Er lig med",
                "neq": "Er ikke lig med"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Indstillinger",
            "cancelButtonText": "Annuller",
            "applyButtonText": "Anvend",
            "measures": "Vælg felter for at starte",
            "columns": "Vælg felter for at starte",
            "rows": "Vælg felter for at starte"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Anvend",
            "sortAscending": "Stigende rækkefølge",
            "sortDescending": "Faldende rækkefølge",
            "filterFields": "Feltfilter",
            "filter": "Filter",
            "include": "Inkluder felter...",
            "clear": "Ryd",
            "reset": "Nulstil",
            "moveToColumns": "Flyt til kolonner",
            "moveToRows": "Flyt til rækker",
            "movePrevious": "Flyt tilbage",
            "moveNext": "Flyt frem",
            "filterOperatorsDropDownLabel": "Filteroperatorer",
            "filterValueTextBoxLabel": "Filterværdi",
            "operators": {
                "contains": "Indeholder",
                "doesnotcontain": "Indeholder ikke",
                "startswith": "Starter med",
                "endswith": "Slutter med",
                "eq": "Er lig med",
                "neq": "Er ikke lig med"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Annuller",
            "update": "Gem",
            "endTitle": "Slut gentagelse",
            "repeatTitle": "Gentagelsesmønster",
            "headerTitle": "Gentag begivenhed",
            "end": {
                "never": "Aldrig",
                "after": "Efter",
                "on": "På"
            },
            "daily": {
                "interval": "dag(e)"
            },
            "weekly": {
                "interval": "uge(r)"
            },
            "monthly": {
                "interval": "måned(er)",
                "repeatBy": "Gentag efter: ",
                "dayOfMonth": "Dag i måneden",
                "dayOfWeek": "Ugedag"
            },
            "yearly": {
                "interval": "år",
                "repeatBy": "Gentag efter: ",
                "dayOfMonth": "Dag i måneden",
                "dayOfWeek": "Ugedag",
                "of": " af "
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
                "shiftingNonblankCells": "Kan ikke indsætte celler på grund af mulighed for datatab.",
                "filterRangeContainingMerges": "Kan ikke oprette et filter inden for et område der indeholder fletninger",
                "cannotModifyDisabled": "Kan ikke ændre deaktiverede celler."
            },
            "tabs": {
                "home": "Hjem",
                "insert": "Indsæt",
                "data": "Data"
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Forøg",
            "decreaseButtonTitle": "Formindsk",
            "dragHandleTitle": "Træk"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Slet",
                "moveUp": "Flyt op",
                "moveDown": "Flyt ned",
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
            "loading": "Indlæser...",
            "requestFailed": "Anmodningen mislykkedes.",
            "retry": "Prøv igen"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} er påkrævet",
            "pattern": "{0} er ikke gyldig",
            "min": "{0} skal være større end eller lig med {1}",
            "max": "{0} skal være mindre end eller lig med {1}",
            "step": "{0} er ikke gyldig",
            "email": "{0} er ikke en gyldig e-mailadresse",
            "url": "{0} er ikke en gyldig URL",
            "date": "{0} er ikke en gyldig dato",
            "dateCompare": "Slutdato skal være efter startdato"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Indlæser..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Indstil",
            "cancel": "Annuller",
            "hour": "time",
            "minute": "minut",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nu"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Indstil",
            "cancel": "Annuller",
            "hour": "time",
            "minute": "minut",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nu",
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
                "year": "Årtivisning",
                "decade": "Århundredevisning"
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
            "weekday": "ugedag",
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
            "clear": "ryd",
            "noData": "Ingen data fundet."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "ryd",
            "noData": "Ingen data fundet.",
            "singleTag": "element(er) valgt"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "ryd",
            "noData": "Ingen data fundet.",
            "singleTag": "element(er) valgt"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Skriv en besked...",
            "toggleButton": "Skift værktøjslinje",
            "sendButton": "Send"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Nulstil",
            "previous": "Forrige",
            "next": "Næste",
            "done": "Færdig",
            "step": "Trin",
            "of": "af"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Dokument",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Zoomniveau",
                    "zoomOut": "Zoom ud",
                    "zoomIn": "Zoom ind",
                    "actualWidth": "Faktisk bredde",
                    "autoWidth": "Automatisk bredde",
                    "fitToWidth": "Tilpas til bredde",
                    "fitToPage": "Tilpas til side"
                },
                "open": "Åbn",
                "exportAs": "Eksportér",
                "download": "Download",
                "pager": {
                    "first": "Gå til første side",
                    "previous": "Gå til forrige side",
                    "next": "Gå til næste side",
                    "last": "Gå til sidste side",
                    "of": "af",
                    "page": "side",
                    "pages": "sider"
                },
                "print": "Udskriv",
                "toggleSelection": "Aktivér markering",
                "togglePan": "Aktivér panorering",
                "search": "Søg"
            },
            "errorMessages": {
                "notSupported": "Kun PDF-filer understøttes.",
                "parseError": "PDF-filen kunne ikke behandles.",
                "notFound": "Filen blev ikke fundet.",
                "popupBlocked": "Popup er blokeret af browseren."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Regenerer captcha",
            "audio": "Afspil captcha-lyd",
            "imageAlt": "Indtast teksten fra captcha-billedet",
            "success": "Verifikation lykkedes"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organisationsdiagram",
            "edit": "Rediger",
            "create": "Opret",
            "destroy": "Slet",
            "destroyContent": "Er du sikker på, at du vil slette dette element og dets underordnede?",
            "destroyTitle": "Slet element",
            "cancel": "Annuller",
            "save": "Gem",
            "menuLabel": "Redigeringsmenu",
            "uploadAvatar": "Upload nyt billede",
            "parent": "Overordnet",
            "name": "Navn",
            "title": "Titel",
            "none": "--Ingen--",
            "expand": "Udvid",
            "collapse": "Skjul"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Korttitel"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Enheder"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Ingen tilgængelige data"
        });

}

})(window.kendo.jQuery);