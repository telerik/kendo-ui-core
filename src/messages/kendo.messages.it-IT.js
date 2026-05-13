(function($, undefined) {

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "È uguale a",
    "gt": "È dopo",
    "gte": "È dopo o uguale a",
    "lt": "È prima",
    "lte": "È prima o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "number": {
    "eq": "È uguale a",
    "gt": "È più grande di",
    "gte": "È più grande o uguale a",
    "lt": "È più piccolo di",
    "lte": "È più piccolo o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "string": {
    "contains": "Contiene",
    "doesnotcontain": "Non contiene",
    "endswith": "Finisce con",
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "startswith": "Inizia con",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo",
    "isempty": "È vuoto",
    "isnotempty": "Non è vuoto"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "È uguale a",
    "gt": "È dopo",
    "gte": "È dopo o uguale a",
    "lt": "È prima",
    "lte": "È prima o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "number": {
    "eq": "È uguale a",
    "gt": "È più grande di",
    "gte": "È più grande o uguale a",
    "lt": "È più piccolo di",
    "lte": "È più piccolo o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "string": {
    "contains": "Contiene",
    "doesnotcontain": "Non contiene",
    "endswith": "Finisce con",
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "startswith": "Inizia con",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo",
    "isempty": "È vuoto",
    "isnotempty": "Non è vuoto"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colonne",
  "filter": "Filtro",
  "sortAscending": "In ordine crescente",
  "sortDescending": "In ordine decrescente",
  "settings": "Impostazioni colonna",
  "done": "Fatto",
  "lock": "Bloccare",
  "unlock": "Sbloccare"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "repeat": "Ripeti",
  "daily": {
    "interval": "giorno(i)",
    "repeatEvery": "Ripeti ogni: "
  },
  "end": {
    "after": "Dopo",
    "occurrence": "Occorrenza(e)",
    "label": "Fine:",
    "never": "Mai",
    "on": "Il",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Ogni giorno",
    "monthly": "Ogni mese",
    "never": "Mai",
    "weekly": "Ogni settimana",
    "yearly": "Ogni anno"
  },
  "monthly": {
    "day": "Giorno",
    "interval": "mese(i)",
    "repeatEvery": "Ripeti ogni: ",
    "repeatOn": "Repeti quando:: ",
    "date": "Data"
  },
  "offsetPositions": {
    "first": "primo",
    "fourth": "quarto",
    "last": "ultimo",
    "second": "secondo",
    "third": "terzo"
  },
  "weekly": {
    "repeatEvery": "Ripeti ogni:",
    "repeatOn": "Ripeti quando:",
    "interval": "settimana(e)"
  },
  "yearly": {
    "of": "di",
    "repeatEvery": "Ripeti ogni:",
    "repeatOn": "Ripeti quando:",
    "interval": "anno(i)",
    "month": "mese",
    "day": "giorno",
    "date": "Data"
  },
  "weekdays": {
    "day": "giorno",
    "weekday": "giorno della settimana",
    "weekend": "giorno finesettimana"
  }
});
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
      "endTitle": "Fine ripetizione",
      "repeatTitle": "Modello di ripetizione",
      "headerTitle": "Ripeti appuntamento",
      "end": {
        "patterns": {
            "never": "Mai",
            "after": "Dopo...",
            "on": "Il..."
        }
      },
      "monthly": {
        "repeatBy": "Ripeti per: ",
        "dayOfMonth": "Data del mese",
        "dayOfWeek": "Giorno della settimana",
        "every": "Ogni"
      },
      "yearly": {
        "repeatBy": "Ripeti per: ",
        "dayOfMonth": "Data del mese",
        "dayOfWeek": "Giorno della settimana",
        "every": "Ogni",
        "month": "Mese",
        "day": "Giorno"
      }
    });
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Rimuovi",
  "filter": "Filtro",
  "isFalse": "è falso",
  "isTrue": "è vero",
  "operator": "Operatore"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "E",
  "clear": "Rimuovi",
  "filter": "Filtro",
  "info": "Mostra elementi il cui valore:",
  "title": "Mostra elementi il cui valore",
  "isFalse": "è falso",
  "isTrue": "è vero",
  "or": "O",
  "selectValue": "-Seleziona valore-",
  "cancel": "Annulla",
  "operator": "Operatore",
  "value": "Valore"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Cerca"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Annulla",
    "cancel": "Annulla modifiche",
    "create": "Aggiungi nuovo elemento",
    "destroy": "Rimuovi",
    "edit": "Edit",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "Salva le modifiche",
    "select": "Seleziona",
    "update": "Aggiorna"
  },
  "editable": {
    "confirmation": "Sicuro di voler rimuovere questo elemento?",
    "cancelDelete": "Annulla",
    "confirmDelete": "Rimuovi"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Trascina l'header di una colonna e rilascialo qui per raggruppare secondo tale colonna"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} di {2} elementi",
  "empty": "Nessun elemento da visualizzare",
  "first": "Vai alla prima pagina",
  "itemsPerPage": "elementi per pagina",
  "last": "Vai all'ultima pagina",
  "next": "Vai alla prossima pagina",
  "of": "di {0}",
  "page": "Pagina",
  "previous": "Vai alla pagina precedente",
  "refresh": "Aggiorna"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "No records to display",
    "loading": "Loading...",
    "requestFailed": "Request failed.",
    "retry": "Riprova",
    "commands": {
        "edit": "Edit",
        "update": "Aggiorna",
        "canceledit": "Cancel",
        "create": "Aggiungi nuovo elemento",
        "createchild": "Add child record",
        "destroy": "Rimuovi",
        "excel": "Export to Excel",
        "pdf": "Export to PDF"
    }
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} di {2} elementi",
  "empty": "Nessun elemento da visualizzare",
  "first": "Vai alla prima pagina",
  "itemsPerPage": "elementi per pagina",
  "last": "Vai all'ultima pagina",
  "next": "Vai alla prossima pagina",
  "of": "di {0}",
  "page": "Pagina",
  "previous": "Vai alla pagina precedente",
  "refresh": "Aggiorna"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Annulla",
  "retry": "Riprova",
  "select": "Seleziona...",
  "remove": "Rimuovi",
  "uploadSelectedFiles": "Upload dei file selezionati",
  "dropFilesHere": "rilascia qui i file per l'upload",
  "statusFailed": "fallito",
  "statusUploaded": "upload effettuato",
  "statusUploading": "upload in corso",
  "headerStatusUploaded": "Fatto",
  "headerStatusUploading": "Upload in corso..."
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "dropFilesHere": "rilascia qui i files per l'upload",
  "search": "Cerca"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Grassetto",
  "createLink": "Inserisci hyperlink",
  "fontName": "Seleziona una famiglia di font",
  "fontNameInherit": "(font ereditato)",
  "fontSize": "Seleziona la dimensione del font",
  "fontSizeInherit": "(dimensione ereditata)",
  "formatBlock": "Formatta blocco",
  "indent": "Aumenta rientro",
  "insertHtml": "Inserisci HTML",
  "insertImage": "Inserisci immagine",
  "insertOrderedList": "Inserisci lista ordinata",
  "insertUnorderedList": "Inserisci lista non ordinata",
  "italic": "Italic",
  "justifyCenter": "Centra testo",
  "justifyFull": "Giustifica testo",
  "justifyLeft": "Allinea il testo a sinistra",
  "justifyRight": "Allinea il testo a destra",
  "outdent": "Riduci rientro",
  "strikethrough": "Barrato",
  "style": "Stili",
  "subscript": "A pedice",
  "superscript": "In apice",
  "underline": "Sottolineato",
  "unlink": "Rimuovi hyperlink",
  "deleteFile": "Sicuro di voler rimuovere \"{0}\"?",
  "directoryNotFound": "Non è stata trovata alcuna directory con questo nome.",
  "emptyFolder": "Cartella vuota",
  "invalidFileType": "Il file selezionato \"{0}\" non è valido. I tipi di file supportati sono {1}.",
  "orderBy": "Ordina per:",
  "orderByName": "Nome",
  "orderBySize": "Dimensione",
  "overwriteFile": "'Un file con nome \"{0}\" esiste già nella directory corrente. Vuoi sovrascriverlo?",
  "uploadFile": "Upload",
  "backColor": "Colore sfondo",
  "foreColor": "Colore",
  "dropFilesHere": "rilascia qui i files per l'upload",
  "imageWebAddress": "Indirizzo Web",
  "dialogButtonSeparator": "o",
  "dialogCancel": "Annulla",
  "dialogInsert": "Inserisci",
  "imageAltText": "Testo alternativo",
  "linkOpenInNewWindow": "Apri link in una nuova finestra",
  "linkText": "Testo",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Indirizzo Web",
  "search": "Cerca",
  "createTable": "Crea tabella",
  "addColumnLeft": "Aggiungi colonna a sinistra",
  "addColumnRight": "Aggiungi colonna a destra",
  "addRowAbove": "Aggiungi riga sopra",
  "addRowBelow": "Aggiungi riga sotto",
  "deleteColumn": "Rimuovi colonna",
  "deleteRow": "Rimuovi riga",
  "viewHtml": "Veda HTML",
  "dialogUpdate": "Aggiorna",
  "insertFile": "Inserisci file",
  "insertFile1": "Inserisci file",
  "print": "Stampa",
  "borderNone": "Nessuno"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "tutto il giorno",
  "cancel": "Annulla",
  "editable": {
    "confirmation": "Sicuro di voler rimuovere questo evento?"
  },
  "date": "Data",
  "destroy": "Rimuovi",
  "editor": {
    "allDayEvent": "Giornata intera",
    "description": "Descrizione",
    "editorTitle": "Evento",
    "end": "Fine",
    "endTimezone": "Fuso orario finale",
    "repeat": "Ripeti",
    "separateTimezones": "Usa differenti fusi orari per l'inizio e la fine",
    "start": "Inizio",
    "startTimezone": "Fuso orario iniziale",
    "timezone": "Modifica fuso orario",
    "timezoneEditorButton": "Fuso orario",
    "timezoneEditorTitle": "Fusi orari",
    "title": "Titolo",
    "noTimezone": "No timezone"
  },
  "event": "Evento",
  "recurrenceMessages": {
    "deleteWindowOccurrence": "Rimuovi questa accorrenza",
    "deleteWindowSeries": "Rimuovi la serie",
    "deleteWindowTitle": "Rimuovi elemento ricorrente",
    "editWindowOccurrence": "Modifica l'evento corrente",
    "editWindowSeries": "Modifica la serie",
    "editWindowTitle": "Modifica elemento ricorrente",
    "deleteRecurring": "Vuoi rimuovere solo questo evento o la serie completa?",
    "editRecurring": "Vuoi modifcare solo questo evento o la serie completa?"
  },
  "save": "Salva",
  "time": "Tempo",
  "today": "Oggi",
  "views": {
    "agenda": "Agenda",
    "day": "Giorno",
    "month": "Mese",
    "week": "Settimana",
    "workWeek": "Settimana lavorativa"
  },
  "deleteWindowTitle": "Rimuovi evento",
  "showFullDay": "Mostra il giorno completo",
  "showWorkDay": "Mostra solo le ore lavorative",
  "search": "Cerca...",
  "refresh": "Aggorna",
  "selectView": "Seleziona vista"
});
}

  /* Validator messages */
  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} è richiesto",
        "pattern": "{0} non è valido",
        "min": "{0} dovrebbe essere maggiore di o uguale a {1}",
        "max": "{0} dovrebbe essere minore di o uguale a {1}",
        "step": "{0} non è valido",
        "email": "{0} non è un formato email corretto",
        "url": "{0} non è un URL valido",
        "date": "{0} non è un formato data valido",
        "dateCompare": "La data di fine dovrebbe essere maggiore o uguale di quella di inizio"
      });
  }

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Tutti i bordi",
  "insideBorders": "Bordi interni",
  "insideHorizontalBorders": "Bordi interni orizzontali",
  "insideVerticalBorders": "Bordi interni verticali",
  "outsideBorders": "Bordi esterni",
  "leftBorder": "Bordo sinistro",
  "topBorder": "Bordo superiore",
  "rightBorder": "Bordo destro",
  "bottomBorder": "Bordo inferiore",
  "noBorders": "Nessun bordo"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Applica",
  "save": "Salva",
  "cancel": "Annulla",
  "remove": "Rimuovi",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formato",
    "categories": {
      "number": "Numero",
      "currency": "Valuta",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Carattere"
  },
  "fontSizeDialog": {
    "title": "Dimensione carattere"
  },
  "bordersDialog": {
    "title": "Bordi"
  },
  "alignmentDialog": {
    "title": "Allineamento",
    "buttons": {
     "justifyLeft": "Allinea testo a sinistra",
     "justifyCenter": "Allinea al centro",
     "justifyRight": "Allinea testo a destra",
     "justifyFull": "Giustifica",
     "alignTop": "Allinea in alto",
     "alignMiddle": "Allinea al centro verticalmente",
     "alignBottom": "Allinea in basso"
    }
  },
  "mergeDialog": {
    "title": "Unisci celle",
    "buttons": {
      "mergeCells": "Unisci tutte le celle",
      "mergeHorizontally": "Unisci orizzontalmente",
      "mergeVertically": "Unisci verticalmente",
      "unmerge": "Dividi celle"
    }
  },
  "freezeDialog": {
    "title": "Blocca riquadri",
    "buttons": {
      "freezePanes": "Blocca riquadri",
      "freezeRows": "Blocca righe",
      "freezeColumns": "Blocca colonne",
      "unfreeze": "Sblocca riquadri"
    }
  },
  "validationDialog": {
    "title": "Convalida dati",
    "hintMessage": "Si prega di inserire un {0} valore valido {1}.",
    "hintTitle": "Convalida {0}",
    "criteria": {
      "any": "Qualsiasi valore",
      "number": "Numero",
      "text": "Testo",
      "date": "Data",
      "custom": "Formula personalizzata"
    },
    "comparers": {
      "greaterThan": "più grande di",
      "lessThan": "minore di",
      "between": "tra",
      "notBetween": "non tra",
      "equalTo": "uguale a",
      "notEqualTo": "non uguale a",
      "greaterThanOrEqualTo": "maggiore o uguale a",
      "lessThanOrEqualTo": "minore o uguale a"
    },
    "comparerMessages": {
      "greaterThan": "più grande di {0}",
      "lessThan": "minore di {0}",
      "between": "tra {0} e {1}",
      "notBetween": "non tra {0} e {1}",
      "equalTo": "uguale a {0}",
      "notEqualTo": "non uguale a {0}",
      "greaterThanOrEqualTo": "maggiore o uguale a {0}",
      "lessThanOrEqualTo": "minore o uguale a {0}",
      "custom": "che soddisfa la formula: {0}"
    },
    "labels": {
      "criteria": "Criteri",
      "comparer": "Operatore di confronto",
      "min": "Min",
      "max": "Max",
      "value": "Valore",
      "start": "Inizia",
      "end": "Fine",
      "onInvalidData": "In base ai dati non validi",
      "rejectInput": "Rifiuta di ingresso",
      "showWarning": "Mostra avviso",
      "showHint": "Mostra suggerimento",
      "hintTitle": "Titolo suggerimento",
      "hintMessage": "Messaggio suggerimento"
    },
    "placeholders": {
      "typeTitle": "Tipo di titolo",
      "typeMessage": "Tipo di messaggio"
    }
  },
  "exportAsDialog": {
    "title": "Salva con nome...",
    "labels": {
      "fileName": "Nome file",
      "saveAsType": "Salva come tipo"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Impossibile modificare parte di una cella unita."
  },
  "useKeyboardDialog": {
    "title": "Copia e incolla",
    "errorMessage": "Queste azioni non possono essere invocate attraverso il menu. Ti prego, utilizza le scorciatoie da tastiera:",
    "labels": {
      "forCopy": "per copiare",
      "forCut": "per tagliare",
      "forPaste": "per incollare"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "L'azione non può essere eseguita su selezione multipla."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Ordina dall'A alla Z ",
  "sortDescending": "Ordina dalla Z all'A",
  "filterByValue": "Filtra per valore",
  "filterByCondition": "Filtra per criteri",
  "apply": "Applica",
  "search": "Cerca",
  "clear": "Cancella",
  "blanks": "(Vuote)",
  "operatorNone": "Senza criteri",
  "and": "E",
  "or": "O",
  "operators": {
    "string": {
      "contains": "Testo contiene",
      "doesnotcontain": "Testo non contiene",
      "startswith": "Testo inizia con",
      "endswith": "Testo finisce con"
    },
    "date": {
      "eq": "È uguale a",
      "neq": "Non è uguale a",
      "lt": "È prima",
      "gt": "È dopo"
    },
    "number": {
      "eq": "È uguale a",
      "gt": "È più grande di",
      "gte": "È più grande o uguale a",
      "lt": "È più piccolo di",
      "lte": "È più piccolo o uguale a",
      "neq": "Non è uguale a"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Aggiungi colonna a sinistra",
  "addColumnRight": "Aggiungi colonna a destra",
  "addRowAbove": "Aggiungi riga sopra",
  "addRowBelow": "Aggiungi riga sotto",
  "alignment": "Allineamento",
  "alignmentButtons": {
  "justifyLeft": "Allinea testo a sinistra",
  "justifyCenter": "Allinea al centro",
  "justifyRight": "Allinea testo a destra",
  "justifyFull": "Giustifica",
  "alignTop": "Allinea in alto",
  "alignMiddle": "Allinea al centro verticalmente",
  "alignBottom": "Allinea in basso"
  },
  "backgroundColor": "Colore riempimento",
  "bold": "Grassetto",
  "borders": "Bordi",
  "copy": "Copia",
  "cut": "Taglia",
  "deleteColumn": "Rimuovi colonna",
  "deleteRow": "Rimuovi riga",
  "filter": "Filtro",
  "fontFamily": "Carattere",
  "fontSize": "Dimensione carattere",
  "format": "Format personalizzato...",
  "formatTypes": {
    "automatic": "Automatico",
    "number": "Numero",
    "percent": "Percentuale",
    "financial": "Contabilità",
    "currency": "Valuta",
    "date": "Data",
    "time": "Ora",
    "dateTime": "Data e ora",
    "duration": "Durata",
    "moreFormats": "Altri formati..."
  },
  "formatDecreaseDecimal": "Riduce il numero di decimali",
  "formatIncreaseDecimal": "Aumenta il numero di decimali",
  "freeze": "Blocca riquadri",
  "freezeButtons": {
    "freezePanes": "Blocca riquadri",
    "freezeRows": "Blocca righe",
    "freezeColumns": "Blocca colonne",
    "unfreeze": "Sblocca riquadri"
  },
  "italic": "Corsivo",
  "merge": "Unisci celle",
  "mergeButtons": {
    "mergeCells": "Unisci tutte le celle",
    "mergeHorizontally": "Unisci orizzontalmente",
    "mergeVertically": "Unisci verticalmente",
    "unmerge": "Dividi celle"
  },
  "open": "Apri...",
  "paste": "Incolla",
  "quickAccess": {
    "redo": "Ripristina",
    "undo": "Annulla"
  },
  "saveAs": "Salva con nome...",
  "sortAsc": "Ordine crescente",
  "sortDesc": "Ordine decrescente",
  "sortButtons": {
    "sortSheetAsc": "Ordina fogli dall'A alle Z",
    "sortSheetDesc": "Ordina fogli dalle Z all'A",
    "sortRangeAsc": "Ordina intervalli dall'A alle Z",
    "sortRangeDesc": "Ordina intervalli dalle Z all'A"
  },
  "textColor": "Colore carattere",
  "textWrap": "Testo a capo",
  "underline": "Sottolineato",
  "validation": "Convalida dati..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Impossibile inserire cellule a causa di una possibile perdita di dati. Seleziona un altro punto di inserimento o cancellare i dati dalla fine del foglio di lavoro.",
    "filterRangeContainingMerges": "Impossibile creare un filtro all'interno di un intervallo che contiene celle unite."
  },
  "tabs": {
    "home": "Home",
    "insert": "Inserisci",
    "data": "Dati"
  }
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Vicino"
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
  "cancel": "Annulla"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annulla"
});
}

/* List messages */

if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
    $.extend(true, kendo.ui.List.prototype.options.messages,{
      "clear": "cancella",
      "noData": "Nessun dato trovato."
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

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
    $.extend(true, kendo.ui.DropDownTree.prototype.options.messages,{
        "singleTag": "opzione/i selezionata/e",
        "clear": "cancelli",
        "deleteTag": "rimuovi",
        "noData": "Nessun dato trovato."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "opzione/i selezionata/e",
        "clear": "cancelli",
        "deleteTag": "rimuovi",
        "noData": "Nessun dato trovato.",
        "downArrow": "seleziona"
    });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
    $.extend(true, kendo.ui.Chat.prototype.options.messages,{
        "messageListLabel": "Lista di messaggi",
        "placeholder": "Scrivi...",
        "toggleButton": "Apri/chiudi barra degli strumenti",
        "sendButton": "Invia messaggio"
    });
}

/* Wizard messages */

if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
    $.extend(true, kendo.ui.Wizard.prototype.options.messages,{
        "reset": "Risetta",
        "previous": "Precedente",
        "next": "Prossimo",
        "done": "Finito",
        "step": "Passo",
        "of": "di"
    });
}

/* OrgChart messages */

if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
    $.extend(true, kendo.ui.OrgChart.prototype.options.messages,{
        label: "Org Chart",
        edit: "Modifica",
        create: "Crea",
        destroy: "Rimuovi",
        destroyContent: "Sei sicuro che vuoi rimovere questo articulo e i suoi figli?",
        destroyTitle: "Rimuovi articolo",
        cancel: "Anulla",
        save: "Salva",
        menuLabel: "Menu di modificazioni",
        uploadAvatar: "Carica un nuovo avatar",
        parent: "Genitore",
        name: "Nome",
        title: "Titolo",
        none: "--Nessun--",
        expand: "espanda",
        collapse: "crolla"
    });
}

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Rapporto di contrasto:",
            "fail": "Fallito",
            "pass": "Superato",
            "hex": "HEX",
            "toggleFormat": "Cambia formato",
            "red": "Rosso",
            "green": "Verde",
            "blue": "Blu",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Applica",
            "cancel": "Annulla",
            "noColor": "nessun colore",
            "clearColor": "Rimuovi colore"
        });

}

