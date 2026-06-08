(function($, undefined) {

/* FilterCell operators */

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

/* FilterMenu operator messages */

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
        "add": "Adăugați element nou",
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
            "contrastRatio": "Raport de contrast:",
            "fail": "Esuat",
            "pass": "Trecut",
            "hex": "HEX",
            "toggleFormat": "Comuta formatul",
            "red": "Rosu",
            "green": "Verde",
            "blue": "Albastru",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Aplica",
            "cancel": "Anuleaza",
            "noColor": "fara culoare",
            "clearColor": "Sterge culoarea"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Aplica",
            "cancel": "Anuleaza",
            "noColor": "fara culoare",
            "clearColor": "Sterge culoarea"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Inceput",
            "endLabel": "Sfarsit"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Incarca",
            "orderBy": "Sorteaza dupa",
            "orderByName": "Nume",
            "orderBySize": "Dimensiune",
            "directoryNotFound": "Directorul cu acest nume nu a fost gasit.",
            "emptyFolder": "Folder gol",
            "deleteFile": "Sunteti sigur ca doriti sa stergeti \"{0}\"?",
            "invalidFileType": "Fisierul selectat \"{0}\" nu este valid. Tipuri de fisiere acceptate: {1}.",
            "overwriteFile": "Un fisier cu numele \"{0}\" exista deja in directorul curent. Doriti sa-l suprascrieti?",
            "dropFilesHere": "trageti fisierul aici pentru a incarca",
            "search": "Cauta"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Folder nou",
                "upload": "Incarca",
                "sortDirection": "Directia de sortare",
                "sortDirectionAsc": "Crescator",
                "sortDirectionDesc": "Descrescator",
                "sortField": "Sorteaza dupa",
                "nameField": "Nume",
                "sizeField": "Dimensiune",
                "typeField": "Tip",
                "dateModifiedField": "Data modificarii",
                "dateCreatedField": "Data crearii",
                "listView": "Vizualizare lista",
                "gridView": "Vizualizare grila",
                "search": "Cauta",
                "details": "Detalii",
                "detailsChecked": "Da",
                "detailsUnchecked": "Nu",
                "Delete": "Sterge",
                "Rename": "Redenumeste"
            },
            "views": {
                "nameField": "Nume",
                "sizeField": "Dimensiune",
                "typeField": "Tip",
                "dateModifiedField": "Data modificarii",
                "dateCreatedField": "Data crearii",
                "items": "elemente"
            },
            "dialogs": {
                "upload": {
                    "title": "Incarca fisiere",
                    "clear": "Sterge",
                    "done": "Gata"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Doriti sa mutati sau sa copiati fisierele selectate?</p>",
                    "okText": "Copiaza",
                    "cancel": "Muta",
                    "close": "Inchide"
                },
                "deleteConfirm": {
                    "title": "Confirma stergerea",
                    "content": "<p class='k-text-center'>Sunteti sigur ca doriti sa stergeti fisierele selectate?<br/>Aceasta actiune nu poate fi anulata.</p>",
                    "okText": "Sterge",
                    "cancel": "Anuleaza",
                    "close": "Inchide"
                },
                "renamePrompt": {
                    "title": "Redenumeste",
                    "content": "<p class='k-text-center'>Introduceti noul nume al fisierului</p>",
                    "okText": "Redenumeste",
                    "cancel": "Anuleaza",
                    "close": "Inchide"
                }
            },
            "previewPane": {
                "noFileSelected": "Niciun fisier selectat",
                "extension": "Tip",
                "size": "Dimensiune",
                "created": "Data crearii",
                "createdUtc": "Data crearii (UTC)",
                "modified": "Data modificarii",
                "modifiedUtc": "Data modificarii (UTC)",
                "items": "elemente"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Adauga sarcina copil",
                "append": "Adauga sarcina",
                "insertAfter": "Insereaza dupa",
                "insertBefore": "Insereaza inainte",
                "pdf": "Exporta in PDF"
            },
            "cancel": "Anuleaza",
            "deleteDependencyWindowTitle": "Sterge dependenta",
            "deleteTaskWindowTitle": "Sterge sarcina",
            "destroy": "Sterge",
            "editor": {
                "assignButton": "Atribuie",
                "editorTitle": "Sarcina",
                "end": "Sfarsit",
                "percentComplete": "Finalizare",
                "resources": "Resurse",
                "resourcesEditorTitle": "Resurse",
                "resourcesHeader": "Resurse",
                "start": "Inceput",
                "title": "Titlu",
                "unitsHeader": "Unitati",
                "parent": "Parinte",
                "addNew": "Adauga",
                "name": "Nume"
            },
            "save": "Salveaza",
            "selectView": "Selecteaza vizualizarea",
            "views": {
                "day": "Zi",
                "end": "Sfarsit",
                "month": "Luna",
                "start": "Inceput",
                "week": "Saptamana",
                "year": "An"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Editeaza",
            "createNewCard": "Card nou",
            "create": "Creeaza",
            "search": "Cauta",
            "previewCard": "Previzualizare card",
            "addCard": "Adauga card",
            "editCard": "Editeaza card",
            "deleteCard": "Sterge card",
            "addColumn": "Adauga coloana",
            "editColumn": "Editeaza coloana",
            "deleteColumn": "Sterge coloana",
            "close": "Inchide",
            "cancel": "Anuleaza",
            "delete": "Sterge",
            "saveChanges": "Salveaza modificarile",
            "title": "Titlu:",
            "description": "Descriere:",
            "newColumn": "Coloana noua",
            "deleteColumnConfirm": "Sunteti sigur ca doriti sa stergeti aceasta coloana?",
            "deleteCardConfirm": "Sunteti sigur ca doriti sa stergeti acest card?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Creste valoarea",
            "downArrowText": "Scade valoarea"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pauza",
            "play": "Redare",
            "mute": "Dezactiveaza sunetul",
            "unmute": "Activeaza sunetul",
            "quality": "Calitate",
            "fullscreen": "Ecran complet"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Trageti campurile de date aici",
            "columnFields": "Trageti coloanele aici",
            "rowFields": "Trageti randurile aici"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Afiseaza elementele cu valoarea:",
            "sortAscending": "Crescator",
            "sortDescending": "Descrescator",
            "filterFields": "Filtru campuri",
            "filter": "Filtru",
            "include": "Include campuri...",
            "title": "Campuri de inclus",
            "clear": "Sterge",
            "ok": "OK",
            "cancel": "Anuleaza",
            "operators": {
                "contains": "Contine",
                "doesnotcontain": "Nu contine",
                "startswith": "Incepe cu",
                "endswith": "Se termina cu",
                "eq": "Este egal cu",
                "neq": "Nu este egal cu"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Setari",
            "cancelButtonText": "Anuleaza",
            "applyButtonText": "Aplica",
            "measures": "Selectati campuri pentru a incepe",
            "columns": "Selectati campuri pentru a incepe",
            "rows": "Selectati campuri pentru a incepe"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Aplica",
            "sortAscending": "Crescator",
            "sortDescending": "Descrescator",
            "filterFields": "Filtru campuri",
            "filter": "Filtru",
            "include": "Include campuri...",
            "clear": "Sterge",
            "reset": "Reseteaza",
            "moveToColumns": "Muta in coloane",
            "moveToRows": "Muta in randuri",
            "movePrevious": "Inapoi",
            "moveNext": "Inainte",
            "filterOperatorsDropDownLabel": "Operatori de filtru",
            "filterValueTextBoxLabel": "Valoare filtru",
            "operators": {
                "contains": "Contine",
                "doesnotcontain": "Nu contine",
                "startswith": "Incepe cu",
                "endswith": "Se termina cu",
                "eq": "Este egal cu",
                "neq": "Nu este egal cu"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Anuleaza",
            "update": "Salveaza",
            "endTitle": "Sfarsit repetare",
            "repeatTitle": "Model de repetare",
            "headerTitle": "Repeta evenimentul",
            "end": {
                "never": "Niciodata",
                "after": "Dupa",
                "on": "La data"
            },
            "daily": {
                "interval": "zi(le)"
            },
            "weekly": {
                "interval": "saptamana(i)"
            },
            "monthly": {
                "interval": "luna(i)",
                "repeatBy": "Repeta dupa: ",
                "dayOfMonth": "Ziua lunii",
                "dayOfWeek": "Ziua saptamanii"
            },
            "yearly": {
                "interval": "an(i)",
                "repeatBy": "Repeta dupa: ",
                "dayOfMonth": "Ziua lunii",
                "dayOfWeek": "Ziua saptamanii",
                "of": " din "
            },
            "endRule": {
                "after": " aparitii",
                "on": "La data "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Creste",
            "decreaseButtonTitle": "Scade",
            "dragHandleTitle": "Trage"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Sterge",
                "moveUp": "Sus",
                "moveDown": "Jos",
                "transferTo": "Transfera la",
                "transferFrom": "Transfera de la",
                "transferAllTo": "Transfera tot la",
                "transferAllFrom": "Transfera tot de la"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Se incarca...",
            "requestFailed": "Cererea a esuat.",
            "retry": "Reincearca"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} este obligatoriu",
            "pattern": "{0} nu este valid",
            "min": "{0} trebuie sa fie mai mare sau egal cu {1}",
            "max": "{0} trebuie sa fie mai mic sau egal cu {1}",
            "step": "{0} nu este valid",
            "email": "{0} nu este o adresa de e-mail valida",
            "url": "{0} nu este un URL valid",
            "date": "{0} nu este o data valida",
            "dateCompare": "Data de sfarsit trebuie sa fie dupa data de inceput"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Se incarca..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Seteaza",
            "cancel": "Anuleaza",
            "hour": "ora",
            "minute": "minut",
            "second": "secunda",
            "millisecond": "milisecunda",
            "now": "Acum"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Seteaza",
            "cancel": "Anuleaza",
            "hour": "ora",
            "minute": "minut",
            "second": "secunda",
            "millisecond": "milisecunda",
            "now": "Acum",
            "date": "Data",
            "time": "Ora",
            "today": "Astazi",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Astazi",
            "navigateTo": "Navigheaza la: ",
            "parentViews": {
                "month": "Vizualizare anuala",
                "year": "Vizualizare deceniu",
                "decade": "Vizualizare secol"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "an",
            "month": "luna",
            "day": "zi",
            "weekday": "zi a saptamanii",
            "hour": "ore",
            "minute": "minute",
            "second": "secunde",
            "dayperiod": "AM/PM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "sterge",
            "noData": "Nu s-au gasit date."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "sterge",
            "noData": "Nu s-au gasit date.",
            "singleTag": "element(e) selectat(e)"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "sterge",
            "noData": "Nu s-au gasit date.",
            "singleTag": "element(e) selectat(e)"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Scrieti un mesaj...",
            "toggleButton": "Comuta bara de instrumente",
            "sendButton": "Trimite"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Reseteaza",
            "previous": "Anterior",
            "next": "Urmator",
            "done": "Gata",
            "step": "Pas",
            "of": "din"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Document",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Nivel de zoom",
                    "zoomOut": "Micsoreaza",
                    "zoomIn": "Mareste",
                    "actualWidth": "Latime reala",
                    "autoWidth": "Latime automata",
                    "fitToWidth": "Potriveste la latime",
                    "fitToPage": "Potriveste la pagina"
                },
                "open": "Deschide",
                "exportAs": "Exporta",
                "download": "Descarca",
                "pager": {
                    "first": "Mergi la prima pagina",
                    "previous": "Mergi la pagina anterioara",
                    "next": "Mergi la pagina urmatoare",
                    "last": "Mergi la ultima pagina",
                    "of": "din",
                    "page": "pagina",
                    "pages": "pagini"
                },
                "print": "Tipareste",
                "toggleSelection": "Selectie",
                "togglePan": "Deplasare",
                "search": "Cauta"
            },
            "errorMessages": {
                "notSupported": "Sunt acceptate doar fisiere PDF.",
                "parseError": "Fisierul PDF nu a putut fi procesat.",
                "notFound": "Fisierul nu a fost gasit.",
                "popupBlocked": "Fereastra pop-up a fost blocata de browser."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Regenereaza captcha",
            "audio": "Reda sunetul captcha",
            "imageAlt": "Introduceti textul din imaginea captcha",
            "success": "Verificarea a fost reusita"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organigrama",
            "edit": "Editeaza",
            "create": "Creeaza",
            "destroy": "Sterge",
            "destroyContent": "Sunteti sigur ca doriti sa stergeti acest element si subordonatii sai?",
            "destroyTitle": "Sterge element",
            "cancel": "Anuleaza",
            "save": "Salveaza",
            "menuLabel": "Meniu de editare",
            "uploadAvatar": "Incarca imagine noua",
            "parent": "Parinte",
            "name": "Nume",
            "title": "Titlu",
            "none": "--Niciunul--",
            "expand": "Extinde",
            "collapse": "Restringe"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Titlul hartii"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Unitati"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Nu sunt date disponibile"
        });

}

  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Toate bordurile",
  "insideBorders": "Borduri interioare",
  "insideHorizontalBorders": "Borduri interioare orizontale",
  "insideVerticalBorders": "Borduri interioare verticale",
  "outsideBorders": "Borduri exterioare",
  "leftBorder": "Bordură stângă",
  "topBorder": "Bordură superioară",
  "rightBorder": "Bordură dreaptă",
  "bottomBorder": "Bordură inferioară",
  "noBorders": "Fără borduri",
  "reset": "Resetează culoarea",
  "customColor": "Culoare personalizată...",
  "apply": "Aplică",
  "cancel": "Anulează"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Aplică",
  "save": "Salvează",
  "cancel": "Anulează",
  "remove": "Șterge",
  "retry": "Reîncearcă",
  "revert": "Revino",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Număr",
      "currency": "Monedă",
      "date": "Dată"
    }
  },
  "fontFamilyDialog": { "title": "Font" },
  "fontSizeDialog": { "title": "Dimensiune font" },
  "bordersDialog": { "title": "Borduri" },
  "alignmentDialog": {
    "title": "Aliniere",
    "buttons": {
      "justifyLeft": "Aliniere stânga",
      "justifyCenter": "Centru",
      "justifyRight": "Aliniere dreapta",
      "justifyFull": "Justificare",
      "alignTop": "Aliniere sus",
      "alignMiddle": "Aliniere mijloc",
      "alignBottom": "Aliniere jos"
    }
  },
  "mergeDialog": {
    "title": "Îmbinare celule",
    "buttons": {
      "mergeCells": "Îmbinare toate",
      "mergeHorizontally": "Îmbinare orizontală",
      "mergeVertically": "Îmbinare verticală",
      "unmerge": "Anulare îmbinare"
    }
  },
  "freezeDialog": {
    "title": "Înghețare panouri",
    "buttons": {
      "freezePanes": "Înghețare panouri",
      "freezeRows": "Înghețare rânduri",
      "freezeColumns": "Înghețare coloane",
      "unfreeze": "Dezghețare panouri"
    }
  },
  "confirmationDialog": {
    "text": "Sigur doriți să eliminați această foaie?",
    "title": "Eliminare foaie"
  },
  "validationDialog": {
    "title": "Validare date",
    "hintMessage": "Vă rugăm introduceți o valoare {0} validă {1}.",
    "hintTitle": "Validare {0}",
    "criteria": {
      "any": "Orice valoare",
      "number": "Număr",
      "text": "Text",
      "date": "Dată",
      "custom": "Formulă personalizată",
      "list": "Listă"
    },
    "comparers": {
      "greaterThan": "mai mare decât",
      "lessThan": "mai mic decât",
      "between": "între",
      "notBetween": "nu între",
      "equalTo": "egal cu",
      "notEqualTo": "diferit de",
      "greaterThanOrEqualTo": "mai mare sau egal cu",
      "lessThanOrEqualTo": "mai mic sau egal cu"
    },
    "comparerMessages": {
      "greaterThan": "mai mare decât {0}",
      "lessThan": "mai mic decât {0}",
      "between": "între {0} și {1}",
      "notBetween": "nu între {0} și {1}",
      "equalTo": "egal cu {0}",
      "notEqualTo": "diferit de {0}",
      "greaterThanOrEqualTo": "mai mare sau egal cu {0}",
      "lessThanOrEqualTo": "mai mic sau egal cu {0}",
      "custom": "care satisface formula: {0}"
    },
    "labels": {
      "criteria": "Criteriu",
      "comparer": "Comparator",
      "min": "Min",
      "max": "Max",
      "value": "Valoare",
      "start": "Început",
      "end": "Sfârșit",
      "onInvalidData": "La date invalide",
      "rejectInput": "Respinge introducerea",
      "showWarning": "Afișează avertisment",
      "showHint": "Afișează indiciu",
      "hintTitle": "Titlu indiciu",
      "hintMessage": "Mesaj indiciu",
      "ignoreBlank": "Ignoră celulele goale"
    },
    "placeholders": {
      "typeTitle": "Introduceți titlul",
      "typeMessage": "Introduceți mesajul"
    }
  },
  "exportAsDialog": {
    "title": "Export...",
    "labels": {
      "fileName": "Nume fișier",
      "saveAsType": "Tip fișier",
      "exportArea": "Export",
      "paperSize": "Dimensiune hârtie",
      "margins": "Margini",
      "orientation": "Orientare",
      "print": "Tipărire",
      "guidelines": "Linii ghid",
      "center": "Centru",
      "horizontally": "Orizontal",
      "vertically": "Vertical"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nu se poate modifica o parte a unei celule îmbinate."
  },
  "useKeyboardDialog": {
    "title": "Copiere și lipire",
    "errorMessage": "Aceste acțiuni nu pot fi invocate prin meniu. Folosiți combinațiile de taste:",
    "labels": {
      "forCopy": "pentru copiere",
      "forCut": "pentru tăiere",
      "forPaste": "pentru lipire"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Acțiunea nu poate fi executată pe selecție multiplă."
  },
  "insertCommentDialog": {
    "title": "Inserare comentariu",
    "labels": {
      "comment": "Comentariu",
      "removeComment": "Eliminare comentariu"
    }
  },
  "insertImageDialog": {
    "title": "Inserare imagine",
    "info": "Trageți o imagine aici sau faceți clic pentru a selecta",
    "typeError": "Vă rugăm selectați o imagine JPEG, PNG sau GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sortare de la A la Z",
  "sortDescending": "Sortare de la Z la A",
  "filterByValue": "Filtrare după valoare",
  "filterByCondition": "Filtrare după condiție",
  "apply": "Aplică",
  "search": "Căutare",
  "addToCurrent": "Adăugare la selecția curentă",
  "clear": "Șterge",
  "blanks": "(Gol)",
  "operatorNone": "Niciunul",
  "and": "ȘI",
  "or": "SAU",
  "operators": {
    "string": {
      "contains": "Textul conține",
      "doesnotcontain": "Textul nu conține",
      "startswith": "Textul începe cu",
      "endswith": "Textul se termină cu"
    },
    "date": {
      "eq": "Data este",
      "neq": "Data nu este",
      "lt": "Data este înainte de",
      "gt": "Data este după"
    },
    "number": {
      "eq": "Este egal cu",
      "neq": "Nu este egal cu",
      "gte": "Este mai mare sau egal cu",
      "gt": "Este mai mare decât",
      "lte": "Este mai mic sau egal cu",
      "lt": "Este mai mic decât"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Resetează culoarea",
  "customColor": "Culoare personalizată...",
  "apply": "Aplică",
  "cancel": "Anulează"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Adăugare coloană la stânga",
  "addColumnRight": "Adăugare coloană la dreapta",
  "addRowAbove": "Adăugare rând deasupra",
  "addRowBelow": "Adăugare rând dedesubt",
  "alignment": "Aliniere",
  "alignmentButtons": {
    "justifyLeft": "Aliniere stânga",
    "justifyCenter": "Centru",
    "justifyRight": "Aliniere dreapta",
    "justifyFull": "Justificare",
    "alignTop": "Aliniere sus",
    "alignMiddle": "Aliniere mijloc",
    "alignBottom": "Aliniere jos"
  },
  "backgroundColor": "Fundal",
  "bold": "Îngroșat",
  "borders": "Borduri",
  "colorPicker": {
    "reset": "Resetează culoarea",
    "customColor": "Culoare personalizată..."
  },
  "copy": "Copiere",
  "cut": "Tăiere",
  "deleteColumn": "Ștergere coloană",
  "deleteRow": "Ștergere rând",
  "excelImport": "Import din Excel...",
  "filter": "Filtru",
  "fontFamily": "Font",
  "fontSize": "Dimensiune font",
  "format": "Format personalizat...",
  "formatTypes": {
    "automatic": "Automat",
    "number": "Număr",
    "percent": "Procent",
    "financial": "Financiar",
    "currency": "Monedă",
    "date": "Dată",
    "time": "Oră",
    "dateTime": "Dată oră",
    "duration": "Durată",
    "moreFormats": "Mai multe formate..."
  },
  "formatDecreaseDecimal": "Scădere zecimale",
  "formatIncreaseDecimal": "Creștere zecimale",
  "freeze": "Înghețare panouri",
  "freezeButtons": {
    "freezePanes": "Înghețare panouri",
    "freezeRows": "Înghețare rânduri",
    "freezeColumns": "Înghețare coloane",
    "unfreeze": "Dezghețare panouri"
  },
  "insertComment": "Inserare comentariu",
  "insertImage": "Inserare imagine",
  "italic": "Cursiv",
  "merge": "Îmbinare celule",
  "mergeButtons": {
    "mergeCells": "Îmbinare toate",
    "mergeHorizontally": "Îmbinare orizontală",
    "mergeVertically": "Îmbinare verticală",
    "unmerge": "Anulare îmbinare"
  },
  "open": "Deschide...",
  "paste": "Lipire",
  "quickAccess": {
    "redo": "Refacere",
    "undo": "Anulare"
  },
  "saveAs": "Salvare ca...",
  "sortAsc": "Sortare ascendentă",
  "sortDesc": "Sortare descendentă",
  "sortButtons": {
    "sortSheetAsc": "Sortare foaie A la Z",
    "sortSheetDesc": "Sortare foaie Z la A",
    "sortRangeAsc": "Sortare interval A la Z",
    "sortRangeDesc": "Sortare interval Z la A"
  },
  "textColor": "Culoare text",
  "textWrap": "Încadrare text",
  "underline": "Subliniere",
  "validation": "Validare date..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "Casetă nume",
  "formulaInput": "Introducere formulă",
  "errors": {
    "shiftingNonblankCells": "Nu se pot insera celule din cauza posibilei pierderi de date. Selectați altă locație sau ștergeți datele de la sfârșitul foii.",
    "filterRangeContainingMerges": "Nu se poate crea un filtru într-un interval care conține celule îmbinate",
    "validationError": "Valoarea introdusă încalcă regulile de validare ale celulei."
  },
  "tabs": {
    "home": "Acasă",
    "insert": "Inserare",
    "data": "Date"
  },
  "sheetBar": {
    "addSheet": "Adăugare foaie nouă",
    "deleteSheet": "Ștergere",
    "duplicateSheet": "Duplicare",
    "renameSheet": "Redenumire",
    "hideSheet": "Ascundere",
    "moveRight": "Mutare la dreapta",
    "moveLeft": "Mutare la stânga"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Nicio căutare anterioară",
        "noPreviousPrompts": "Nicio solicitare anterioară",
        "previousSearches": "Căutări anterioare",
        "previousPrompts": "Solicitări anterioare",
        "suggestedPrompts": "Solicitări sugerate",
        "searchModeLabel": "Căutare",
        "searchModeDescription": "Caută potriviri exacte de cuvinte în datele dvs.",
        "searchPlaceholder": "Căutare",
        "semanticSearchModeLabel": "Căutare semantică",
        "semanticSearchModeDescription": "Înțelege contextul pentru a afișa cele mai relevante rezultate.",
        "semanticSearchPlaceholder": "Căutare semantică",
        "semanticSearchButtonText": "Căutare",
        "aiAssistantPlaceholder": "Sortare, filtrare sau grupare cu AI",
        "speechToText": "Voce în text",
        "speechToTextAriaLabel": "Porniți recunoașterea vocală",
        "cancel": "Anulare",
        "send": "Trimite",
        "searchButtonText": "Căutare",
        "aiAssistantButtonText": "Asistent AI"
      });
  }

})(window.kendo.jQuery);