/* ColorPicker messages */

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Applica",
            "cancel": "Annulla",
            "noColor": "nessun colore",
            "clearColor": "Rimuovi colore"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Inizio",
            "endLabel": "Fine"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Nuova cartella",
                "upload": "Carica",
                "sortDirection": "Ordine",
                "sortDirectionAsc": "Crescente",
                "sortDirectionDesc": "Decrescente",
                "sortField": "Ordina per",
                "nameField": "Nome",
                "sizeField": "Dimensione",
                "typeField": "Tipo",
                "dateModifiedField": "Data modifica",
                "dateCreatedField": "Data creazione",
                "listView": "Vista elenco",
                "gridView": "Vista griglia",
                "search": "Cerca",
                "details": "Dettagli",
                "detailsChecked": "Sì",
                "detailsUnchecked": "No",
                "Delete": "Elimina",
                "Rename": "Rinomina"
            },
            "views": {
                "nameField": "Nome",
                "sizeField": "Dimensione",
                "typeField": "Tipo",
                "dateModifiedField": "Data modifica",
                "dateCreatedField": "Data creazione",
                "items": "elementi"
            },
            "dialogs": {
                "upload": {
                    "title": "Carica file",
                    "clear": "Svuota",
                    "done": "Fatto"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Vuoi spostare o copiare i file selezionati?</p>",
                    "okText": "Copia",
                    "cancel": "Sposta",
                    "close": "Chiudi"
                },
                "deleteConfirm": {
                    "title": "Conferma eliminazione",
                    "content": "<p class='k-text-center'>Sei sicuro di voler eliminare i file selezionati?<br/>Questa operazione non può essere annullata.</p>",
                    "okText": "Elimina",
                    "cancel": "Annulla",
                    "close": "Chiudi"
                },
                "renamePrompt": {
                    "title": "Rinomina",
                    "content": "<p class='k-text-center'>Inserisci un nuovo nome file</p>",
                    "okText": "Rinomina",
                    "cancel": "Annulla",
                    "close": "Chiudi"
                }
            },
            "previewPane": {
                "noFileSelected": "Nessun file selezionato",
                "extension": "Tipo",
                "size": "Dimensione",
                "created": "Data creazione",
                "createdUtc": "Data creazione (UTC)",
                "modified": "Data modifica",
                "modifiedUtc": "Data modifica (UTC)",
                "items": "elementi"
            }
        });

}

/* FilterCell operators */

/* FilterCell operators */

if (kendo.ui.FilterCell) {

    kendo.ui.FilterCell.prototype.options.operators =
        $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
            "string": {
                "contains": "Contiene",
                "startswith": "Inizia con",
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "doesnotcontain": "Non contiene",
                "endswith": "Finisce con",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo",
                "isempty": "È vuoto",
                "isnotempty": "Non è vuoto",
                "isnullorempty": "Ha valore",
                "isnotnullorempty": "Non ha valore"
            },
            "number": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "gte": "È maggiore o uguale a",
                "gt": "È maggiore di",
                "lte": "È minore o uguale a",
                "lt": "È minore di",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            },
            "date": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "gte": "È successivo o uguale a",
                "gt": "È successivo a",
                "lte": "È precedente o uguale a",
                "lt": "È precedente a",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            },
            "enums": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            }
        });

}

/* FilterMenu operator messages */

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {

    kendo.ui.FilterMenu.prototype.options.operators =
        $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
            "string": {
                "contains": "Contiene",
                "startswith": "Inizia con",
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "doesnotcontain": "Non contiene",
                "endswith": "Finisce con",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo",
                "isempty": "È vuoto",
                "isnotempty": "Non è vuoto",
                "isnullorempty": "Ha valore",
                "isnotnullorempty": "Non ha valore"
            },
            "number": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "gte": "È maggiore o uguale a",
                "gt": "È maggiore di",
                "lte": "È minore o uguale a",
                "lt": "È minore di",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            },
            "date": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "gte": "È successivo o uguale a",
                "gt": "È successivo a",
                "lte": "È precedente o uguale a",
                "lt": "È precedente a",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            },
            "enums": {
                "eq": "È uguale a",
                "neq": "Non è uguale a",
                "isnull": "È nullo",
                "isnotnull": "Non è nullo"
            }
        });

}

/* Gantt messages */

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Aggiungi figlio",
                "append": "Aggiungi attività",
                "insertAfter": "Inserisci dopo",
                "insertBefore": "Inserisci prima",
                "pdf": "Esporta in PDF"
            },
            "cancel": "Annulla",
            "deleteDependencyWindowTitle": "Elimina dipendenza",
            "deleteTaskWindowTitle": "Elimina attività",
            "destroy": "Elimina",
            "editor": {
                "assignButton": "Assegna",
                "editorTitle": "Attività",
                "end": "Fine",
                "percentComplete": "Completamento",
                "resources": "Risorse",
                "resourcesEditorTitle": "Risorse",
                "resourcesHeader": "Risorse",
                "start": "Inizio",
                "title": "Titolo",
                "unitsHeader": "Unità",
                "parent": "Padre",
                "addNew": "Aggiungi",
                "name": "Nome"
            },
            "save": "Salva",
            "selectView": "Seleziona vista",
            "views": {
                "day": "Giorno",
                "end": "Fine",
                "month": "Mese",
                "start": "Inizio",
                "week": "Settimana",
                "year": "Anno"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Modifica",
            "createNewCard": "Nuova scheda",
            "create": "Crea",
            "search": "Cerca",
            "previewCard": "Anteprima scheda",
            "addCard": "Aggiungi scheda",
            "editCard": "Modifica scheda",
            "deleteCard": "Elimina scheda",
            "addColumn": "Aggiungi colonna",
            "editColumn": "Modifica colonna",
            "deleteColumn": "Elimina colonna",
            "close": "Chiudi",
            "cancel": "Annulla",
            "delete": "Elimina",
            "saveChanges": "Salva modifiche",
            "title": "Titolo:",
            "description": "Descrizione:",
            "newColumn": "Nuova colonna",
            "deleteColumnConfirm": "Sei sicuro di voler eliminare questa colonna?",
            "deleteCardConfirm": "Sei sicuro di voler eliminare questa scheda?"
        });

}

/* TreeList messages */

if (kendo.ui.TreeList) {

    kendo.ui.TreeList.prototype.options.messages =
        $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
            "noRows": "Nessun record da visualizzare",
            "loading": "Caricamento...",
            "requestFailed": "Richiesta fallita.",
            "retry": "Riprova",
            "commands": {
                "edit": "Modifica",
                "update": "Aggiorna",
                "canceledit": "Annulla",
                "create": "Aggiungi nuovo record",
                "createchild": "Aggiungi record figlio",
                "destroy": "Elimina",
                "excel": "Esporta in Excel",
                "pdf": "Esporta in PDF"
            }
        });

}

/* NumericTextBox messages */

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Aumenta valore",
            "downArrowText": "Diminuisci valore"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pausa",
            "play": "Riproduci",
            "mute": "Disattiva audio",
            "unmute": "Attiva audio",
            "quality": "Qualità",
            "fullscreen": "Schermo intero"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Rilascia i campi dati qui",
            "columnFields": "Rilascia i campi colonna qui",
            "rowFields": "Rilascia i campi riga qui"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Mostra elementi con valore che:",
            "sortAscending": "Ordine crescente",
            "sortDescending": "Ordine decrescente",
            "filterFields": "Filtro campi",
            "filter": "Filtro",
            "include": "Includi campi...",
            "title": "Campi da includere",
            "clear": "Cancella",
            "ok": "Ok",
            "cancel": "Annulla",
            "operators": {
                "contains": "Contiene",
                "doesnotcontain": "Non contiene",
                "startswith": "Inizia con",
                "endswith": "Finisce con",
                "eq": "È uguale a",
                "neq": "Non è uguale a"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Impostazioni",
            "cancelButtonText": "Annulla",
            "applyButtonText": "Applica",
            "measures": "Seleziona campi per iniziare",
            "columns": "Seleziona campi per iniziare",
            "rows": "Seleziona campi per iniziare"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Applica",
            "sortAscending": "Ordine crescente",
            "sortDescending": "Ordine decrescente",
            "filterFields": "Filtro campi",
            "filter": "Filtro",
            "include": "Includi campi...",
            "clear": "Cancella",
            "reset": "Ripristina",
            "moveToColumns": "Sposta nelle colonne",
            "moveToRows": "Sposta nelle righe",
            "movePrevious": "Sposta indietro",
            "moveNext": "Sposta avanti",
            "filterOperatorsDropDownLabel": "Operatori filtro",
            "filterValueTextBoxLabel": "Valore filtro",
            "operators": {
                "contains": "Contiene",
                "doesnotcontain": "Non contiene",
                "startswith": "Inizia con",
                "endswith": "Finisce con",
                "eq": "È uguale a",
                "neq": "Non è uguale a"
            }
        });

}

/* Slider messages */

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Aumenta",
            "decreaseButtonTitle": "Diminuisci",
            "dragHandleTitle": "Trascina"
        });

}

/* ListBox messaages */

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Rimuovi",
                "moveUp": "Sposta su",
                "moveDown": "Sposta giù",
                "transferTo": "Trasferisci a",
                "transferFrom": "Trasferisci da",
                "transferAllTo": "Trasferisci tutto a",
                "transferAllFrom": "Trasferisci tutto da"
            }
        });

}

/* TreeList messages */

if (kendo.ui.TreeList) {

    kendo.ui.TreeList.prototype.options.messages =
        $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
            "noRows": "Nessun record da visualizzare",
            "loading": "Caricamento...",
            "requestFailed": "Richiesta fallita.",
            "retry": "Riprova"
        });

}

/* TreeView messages */

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Caricamento...",
            "requestFailed": "Richiesta fallita.",
            "retry": "Riprova"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Caricamento..."
        });

}

/* TimePicker */

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Imposta",
            "cancel": "Annulla",
            "hour": "ora",
            "minute": "minuto",
            "second": "secondo",
            "millisecond": "millisecondo",
            "now": "Adesso"
        });

}

/* DateTimePicker */

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Imposta",
            "cancel": "Annulla",
            "hour": "ora",
            "minute": "minuto",
            "second": "secondo",
            "millisecond": "millisecondo",
            "now": "Adesso",
            "date": "Data",
            "time": "Ora",
            "today": "Oggi",
            "weekColumnHeader": ""
        });

}

/* Calendar */

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Oggi",
            "navigateTo": "Vai a: ",
            "parentViews": {
                "month": "Vista anno",
                "year": "Vista decennio",
                "decade": "Vista secolo"
            }
        });

}

/* DateInput */

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "anno",
            "month": "mese",
            "day": "giorno",
            "weekday": "giorno della settimana",
            "hour": "ore",
            "minute": "minuti",
            "second": "secondi",
            "dayperiod": "AM/PM"
        });

}

/* PDFViewer messages */

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Documento",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Livello zoom",
                    "zoomOut": "Rimpicciolisci",
                    "zoomIn": "Ingrandisci",
                    "actualWidth": "Larghezza effettiva",
                    "autoWidth": "Larghezza automatica",
                    "fitToWidth": "Adatta alla larghezza",
                    "fitToPage": "Adatta alla pagina"
                },
                "open": "Apri",
                "exportAs": "Esporta",
                "download": "Scarica",
                "pager": {
                    "first": "Vai alla prima pagina",
                    "previous": "Vai alla pagina precedente",
                    "next": "Vai alla pagina successiva",
                    "last": "Vai all'ultima pagina",
                    "of": "di",
                    "page": "pagina",
                    "pages": "pagine"
                },
                "print": "Stampa",
                "toggleSelection": "Abilita selezione",
                "togglePan": "Abilita scorrimento",
                "search": "Cerca"
            },
            "errorMessages": {
                "notSupported": "Sono supportati solo file PDF.",
                "parseError": "Impossibile elaborare il file PDF.",
                "notFound": "File non trovato.",
                "popupBlocked": "Il popup è bloccato dal browser."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Rigenera captcha",
            "audio": "Riproduci audio captcha",
            "imageAlt": "Inserisci il testo dell'immagine captcha",
            "success": "Verifica riuscita"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Titolo mappa"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Unità"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Nessun dato disponibile"
        });

}

})(window.kendo.jQuery);